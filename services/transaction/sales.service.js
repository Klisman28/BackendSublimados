const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { sequelize, Sequelize, models } = require('../../libs/sequelize');

class SalesService {
  async find(query) {
    const {
      limit,
      offset,
      sortColumn,
      sortDirection,
      filterField,
      filterType,
      filterValue
    } = query;

    const options = {
      where: {},
      include: [
        {
          model: models.Product,
          as: 'products',
          attributes: ['id', 'name', 'sku'],
          include: [
            {
              model: models.Brand,
              as: 'brand',
              attributes: ['name']
            },
            {
              model: models.Unit,
              as: 'unit',
              attributes: ['symbol']
            }
          ],
          through: {
            as: 'item',
            attributes: ['quantity', 'unitPrice']
          }
        },
        {
          model: models.Opening,
          as: 'opening',
          attributes: [],
          include: [
            {
              model: models.Employee,
              as: 'employee',
              attributes: ['fullname', 'dni']
            }
          ]
        },
        {
          model: models.Customer,
          as: 'customer',
          attributes: ['fullname', 'dni', 'email', 'telephone']
        },
        {
          model: models.Enterprise,
          as: 'enterprise',
          attributes: ['name', 'ruc', 'email', 'telephone']
        }
      ],
      order: (sortColumn)
        ? [[sortColumn, sortDirection]]
        : [['id', 'DESC']]
    };

    const optionsCount = {
      where: {},
      include: [
        {
          model: models.Product,
          as: 'products',
          attributes: [],
          through: {
            as: 'item',
            attributes: []
          }
        }
      ]
    };

    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    // ----------------------------------------------------------
    // Lógica de filtrado
    // ----------------------------------------------------------
    if (filterField && filterValue) {
      // Búsqueda en productos (nombre y/o sku)
      if (filterField === 'product') {
        // Busca tanto por nombre como por SKU
        const searchCondition = {
          [Op.or]: [
            { name: { [Op.like]: `%${filterValue}%` } },
            { sku: { [Op.like]: `%${filterValue}%` } }
          ]
        };
        options.include[0].where = searchCondition;
        optionsCount.include[0].where = searchCondition;
      } else if (filterField === 'sku') {
        // Busca solo por SKU
        const searchCondition = {
          sku: { [Op.like]: `%${filterValue}%` }
        };
        options.include[0].where = searchCondition;
        optionsCount.include[0].where = searchCondition;
      } else if (filterField === 'name') {
        // Busca solo por nombre
        const searchCondition = {
          name: { [Op.like]: `%${filterValue}%` }
        };
        options.include[0].where = searchCondition;
        optionsCount.include[0].where = searchCondition;
      } else {
        // Filtros para otros campos de la tabla Sales
        const data = this.addFilter(filterField, filterType, filterValue);
        if (data !== null) {
          options.where = { ...options.where, [filterField]: data };
          optionsCount.where = { ...optionsCount.where, [filterField]: data };
        }
      }
    }

    const sales = await models.Sale.findAll(options);
    const total = await models.Sale.count(optionsCount);

    return { sales, total };
  }


  addFilter(filterField, filterType, filterValue) {
    switch (filterField) {
      case 'total':
        if (filterType !== "like" && !isNaN(filterValue)) {
          return {
            [Op[filterType]]: parseFloat(filterValue)
          };
        }
        return null;
      case 'igv':
        if (filterType !== "like" && !isNaN(filterValue)) {
          return {
            [Op[filterType]]: parseFloat(filterValue)
          };
        }
        return null;
      case 'saleableType':
        if (filterType === 'like') {
          const newFilterValue = filterValue.toLowerCase();
          if (newFilterValue === 'boleta') {
            return {
              [Op.eq]: "boletas"
            };
          } else if (newFilterValue === 'factura') {
            return {
              [Op.eq]: "invoces"
            };
          } else if (newFilterValue === 'ticket') {
            return {
              [Op.eq]: "tickets"
            };
          }
        }
        return null;
      case 'status':
        if (filterType === 'like') {
          if ((filterValue.toLowerCase()) === 'activo') {
            return {
              [Op.eq]: 1
            };
          } else if ((filterValue.toLowerCase()) === 'anulado') {
            return {
              [Op.eq]: 2
            };
          }
        }
        return null;
      default:
        return null;
    }
  }

  async create(data) {
    return await sequelize.transaction(async (t) => {
      // 1. Obtener configuración actual
      const config = await models.Config.findOne({ transaction: t });
      if (!config) {
        throw boom.notFound('No se encontró configuración para tickets');
      }

      // 2. Si es venta tipo Ticket, asignar y formatear número
      if (data.type === 'Ticket') {
        // padStart con la longitud actual de ticketNum en dígitos
        const digitCount = String(config.ticketNum).length;
        data.number = String(config.ticketNum).padStart(digitCount, '0');
      }

      // 3. Crear la venta
      const sale = await models.Sale.create(data, { transaction: t });

      // 4. Asociar productos (manteniendo tu lógica actual)
      // 3) Agregar ítems y **RESTAR** stock
      if (data.products && data.products.length > 0) {
        for (const item of data.products) {
          if (!item.productId || !item.quantity || item.quantity <= 0) {
            throw boom.badRequest('Producto/quantity inválidos en ítem de venta');
          }

          // Leer y bloquear la fila del producto para evitar condiciones de carrera
          const product = await models.Product.findByPk(item.productId, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          if (!product) {
            throw boom.badRequest(`Producto ${item.productId} no existe`);
          }

          // Validar stock suficiente
          if (product.stock < item.quantity) {
            throw boom.conflict(
              `Stock insuficiente para ${product.name} (id ${product.id}). ` +
              `Stock actual: ${product.stock}, solicitado: ${item.quantity}`
            );
          }

          // Crear ítem en la tabla puente
          await sale.addProduct(product, {
            through: {
              quantity: item.quantity,
              unitPrice: item.unitPrice, // usa el nombre de tu modelo (unit_price vs unitPrice)
            },
            transaction: t,
          });

          // **Restar** stock
          await models.Product.decrement(
            { stock: item.quantity },
            { where: { id: item.productId }, transaction: t }
          );
        }
      }

      // 5. Incrementar el contador ticketNum en Config
      if (data.type === 'Ticket') {
        await config.update(
          { ticketNum: config.ticketNum + 1 },
          { transaction: t }
        );
      }

      return sale;
    });
  }

  async findByOpening(openingId) {
    const options = {
      where: {
        openingId: openingId
      },
      include: [
        {
          model: models.Product,
          as: 'products',
          attributes: ['id', 'name'],
          include: [
            {
              model: models.Brand,
              as: 'brand',
              attributes: ['name']
            },
            {
              model: models.Unit,
              as: 'unit',
              attributes: ['symbol']
            }
          ],
          through: {
            as: 'item',
            attributes: ['quantity', 'unitPrice']
          }
        },
        {
          model: models.Opening,
          as: 'opening',
          attributes: [],
          include: [
            {
              model: models.Employee,
              as: 'employee',
              attributes: ['fullname', 'dni'],
            }
          ]
        },
        {
          model: models.Customer,
          as: 'customer',
          attributes: ['fullname', 'dni', 'email', 'telephone']
        },
        {
          model: models.Enterprise,
          as: 'enterprise',
          attributes: ['name', 'ruc', 'email', 'telephone']
        },
      ]
    };

    const sales = await models.Sale.findAll(options);
    const total = await models.Sale.count(options);

    return { sales, total };
  }

  async findOne(id) {
    const sale = await models.Sale.findByPk(id, {
      include: [
        {
          model: models.Opening,
          as: 'opening',
          attributes: [],
          include: [
            {
              model: models.Employee,
              as: 'employee',
              attributes: ['fullname', 'dni'],
            }
          ]
        },
        {
          model: models.Product,
          as: 'products',
          attributes: ['id', 'name'],
          include: {
            model: models.Brand,
            as: 'brand',
            attributes: ['name']
          },
          through: {
            as: 'item',
            attributes: ['quantity', 'unitPrice']
          }
        },
        {
          model: models.Customer,
          as: 'customer',
          attributes: ['fullname', 'dni', 'email', 'telephone']
        },
        {
          model: models.Enterprise,
          as: 'enterprise',
          attributes: ['name', 'ruc', 'email', 'telephone']
        },
      ],
    });
    if (!sale) {
      throw boom.notFound('No se encontró ninguna venta');
    }
    return sale;
  }

  async update(id, changes) {
    let sale = await this.findOne(id);
    sale = await sale.update(changes);
    // if (changes.products && changes.products.length > 0) {
    //     await models.ProductPurchas.destroy({
    //         where: {
    //             productId: id
    //         }
    //     });
    //     changes.products.forEach(async (item) => {
    //         const product = await models.Product.findByPk(id)
    //         await sale.addProduct(product, { through: { quantity: item.quantity, unitCost: item.unitCost } });
    //     });
    // }
    return sale;
  }

  async delete(id) {
    // Primero, encontramos la venta por ID
    const sale = await this.findOne(id);

    // Verificamos si la venta tiene productos
    if (sale.products && sale.products.length > 0) {
      console.log(`Productos asociados a la venta con ID ${id}: ${sale.products.length} productos.`);
    }

    // Creamos la transacción
    const t = await sequelize.transaction();
    console.log(`Transacción creada: ${t}.`);

    try {
      // Restauramos el stock de cada producto (si hay productos)
      if (sale.products && sale.products.length > 0) {
        for (const product of sale.products) {
          const quantity = product.item.quantity;
          console.log(`Restaurando stock para el producto con ID ${product.id}, sumando ${quantity} unidades al stock actual.`);

          await models.Product.update(
            { stock: Sequelize.literal(`stock + ${quantity}`) },
            { where: { id: product.id }, transaction: t }
          );
        }
      }

      // Luego destruimos la venta dentro de la misma transacción
      await sale.destroy({ transaction: t });
      console.log(`Venta con ID ${id} eliminada.`);

      // Hacemos commit de todos los cambios
      await t.commit();
      console.log(`Transacción completada exitosamente.`);

      // Retornamos el ID de la venta eliminada
      return { id };

    } catch (error) {
      // Si algo falla, hacemos rollback y lanzamos el error
      await t.rollback();
      console.error(`Error al eliminar la venta con ID ${id}: ${error.message}`);
      throw error;
    }
  }


  async returnSale(id) {
    const t = await models.sequelize.transaction();
    try {
      console.log(`Iniciando la devolución de la venta con ID: ${id}`);

      const sale = await this.findOne(id);
      console.log(`Venta encontrada: ${JSON.stringify(sale)}`);

      if (sale.status === 2) {
        console.log(`La venta con ID ${id} ya ha sido devuelta`);
        throw boom.conflict('La venta ya ha sido devuelta');
      }

      console.log(`Actualizando estado de la venta a 'devuelta' para la venta con ID ${id}`);
      const updatedSale = await sale.update({ status: 2 }, { transaction: t });

      if (sale.products && sale.products.length > 0) {
        console.log(`Productos asociados a la venta con ID ${id}: ${sale.products.length} productos.`);

        for (const product of sale.products) {
          const quantity = product.item.quantity;
          console.log(`Actualizando stock para el producto con ID ${product.id}, aumentando ${quantity} unidades al stock actual.`);

          await models.Product.update(
            { stock: models.Sequelize.literal(`stock + ${quantity}`) },
            { where: { id: product.id }, transaction: t }
          );
        }
      }

      await t.commit();
      console.log(`Transacción completada con éxito para la venta con ID ${id}`);
      return updatedSale;
    } catch (error) {
      console.error(`Error al procesar la devolución para la venta con ID ${id}: ${error.message}`);
      await t.rollback();
      throw error;
    }
  }

}

module.exports = SalesService;
