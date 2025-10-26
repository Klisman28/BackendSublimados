const Joi = require('joi');

const id = Joi.number().integer();
const sku = Joi.string();
const name = Joi.string().min(4).max(50);
const slug = Joi.string();
const cost = Joi.number().precision(2);
const utility = Joi.number().precision(2);
const price = Joi.number().precision(2).min(Joi.ref('cost'));
const stock = Joi.number().integer().min(0);
const stockMin = Joi.number().integer().min(0);
const expirationDate = Joi.date().iso().optional();
const imageUrl = Joi.string().uri().allow('').optional();
const brandId = Joi.number().integer();
const subcategoryId = Joi.number().integer();
const unitId = Joi.number().integer();
const features = Joi.array();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();
const filterField = Joi.string();
const filterType = Joi.string();
const filterValue = Joi.string();

const createProductSchema = Joi.object({
  name: name.required(),
  sku: sku.required(),
  slug: slug,
  cost: cost.required(),
  utility: utility.required(),
  price: price.required(),
  stock: stock.required(),
  stockMin: stockMin.required(),
  expirationDate: Joi.when('hasExpiration', {
    is: true,
    then: Joi.date().iso().required(),
    otherwise: Joi.alternatives().try(Joi.string().allow(''), Joi.valid(null)).optional()
  }),
  imageUrl: Joi.string().uri().allow('').optional(), // Esto permite null y cadenas vacías
  brandId: brandId.required(),
  subcategoryId: subcategoryId.required(),
  unitId: unitId.required(),
  hasExpiration: Joi.boolean().optional(),  // Permitir `hasExpiration`
  img: Joi.string().allow('').optional(),             // Asegúrate de permitir `img` si es necesario
  imgList: Joi.array().items(Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    img: Joi.string().uri().required()
  })).optional(),  // Permite `imgList` como un arreglo de cadenas
  description: Joi.string().allow('').optional(),  // Campo descripción opcional

  // features: features
});

const updateProductSchema = Joi.object({
  name: name,
  sku: sku,
  slug: slug,
  cost: cost,
  utility: utility,
  price: price,
  stock: stock,
  stockMin: stockMin,
  expirationDate: Joi.when('hasExpiration', {
    is: true,
    then: Joi.date().iso().required(),
    otherwise: Joi.alternatives().try(Joi.string().allow(''), Joi.valid(null)).optional()
  }),
  hasExpiration: Joi.boolean().optional(),  // Permitir `hasExpiration`
  imageUrl: Joi.alternatives().try(
    Joi.string().uri().allow(''),
    Joi.valid(null)
  ).optional(),

  brandId: brandId,
  subcategoryId: subcategoryId,
  unitId: unitId,
  features: features,
  description: Joi.string().allow('').optional(),  // Campo descripción opcional
  imgList: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      // blob:… es una URI válida, por eso solo validamos que sea string
      img: Joi.string().required()
    })
  ).optional()
}).unknown(false);

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  offset,
  limit,
  search,
  sortColumn,
  sortDirection,
  filterField,
  filterType,
  filterValue
});

const searchProductSchema = Joi.object({
  offset,
  limit,
  search: search.required(),
});

const hasExpiration = Joi.boolean().default(false);

module.exports = { createProductSchema, getProductSchema, queryProductSchema, updateProductSchema, searchProductSchema }