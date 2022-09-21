const Services = require('../models/Services');
const fs = require('fs')

exports.findAll = async (req, res) => {
    await Services.findAll({
        attributes: ['id', 'name', 'price'],
        order:[['name', 'ASC']]
    })
    .then( (services) =>{
        return res.json({
            erro: false,
            services
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhum Serviço foi encontrado!!!`
        })
    })


};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const services = await Services.findByPk(id);
        if(!services){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Serviço foi encontrado!"
            })
        }
        res.status(200).json({
            erro:false,
            services
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

    await Services.create(dados)
    .then( ()=>{
        return res.json({
            erro: false,
            mensagem: 'Serviço cadastrado com sucesso!'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Serviço não cadastrado... ${err}`
        })
    })
};

exports.update = async (req, res) => {
    const { id } = req.body;

    await Services.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro:false,
            mensagem: 'Serviço alterado com sucesso!'
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Serviço não alterado ...${err}`
        })
    })
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Services.destroy({ where: {id}})
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Seviço apagado com sucesso!"
        });
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Serviço não apagado...`
        });
    });
};

exports.editServicesImage = async (req, res) => {
    if(req.file){
        // console.log(req.file);
    
        await Services.findByPk(req.servicesId)
        .then( services =>{
            // console.log(services);
            const imgOld = './public/upload/services/' + services.dataValues.image

            fs.access(imgOld, (err) =>{
                if(!err){
                    fs.unlink(imgOld, () =>{})
                }

            })

        }).catch( () =>{
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Perfil do Usuário não encontrado!"
            })
        })


        await Services.update({servicesImage: req.file.filename}, 
            {where: {id: req.servicesId}})
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Imagem do Usuário editada com sucesso!"
            })
        }).catch( (err) =>{
            return res.status(400).json({
                erro: true,
                mensagem: `Erro: Imagem não editada...${err}`
            })
        })        

        
    } else {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Selecione uma imagem válida (.png, .jpg) !"
        })
    }
};

exports.viewServicesImage = async (req, res) => {
    const { id } = req.params;
    try {
        // await Services.findAll({ where: {id: id}})
        const services = await Services.findByPk(id);
        if(!services){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Usuário encontrado!"
            })
        }
        if(services.servicesImage){
            var endImagem = process.env.URL_IMG + "/files/services/"+ services.servicesImage;
        } else {
            var endImagem = "";
        }
        res.status(200).json({
            erro:false,
            services,
            endImagem
        })
    } catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
};