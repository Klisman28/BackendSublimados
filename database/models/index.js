const { Brand, BrandSchema } = require('./brand.model');
const { Category, CategorySchema } = require('./category.model');
const { User, UserSchema } = require('./user.model');
const { Subcategory, SubcategorySchema } = require('./subcategory.model');
const { Role, RoleSchema } = require('./role.model');
const { RoleUser, RoleUserSchema } = require('./role-user.model');
const { BrandSubcategory, BrandSubcategorySchema } = require('./brand-subcategory.model');
const { Product, ProductSchema } = require('./product.model');
const { Unit, UnitSchema } = require('./unit.model');
const { Property, PropertySchema } = require('./property.model');
const { Option, OptionSchema } = require('./option.model');
const { Feature, FeatureSchema } = require('./feature.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Supplier, SupplierSchema } = require('./supplier.model');
const { Purchas, PurchasSchema } = require('./purchas.model');
const { ProductPurchas, ProductPurchasSchema } = require('./product-purchas.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Enterprise, EnterpriseSchema } = require('./enterprise.model');
const { Sale, SaleSchema } = require('./sale.model');
const { ProductSale, ProductSaleSchema } = require('./product-sale.model');
const { Cashier, CashierSchema } = require('./cashier.model');
const { Opening, OpeningSchema } = require('./opening.model');
const { Config, ConfigSchema } = require('./config.model');
const {Note, NoteSchema} = require('./note.model');
const {Ticket, TicketSchema} =require('./ticket.model');

function setupModels(sequelize) {
    // Inicializations
    Brand.init(BrandSchema, Brand.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Subcategory.init(SubcategorySchema, Subcategory.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Role.init(RoleSchema, Role.config(sequelize));
    RoleUser.init(RoleUserSchema, RoleUser.config(sequelize));
    BrandSubcategory.init(BrandSubcategorySchema, BrandSubcategory.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Unit.init(UnitSchema, Unit.config(sequelize));
    Property.init(PropertySchema, Property.config(sequelize));
    Option.init(OptionSchema, Option.config(sequelize));
    Feature.init(FeatureSchema, Feature.config(sequelize));
    Employee.init(EmployeeSchema, Employee.config(sequelize));
    Supplier.init(SupplierSchema, Supplier.config(sequelize));
    Purchas.init(PurchasSchema, Purchas.config(sequelize));
    ProductPurchas.init(ProductPurchasSchema, ProductPurchas.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Enterprise.init(EnterpriseSchema, Enterprise.config(sequelize));
    Cashier.init(CashierSchema, Cashier.config(sequelize));
    Opening.init(OpeningSchema, Opening.config(sequelize));
    Sale.init(SaleSchema, Sale.config(sequelize));
    ProductSale.init(ProductSaleSchema, ProductSale.config(sequelize));
    Config.init(ConfigSchema, Config.config(sequelize));
    Note.init(NoteSchema, Note.config(sequelize));
    Ticket.init(TicketSchema,Ticket.config(sequelize));
    


    // Associations
    Category.associate(sequelize.models);
    Subcategory.associate(sequelize.models);
    User.associate(sequelize.models);
    Product.associate(sequelize.models);
    Property.associate(sequelize.models);
    Option.associate(sequelize.models);
    Feature.associate(sequelize.models);
    Purchas.associate(sequelize.models);
    Cashier.associate(sequelize.models);
    Opening.associate(sequelize.models);
    Sale.associate(sequelize.models);

    //slugs
    Brand.slugify(sequelize.models);
    Category.slugify(sequelize.models);
    Subcategory.slugify(sequelize.models);
    Product.slugify(sequelize.models);
    Note.associate(sequelize.models);

}

module.exports = setupModels;