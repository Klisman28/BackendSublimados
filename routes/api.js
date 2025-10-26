const express = require('express');
const passport = require('passport');

const brandsRouter = require('./catalogue/brands.router');
const categoriesRouter = require('./catalogue/categories.router');
const subcategoriesRouter = require('./catalogue/subcategories.router');
const propertiesRouter = require('./catalogue/properties.router');
const productsRouter = require('./catalogue/products.router');
const featuresRouter = require('./catalogue/features.router');
const authRouter = require('./auth/auth.router');

const employeesRouter = require('./organization/employees.router');
const usersRouter = require('./organization/users.router');
const suppliersRouter = require('./organization/suppliers.router');

const purchasesRouter = require('./transaction/purchases.router');
const cashiersRouter = require('./transaction/cashier.router');
const openingsRouter = require('./transaction/openings.router');
const salesRouter = require('./transaction/sales.router');
const configsRouter = require('./transaction/configs.router');

const customersRouter = require('./client/customers.router');
const enterprisesRouter = require('./client/enterprises.router');

const { checkRoles } = require('../middlewares/auth.handler');
const notesRouter = require('./notes/notes.router');
const reportRouter = require('./report/reports.router');

function apiRouter(app) {
    const router = express.Router();

    app.use('/api/v1', router);

     router.get('/', (req, res) => {
        res.json({ message: 'API v1 activa' });
    });

     router.get('/healthcheck', (req, res) => {
        res.status(200).json({ status: 'ok', uptime: process.uptime() });
    });

    router.use('/report',
        passport.authenticate('jwt', { session: false }),
        checkRoles('almacenero', 'admin'),
        reportRouter
    );
    router.use('/brands',
        passport.authenticate('jwt', { session: false }),
        checkRoles('almacenero', 'admin'),
        brandsRouter
    );

    router.use('/categories', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero', 'admin'),
        categoriesRouter
    );

    router.use('/subcategories', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero', 'admin'),
        subcategoriesRouter
    );

    router.use('/properties', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero', 'admin'),
        propertiesRouter
    );

    router.use('/products', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero','cajero','admin'),
        productsRouter
    );

    router.use('/features', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero', 'admin'),
        featuresRouter
    );

    router.use('/employees', passport.authenticate('jwt',
        { session: false }),
        checkRoles('admin', 'admin'),
        employeesRouter
    );

    router.use('/suppliers', passport.authenticate('jwt',
        { session: false }),
        checkRoles('admin', 'admin'),
        suppliersRouter
    );

    router.use('/purchases', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero', 'admin'),
        purchasesRouter
    );

    router.use('/customers', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero', 'admin'),
        customersRouter
    );

    router.use('/enterprises', passport.authenticate('jwt',
        { session: false }),
        checkRoles('almacenero', 'admin'),
        enterprisesRouter
    );

    router.use('/openings', passport.authenticate('jwt',
        { session: false }),
        checkRoles('cajero', 'admin'),
        openingsRouter
    );

    router.use('/cashiers', passport.authenticate('jwt',
        { session: false }),
        checkRoles('cajero', 'admin'),
        cashiersRouter
    );

    router.use('/sales', passport.authenticate('jwt',
        { session: false }),
        checkRoles('cajero', 'admin'),
        salesRouter
    );

    router.use('/configs', passport.authenticate('jwt',
        { session: false }),
        checkRoles('cajero', 'admin'),
        configsRouter
    );

    router.use('/notes', passport.authenticate('jwt',
        { session: false }),
        checkRoles('cajero', 'admin'),
        notesRouter
    );
    router.use('/tickets', passport.authenticate('jwt',
        { session: false }),
        checkRoles('cajero', 'admin'),
        notesRouter
    );



    router.use('/users', usersRouter);
    router.use('/auth', authRouter);
}

module.exports = apiRouter;