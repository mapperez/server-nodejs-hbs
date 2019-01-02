// Directos
require('./config/config')
require('../hbs/helpers');
// Librerias
const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors');


//Declaracion de express
const app = express();
//hbs def
const hbs = require('hbs')



// Rutas
app.use(require('./routes/usuario'));

// Middleware Contenido Estatico
app.use(express.static(__dirname + '/public'));

// Express HBS Engine
let ruta = __dirname + '/../views/parciales';
hbs.registerPartials(__dirname + '/../views/parciales')
app.set('view engine', 'hbs');



/**
 * Pagonas estaticas con HBS
 */
app.get('/', (req, res) => {
    res.render('home', {
        col01: 'Ventas',
        col02: 'Arriendos',
        col03: 'Otros',
        titulo: 'node - express - HBS - Mongo',
        subtitulo: 'Api Rest'
    })
});









/**
 * Run Server , Conectar Mongo
 */

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log(colors.green(`Services en Mongo  : ${colors.magenta('Cafe en Linea')}`));
    app.listen(process.env.PORT, () => {
        console.log(colors.green(`Services en puerto : ${ colors.magenta(process.env.PORT)}`))
    })
});