const router = require('express').Router();

const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

const servicesRoutes = require('./services.routes');
router.use('/services', servicesRoutes);


module.exports = router;