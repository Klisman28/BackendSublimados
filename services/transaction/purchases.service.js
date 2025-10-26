// purchases.service.js
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models, sequelize } = require('../../libs/sequelize');
const UsersService = require('../../services/organization/users.service');

const service = new UsersService();

class PurchasesService {
  async find(query) {
    const { limit, offset, search, sortColumn, sortDirection } = query;
    const options = {
      include: [
        {
          model: models.Product,
          as: 'products',
          attributes: ['id', 'name'],
          through: {
            as: 'item',
            attributes: ['quantity', 'unitCost']
          }
        },
        { model: models.Supplier, as: 'supplier', attributes: ['name', 'ruc'] },
        { model: models.Employee, as: 'employee', attributes: ['fullname', 'dni'] }
      ],
      order: sortColumn ? [[sortColumn, sortDirection]] : [['id', 'DESC']]
    };

    const optionsCount = {
      include: [
        { model: models.Supplier, as: 'supplier', attributes: ['name', 'ruc'] },
      ]
    };

    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }

    // Si "number" es columna de purchases, filtra en options.where
    if (search) {
      options.where = {
        ...(options.where || {}),
        number: { [Op.like]: `%${search}%` },
      };
      optionsCount.where = {
        ...(optionsCount.where || {}),
        number: { [Op.like]: `%${search}%` },
      };
    }

    const purchases = await models.Purchas.findAll(options);
    const total = await models.Purchas.count(optionsCount);
    return { purchases, total };
  }

  async create(data, userId) {
    const user = await service.findOne(userId);
    const employeeId = user.dataValues.employee.id;

    return await sequelize.transaction(async (t) => {
      const purchas = await models.Purchas.create(
        { ...data, employeeId },
        { transaction: t }
      );

      if (data.products && data.products.length > 0) {
        // Evita forEach(async…)
        for (const item of data.products) {
          // (1) Crea el ítem en la tabla puente
          const product = await models.Product.findByPk(item.productId, {
            transaction: t,
            lock: t.LOCK.UPDATE, // opcional: evita condiciones de carrera en concurrencia alta
          });

          if (!product) throw boom.badRequest(`Producto ${item.productId} no existe`);

          await purchas.addProduct(product, {
            through: { quantity: item.quantity, unitCost: item.unitCost },
            transaction: t,
          });

          // (2) Actualiza stock (compras suman)
          await models.Product.increment(
            { stock: item.quantity }, // usa -item.quantity si tu caso es “descontar” en compra
            { where: { id: item.productId }, transaction: t }
          );
        }
      }

      return purchas;
    });
  }

  async findOne(id) {
    const purchas = await models.Purchas.findByPk(id, {
      include: [
        {
          model: models.Product,
          as: 'products',
          attributes: ['id', 'name'],
          through: {
            as: 'item',
            attributes: ['quantity', 'unitCost']
          }
        },
        { model: models.Supplier, as: 'supplier', attributes: ['name', 'ruc'] },
        { model: models.Employee, as: 'employee', attributes: ['fullname', 'dni'] }
      ]
    });
    if (!purchas) throw boom.notFound('No se encontró ninguna compra');
    return purchas;
  }

  async update(id, changes) {
    // Estrategia simple y segura:
    // 1) Revertir stock de los ítems actuales
    // 2) Borrar ítems actuales
    // 3) Insertar nuevos ítems y aplicar stock de nuevo
    // Todo en transacción.
    return await sequelize.transaction(async (t) => {
      let purchas = await this.findOne(id);

      // 1) Revertir stock actual
      if (purchas.products?.length) {
        for (const p of purchas.products) {
          const qty = p.item.quantity;
          await models.Product.decrement(
            { stock: qty }, // compras sumaron -> para revertir, restamos
            { where: { id: p.id }, transaction: t }
          );
        }
      }

      // 2) Borrar ítems actuales de la compra
      await models.ProductPurchas.destroy({
        where: { purchasId: id }, // <— corregido
        transaction: t
      });

      // 3) Actualizar cabecera y re-crear ítems
      purchas = await purchas.update(changes, { transaction: t });

      if (changes.products?.length) {
        for (const item of changes.products) {
          const product = await models.Product.findByPk(item.productId, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          if (!product) throw boom.badRequest(`Producto ${item.productId} no existe`);

          await purchas.addProduct(product, {
            through: { quantity: item.quantity, unitCost: item.unitCost },
            transaction: t,
          });

          // Aplicar stock por los nuevos ítems
          await models.Product.increment(
            { stock: item.quantity },
            { where: { id: item.productId }, transaction: t }
          );
        }
      }

      return purchas;
    });
  }

  async delete(id) {
    // Si deseas mantener stock consistente, al borrar una compra
    // podrías revertir el stock antes de destruirla (similar a update()).
    const purchas = await this.findOne(id);
    await purchas.destroy();
    return { id };
  }
}

module.exports = PurchasesService;
