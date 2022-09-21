const Sequelize = require('sequelize');
const db = require('../database/db');

const User = db.define('barberShop_users',{
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
    email:{
        type: Sequelize.STRING,
        allowNull: false,

    },
    phoneNumber:{
        type: Sequelize.STRING(11),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profileImg: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

// Cria a tabela com Sequelize
// User.sync();

//excluir a tabela e criar novamente
//User.sync({force:true});

//verificar se algum diferença na tabela , realiza alteracao
// User.sync({alter: true});

module.exports = User;