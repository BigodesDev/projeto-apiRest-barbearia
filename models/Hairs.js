const Sequelize = require('sequelize');
const db = require('../database/db');
const Categories = require('./Category');

const Haircuts = db.define('barberShop_cortes', {
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

Haircuts.belongsTo(Categories, {
    constraint: true,
    foreignKey: 'categorieId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

//Criar a tabela com sequelize
//  Haircuts.sync();

//Excluir a tabela e criar novamente
// Haircuts.sync({ force: true});

//Verificar se há alguma diferença na tabela, realiza alteração
// Haircuts.sync({ alter: true});

module.exports = Haircuts;