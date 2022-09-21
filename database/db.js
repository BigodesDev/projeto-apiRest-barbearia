const Sequelize = require('sequelize')


const sequelize = new Sequelize('senac', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// const sequelize = new Sequelize( process.env.DB,  process.env.DB_USER,  process.env.DB_PASS,{
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
// });

sequelize.authenticate().then( function() {
    console.log('Conexão com o Database Realizada com Sucesso !');
}).catch( function(err){
    console.log(`Erro de Conexâo: ${err}` );
})

module.exports = sequelize;