const usersRoutes = require('express').Router();
const users = require('../controllers/users.controller');
const { validaToken } = require('../middlewares/auth');
const upload = require('../middlewares/uploadImgUser')

usersRoutes.get("/all", validaToken, users.findAll);

usersRoutes.get("/show/:id", validaToken, users.findOne);

usersRoutes.post("/create", users.create);

usersRoutes.put("/update", validaToken, users.update);

usersRoutes.delete("/delete/:id", validaToken, users.delete);

usersRoutes.post("/login", users.login);

usersRoutes.put("/password", validaToken, users.password);

usersRoutes.put("/edit-profile-image", validaToken, upload.single('image'), users.editProfileImage);

module.exports = usersRoutes;