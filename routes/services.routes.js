const servicesRoutes = require('express').Router();
const services = require('../controllers/services.controller');
const { validaToken } = require('../middlewares/auth');
const { upload, single } = require("../middlewares/uploadImgServices")
// const multer  = require('multer')

servicesRoutes.get("/all", validaToken, services.findAll);

servicesRoutes.get("/show/:id", validaToken, services.findOne);

servicesRoutes.post("/create", validaToken, services.create);

servicesRoutes.put("/update", validaToken, services.update);

servicesRoutes.delete("/delete/:id", validaToken, services.delete);

servicesRoutes.put("/edit-services-image", validaToken, upload.single('servicesImages'), services.editServicesImage);

servicesRoutes.get("/validatoken", validaToken, services.validatoken);

module.exports = servicesRoutes;