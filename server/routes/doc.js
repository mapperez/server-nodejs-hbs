const express = require('express')



// Directos
require('../config/config')
require('../../hbs/helpers')

// Aplicacion
const app = express();


//hbs def
const hbs = require('hbs')

// Middleware Contenido Estatico
app.use(express.static(__dirname + '/public'))
    // Express HBS Engine
hbs.registerPartials(__dirname + '/../../views/parciales')
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


module.exports = app;