const servicesRoutes = require('express').Router();
const services = require('../controllers/services.controller');
const { validarToken } = require('../middlewares/auth');

servicesRoutes.get("/all", validarToken, services.findAll);

servicesRoutes.get("/show/:id", validarToken, services.findOne);

servicesRoutes.post("/create", validarToken, services.create);

servicesRoutes.put("/update", validarToken, services.update);

servicesRoutes.delete("/delete/:id", validarToken, services.delete);

servicesRoutes.put("/edit-services-image", validarToken, upload.single('image'), services.editServicesImage);

servicesRoutes.get("/validatoken", validarToken, services.validatoken);

module.exports = servicesRoutes;