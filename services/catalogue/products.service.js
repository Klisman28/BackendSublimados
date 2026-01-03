const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');
const { Sequelize } = require('sequelize');


class ProductsService {
    async find(query) {
        const { limit, offset, search, sortColumn, sortDirection, filterField, filterType, filterValue } = query;

        const options = {
            where: {},
            include: [
                {
                    model: models.Brand,
                    as: 'brand',
                    attributes: ['name']
                },
                {
                    model: models.Subcategory,
                    as: 'subcategory',
                    attributes: ['name']
                },
                {
                    model: models.Unit,
                    as: 'unit',
                    attributes: ['symbol']
                },
                // {
                //     model: models.Feature,
                //     as: 'features',
                //     attributes: ['value'],
                //     include: [{
                //         model: models.Option,
                //         as: 'option',
                //         attributes: ['value'],
                //     }, {
                //         model: models.Property,
                //         as: 'property',
                //         attributes: ['name'],
                //     }]
                // }
            ],
            order: [(sortColumn) ? [sortColumn, sortDirection] : ['id', 'DESC']]
        }
        const optionsCount = { where: {} };

        if (limit && offset) {
            options.limit = parseInt(limit);
            options.offset = parseInt(offset);
        }


        if (search) {
            options.where = {
                ...options.where,
                name: {
                    [Op.like]: `%${search}%`
                }
            }

            optionsCount.where = {
                name: {
                    [Op.like]: `%${search}%`
                }
            }
        }


        if (filterField && filterType && filterValue) {
            const data = this.addFilter(filterField, filterType, filterValue);
            if (data != null) {
                options.where = {
                    ...options.where,
                    [filterField]: data
                }
                optionsCount.where = {
                    ...optionsCount.where,
                    [filterField]: data
                }
            }
        }

        const products = await models.Product.findAll(options);
        const total = await models.Product.count(optionsCount);

        return { products, total };
    }

    async findExpiringSoon() {
        const products = await models.Product.findAll({
            where: {
                expirationDate: {
                    [Op.between]: [
                        Sequelize.literal('CURRENT_DATE'),
                        Sequelize.literal('DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY)')
                    ]
                }
            },
            include: [
                { model: models.Brand, as: 'brand', attributes: ['name'] },
                { model: models.Subcategory, as: 'subcategory', attributes: ['name'] },
                { model: models.Unit, as: 'unit', attributes: ['symbol'] }
            ],
            order: [['expirationDate', 'ASC']]
        });
          return products;

    }


    addFilter(filterField, filterType, filterValue) {
        switch (filterField) {
            case 'cost':
                if (filterType != "like" && !isNaN(filterValue)) {
                    return {
                        [Op[filterType]]: parseFloat(filterValue)
                    }
                }
                return null;
            case 'price':
                if (filterType != "like" && !isNaN(filterValue)) {
                    return {
                        [Op[filterType]]: parseFloat(filterValue)
                    }
                }
                return null;
            case 'stockMin':
                if (filterType != "like" && !isNaN(filterValue)) {
                    return {
                        [Op[filterType]]: parseInt(filterValue)
                    }
                }
                return null;
            case 'expirationDate':
                // soporta eq, lt, gt, lte, gte, between…
                return { [Op[filterType]]: filterValue };   // filterValue = '2025‑05‑01'
            case 'stock':
                if (filterType != "like" && !isNaN(filterValue)) {
                    return {
                        [Op[filterType]]: parseInt(filterValue)
                    }
                }
                return null;
            case 'status':
                if (filterType == 'like') {
                    if ((filterValue.toLowerCase()) === 'activo') {
                        return {
                            [Op.eq]: 1
                        }
                    } else if ((filterValue.toLowerCase()) === 'inactivo') {
                        return {
                            [Op.eq]: 2
                        }
                    }
                }
                return null;
            default:
                return null;
        }
    }

    async search(query) {
        const { limit, offset, search } = query;

        const options = {
            where: {},
            include: [
                {
                    model: models.Brand,
                    as: 'brand',
                    attributes: ['name']
                },
                {
                    model: models.Subcategory,
                    as: 'subcategory',
                    attributes: ['name']
                },
                {
                    model: models.Unit,
                    as: 'unit',
                    attributes: ['symbol']
                },
                // {
                //     model: models.Feature,
                //     as: 'features',
                //     attributes: ['value'],
                //     include: [{
                //         model: models.Option,
                //         as: 'option',
                //         attributes: ['value'],
                //     }, {
                //         model: models.Property,
                //         as: 'property',
                //         attributes: ['name'],
                //     }]
                // }
            ],
            order: [['name', 'DESC']]
        }

        if (limit && offset) {
            options.limit = parseInt(limit);
            options.offset = parseInt(offset);
        }

        if (search) {
            options.where = {
                ...options.where,
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { sku: { [Op.like]: `%${search}%` } }
                ]
            }
        }

        const products = await models.Product.findAll(options);

        return products;
    }


    async create(data) {
        let productData = { ...data };  // Asegúrate de inicializar correctamente los datos del producto

        // if (data.features && data.features.length > 0) {
        //     const features = data.features.map((feature) => {
        //         return {
        //             ...feature,
        //             productId: product.id
        //         }
        //     });
        //     await models.Feature.bulkCreate(features);
        // }
        // Asegurarse de que expirationDate solo se guarde si hasExpiration es true
        if (data.hasExpiration && data.expirationDate) {
            productData.expirationDate = data.expirationDate;
        } else {
            productData.expirationDate = null;
        }
        if (data.description) {
            productData.description = data.description;
        }

        // Crear el producto en la base de datos
        const product = await models.Product.create(productData);
        return product;
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('No se encontro ningun producto');
        }
        return product;
    }

  async update(id, changes) {
  let product = await this.findOne(id);

  // Normalizar expirationDate
  if (changes.hasExpiration) {
    // si viene vacío o no viene -> null
    if (!changes.expirationDate) {
      changes.expirationDate = null;
    } else {
      const d = new Date(changes.expirationDate);

      // validar fecha
      if (Number.isNaN(d.getTime())) {
        // ideal: lanzar 400 (bad request) en vez de 500
        throw new Error('expirationDate inválida');
      }

      // Si tu columna es DATEONLY, mejor guardar YYYY-MM-DD
      // changes.expirationDate = d.toISOString().slice(0, 10);

      // Si tu columna es DATETIME, puedes guardar Date directamente
      changes.expirationDate = d;
    }
  } else {
    changes.expirationDate = null;
  }

  product = await product.update(changes);
  return product;
}


    async delete(id) {
        const product = await this.findOne(id);
        await product.destroy();
        return { id };
    }

    async findUnits() {
        const units = await models.Unit.findAll();
        return units;
    }
}

module.exports = ProductsService;