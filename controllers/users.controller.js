const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const sendMail = require('../providers/mailProvider');
const jwt = require('jsonwebtoken');

const fs = require('fs');

exports.findAll = async (req, res) => {
    await User.findAll({
        attributes: ['id', 'name', 'email'],
        order:[['name', 'ASC']]
    })
    .then( (users) =>{
        return res.json({
            erro: false,
            users
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhum Usuário encontrado!!!`
        })
    })
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.findByPk(id);
        if(!users){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Usuário encontrado!"
            })
        }
        res.status(200).json({
            erro:false,
            users
        })
    } catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
};

exports.create = async (req, res) => {

    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    let email = dados.email;
    let name = dados.name;
    let gender = dados.gender;

    await User.create(dados)
    .then( ()=>{
        /* enviar e-mail */
        let to = email;
        let cc = '';
        var htmlbody = "";
        htmlbody += '<div style="background-color:#000; margin-bottom:150px;">';
        htmlbody += '<div style="margin-top:150px;">';
        htmlbody += '<p style="color:#fff; font-weight:bold;margin-top:50px;">';
        htmlbody += 'Olá {name},';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff; font-style:italic;margin-top:50px;">';
        htmlbody += 'Sua conta foi criada com sucesso!';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff;margin-top:50px;">';
        htmlbody += 'Seu login é o seu email: {email}';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff;margin-top:50px;">';
        htmlbody += 'Sexo: {gender}';
        htmlbody += '</p>';
        htmlbody += '</div>';
        htmlbody += '</div>';
        htmlbody = htmlbody.replace('{name}', name);
        htmlbody = htmlbody.replace('{email}', email);
        htmlbody = htmlbody.replace('{gender}', gender);
        /* ************* */
        sendMail(to, cc, 'Sua conta foi criada com sucesso!', htmlbody);

        return res.json({
            erro: false,
            mensagem: 'Usuário cadastrado com sucesso!'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Usuário não cadastrado... ${err}`
        })
    })
};

exports.update = async (req, res) => {
    const { id } = req.body;
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);

    await User.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro:false,
            mensagem: 'Usuário alterado com sucesso!'
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Usuário não alterado ...${err}`
        })
    })
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id}})
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Usuário apagado com sucesso!"
        });
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Usuário não apagado...`
        });
    });
};

exports.login = async (req, res) => {
    await sleep(1000);
    function sleep(ms){
        return new Promise( (resolve) => {
            setTimeout(resolve,ms)
        })
    }

    const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password', 'profileImg'],
        where: {
            email: req.body.email
        }
    })
    if(user === null){
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Email ou senha incorreta!!"
        })
    }
    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Email ou senha incorreta!!!"
        })
    }

    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 6000 // 10min
        // expiresIn: 60 // 1min
    });

    return res.json({
        erro:false,
        mensagem: "Login realizado com sucesso!!!",
        token
    })
};

exports.password = async (req, res) => {
    const {id, password } = req.body;
    var senhaCrypt = await bcrypt.hash(password, 8);

    const users = await User.findByPk(id);
        if(!users){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Usuário encontrado!"
            })
    }
    await User.update({password: senhaCrypt }, {where: {id: id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Senha editada com sucesso!"
        }); 
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}... A senha não foi alterada!!!`
        })
    })
};

exports.validarToken = async(req, res) => {

    await sleep(3000);
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    await User.findByPk(req.userId, { 
        attributes: ['id','name','email']
    }).then( (user) => {
        return res.status(200).json({
            erro: false,
            user
        })
    }).catch( () => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login!"
        })
    })
};

exports.editProfileImage = async (req, res) => { //Oliveira
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
};