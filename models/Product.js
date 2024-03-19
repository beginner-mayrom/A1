const db = require('./db');

//criando a tabela postagem

const Product = db.sequelize.define('product',{
    name: {
        type: db.Sequelize.TEXT
    },
    amount: {
        type: db.Sequelize.INTEGER
    },
    description: {
        type: db.Sequelize.TEXT
    }
});

Product.sync({force: true});

module.exports = Product;