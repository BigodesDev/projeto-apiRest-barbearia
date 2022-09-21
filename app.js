const express = require('express');
const app = express();
require('dotenv').config();
var cors = require('cors');
const path = require('path');

const router = require('./routes/index');

// Caminho para Pasta de Upload
app.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    app.use(cors());
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (request, response) {
    response.send('Serviço de API Iniciado com Sucesso !');
});

app.use(router);

app.listen(process.env.PORT,() => {
    console.log(`Servico iniciado na porta ${process.env.PORT} "http://localhost:${process.env.PORT}"`);
});