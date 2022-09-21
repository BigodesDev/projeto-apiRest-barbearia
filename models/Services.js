const Sequelize = require('sequelize');
const db = require('../database/db');

const Services = db.define('barberShop_services', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
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
// Services.sync();

//Excluir a tabela e criar novamente
// Services.sync({ force: true});

//Verificar se há alguma diferença na tabela, realiza alteração
// Services.sync({ alter: true});

module.exports = Services;