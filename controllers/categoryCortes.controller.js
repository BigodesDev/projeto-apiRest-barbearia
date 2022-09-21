const Categories = require('../models/category');

exports.findAll = async (req, res) => {
    await Categories.findAll({
        atributes: ['id', 'name', 'description'],
        order: [['name', 'ASC']]
    })
    .then((Categories) => {
        return res.json({
            erro: false,
            Categories
    });
    }).catch((err) => {
        return res.status(404).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma Categoria encontrado!!!`
        })
    })
}

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try{
        const Categorie = await Categories.findByPk(id);
        if(!Categorie){
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro Categoria não encontrada!'
            })
        }
        res.status(200).json({
            erro: false,
            Categorie
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
    await Categories.create(dados)
    .then(() =>{

        return res.json({
            erro: false,
            mensgem: 'Categoria cadastrada com sucesso!'
        });
    }).catch(err => {
        return res.status(400).json({
            erro: true,
            mensgem: `Erro: Categoria não cadastrada...${err}`
        })
    })
}

exports.update = async (req, res) => {
    const { id } = req.body;
    await Categories.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Categoria alterada com sucesso!'
        })
    }).catch((err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Categoria não alterada ...${err}`
        })
    })
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Categories.destroy({where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Categoria apagada com sucesso!!!'
        })
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Categoria não apagada...`
        })
    })
}

exports.validaToken = async (req, res) => {
    await User.findByPk(req.userId, {
      attributes: ["id", "name", "email"],
    })
      .then((user) => {
        return res.status(200).json({
          erro: false,
          user,
        });
      })
      .catch(() => {
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Necessário realizar o login!!!",
        });
      });
  };