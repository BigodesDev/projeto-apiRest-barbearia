const Sequelize = require('sequelize');
const db = require('../database/db');

const Service = db.define('barberShop_service', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    price: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: false,
    }
})


//Criar a tabela com sequelize
//Service.sync();

//Excluir a tabela e criar novamente
//Service.sync({ force: true});

//Verificar se há alguma diferença na tabela, realiza alteração
// Service.sync({ alter: true});

module.exports =Service;