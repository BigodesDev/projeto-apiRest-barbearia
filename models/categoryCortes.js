const Sequelize = require('sequelize');
const db = require('../database/db');


const Categories  = db.define('barberShop_categories',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,


    },
    name:{
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    description:{
        type: Sequelize.STRING,
        allowNull: true,

    },
   
});

//criar tabela com sequelize_scope_error_default
//Categories.sync();
//excluir a tabela e criar novamente
//Categories.sync({force:true});
//verificar se algum diferença na tabela , realiza alteracao
// Categories.sync({alter: true});
//cadastrar registro no banco de dados

module.exports = Categories;