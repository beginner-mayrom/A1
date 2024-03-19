const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Product = require('./models/Product');

//carregando o cabeçalho do html em outras páginas
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//arquivos estáticos
app.use('/public', express.static('public/css'));

//rota home
app.get('/', function (req, res) {

    res.render('home');
});

//rota exibir
app.get('/all', function (req, res) {
    Product.findAll().then(function(products){
        products=products.map((product)=>{return product.toJSON()});
        res.render('all', {products: products})
    });
});

//rota para cadastro
app.get('/new', function (req, res) {

    res.render('form_add');
});

//fazendo a inserção no banco de dados
app.post('/add', function (req, res) {
    Product.create({
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description
    }).then(function () {
        //redirecionado para home com barras
        res.redirect('/');
    }).catch(function (erro) {
        res.send('Houve um erro: ' + erro);
    });
});

//rota excluir
app.get('/delete/:id', function (req, res) {
    Product.destroy({
        where:{'id': req.params.id}
    }).then(function () {
        //redirecionado para home com barras
        res.redirect('/');
    }).catch(function (erro) {
        res.send('Este produto não existe' + erro);
    });
});

//rota para alterar
app.get('/alter/:id', function (req, res) {
    Product.findAll({
        where:{'id': req.params.id}
    }).then(function(products){
        products=products.map((product)=>{return product.toJSON()});
        res.render('form_update', {products: products})
    });
});

//alterando os dados no bd
app.post('/update', function (req, res) {
    Product.update({
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description},
        {where: {id: req.body.id}}
    ).then(function () {
        //redirecionado para home com barras
        res.redirect('/');
    }).catch(function (erro) {
        res.send('Este produto não existe' + erro);
    });
});

app.listen(8081, function () {
    console.log('Servidor rodando na url http://localhost:8081');
});