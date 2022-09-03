const hairscutsRoutes = require('express').Router();
const Haircuts = require('../controllers/hairs.controller');

hairscutsRoutes.get('/all', Haircuts.findAll)

hairscutsRoutes.get('/show/:id', Haircuts.findOne)

hairscutsRoutes.post('/create', Haircuts.create)

hairscutsRoutes.put('/update', Haircuts.update)

hairscutsRoutes.delete('/delete/:id', Haircuts.delete)

module.exports = hairscutsRoutes;