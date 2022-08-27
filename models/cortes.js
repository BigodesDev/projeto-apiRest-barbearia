const Sequelize = require('sequelize');
const db = require('../database/db');
const Categories = require('./categoryCortes');

const Cortes = db.define('barberShop_cortes', {
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

Cortes.belongsTo(Categories, {
    constraint: true,
    foreignKey: 'categorieId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

//Criar a tabela com sequelize
 //Cortes.sync();

//Excluir a tabela e criar novamente
//Cortes.sync({ force: true});

//Verificar se há alguma diferença na tabela, realiza alteração
// Cortes.sync({ alter: true});

module.exports = Cortes;