const categoryhairsRoutes = require('express').Router();
const Categories = require('../controllers/categoryCortes.controller');

categoryhairsRoutes.get('/all', Categories.findAll)

categoryhairsRoutes.get('/show/:id', Categories.findOne)

categoryhairsRoutes.post('/create', Categories.create)

categoryhairsRoutes.put('/update', Categories.update)

categoryhairsRoutes.delete('/delete/:id', Categories.delete)

module.exports = categoryhairsRoutes;