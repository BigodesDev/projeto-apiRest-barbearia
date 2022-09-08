const express = require('express');
const app = express();
require('dotenv').config();
var cors = require('cors');
const { validaToken } = require('./middlewares/auth');
const upload = require('./middlewares/uploadImgServices');
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
    response.send('Serviço API Rest iniciada...');
});

app.get('/user/:id', validaToken, async (req, res) => {
    const { id } = req.params;
    try {
        // await User.findAll({ where: {id: id}})
        const users = await User.findByPk(id);
        if(!users){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Usuário encontrado!"
            })
        }
        var endImagem = "http://localhost:4500/files/users/"+ users.profileImg;
        res.status(200).json({
            erro:false,
            users,
            endImagem
        })
    } catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
});

app.put('/edit-profile-image', validaToken, upload.single('image'), async (req, res) => {
    if(req.file){
        console.log(req.file);

        await User.findByPk(req.userId)
        .then( user => {
            console.log(user);
            const imgOld = './public/upload/users/' + user.dataValues.profileImg
            
            fs.access(imgOld, (err) => {
                if(!err){
                    fs.unlink(imgOld, () => {})
                };
            });
        }).catch( () => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Perfil não Encontrado !"
            });
        });

        await User.update({profileImg: req.file.filename},
            {where: {id: req.userId}})
            .then(() => {
    return res.json({
        erro: false,
        mensagem: "Imagem Editada com Sucesso !"
    })
}).catch( (err) => {
    return res.status(400).json({
        erro: true,
        mensagem: `Erro:${err}, Imagem não Editada !`
    })
})
} else{
    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Selecione uma Imagem Válida ! (.png, .jpeg, .jpg)"
    })};
});

app.use(router);

app.listen(process.env.PORT,() => {
    console.log(`Servico iniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});