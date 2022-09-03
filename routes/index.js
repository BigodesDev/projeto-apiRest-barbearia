const router = require('express').Router();

const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

const servicesRoutes = require('./services.routes');
router.use('/services', servicesRoutes);

const hairscutsRoutes = require('./haircuts.routes');
router.use('/hairs', hairscutsRoutes);

const categoryhairsRoutes = require('./categoryhairs.routes');
router.use('/categories', categoryhairsRoutes);

module.exports = router;