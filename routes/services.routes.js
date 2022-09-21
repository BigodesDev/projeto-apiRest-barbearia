const servicesRoutes = require('express').Router();
const services = require('../controllers/services.controller');
const { validaToken } = require('../middlewares/auth');

servicesRoutes.get("/all", validaToken, services.findAll);

servicesRoutes.get("/show/:id", validaToken, services.findOne);

servicesRoutes.post("/create", validaToken, services.create);

servicesRoutes.put("/update", validaToken, services.update);

servicesRoutes.delete("/delete/:id", validaToken, services.delete);

module.exports = servicesRoutes;