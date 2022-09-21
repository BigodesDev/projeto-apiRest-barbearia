const Haircuts = require('../models/Hairs');
const Categories = require('../models/Category');

exports.findAll = async (req, res) => {
    await Haircuts.findAll({
        atributes: ['id', 'name', 'description'],
        order: [['name', 'ASC']],
        include: [Categories]
    })
    .then((Haircuts) => {
        return res.json({
            erro: false,
            Haircuts
    });
    }).catch((err) => {
        return res.status(404).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhum Produto encontrado!!!`
        })
    })
}

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try{
        // const Product = await Haircuts.findByPk(id);
        const Product = await Haircuts.findAll({
            where: { id: id },
            include: [Categories]
        });
        if(!Product){
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro Produto não encontrado!'
            })
        }
        res.status(200).json({
            erro: false,
            Product
        })
    }catch(err) {
        res.status(404).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
}

exports.create = async (req, res) => {
    var dados = req.body;
    await Haircuts.create(dados)
    .then(() =>{

        return res.json({
            erro: false,
            mensgem: 'Produto cadastrado com sucesso!'
        });
    }).catch(err => {
        return res.status(400).json({
            erro: true,
            mensgem: `Erro: Produto não cadastrado...${err}`
        })
    })
}

exports.update = async (req, res) => {
    const { id } = req.body;
    await Haircuts.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Produto alterado com sucesso!'
        })
    }).catch((err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Produto não alterado ...${err}`
        })
    })
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Haircuts.destroy({where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Produto apagado com sucesso!!!'
        })
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Produto não apagado...`
        })
    })
}