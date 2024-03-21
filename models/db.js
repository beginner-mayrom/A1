const Sequelize = require('sequelize');

//Conexão com o banco de dados
const sequelize = new Sequelize ('a1db','postgres','54903214',{
    host: "localhost",
    port: "5432",
    dialect: "postgresql"
});

//Exportando as variáveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}