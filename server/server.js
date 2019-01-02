// Directos
require('./config/config')
require('../hbs/helpers');
// Librerias
const express = require('express')
const bodyParser = require('body-parser')


//Declaracion de express
const app = express();
//hbs def
const hbs = require('hbs')


// Middleware Contenido Estatico
app.use(express.static(__dirname + '../public'));

// Express HBS Engine
hbs.registerPartials(__dirname + '../views/parciales')
app.set('view engine', 'hbs');

/**
 * Pagonas estaticas con HBS
 */
app.get('/', (req, res) => {
    res.render('home', {
        col01: 'Ventas',
        col02: 'Arriendos',
        col03: 'Otros',
        titulo: 'eodeJS - express - HBS - Mongo',
        subtitulo: 'Api Rest'
    })
})
app.get('/contacto', (req, res) => {
    res.render('contacto', {
        titulo: 'eodeJS - express - eBS - Mongo',
        subtitulo: 'Api Rest'
    })
})

/**
 * Rest Server
 */

//Body Parser
app.use(bodyParser.json())

// Usuario
app.get('/usuario', (req, res) => {
    res.json({ mensaje: 'Get Usuario' })
})
app.post('/usuario', (req, res) => {
    let body = req.body;
    res.json({ mensaje: 'Post Usuario', data: body })
})
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    res.json({ mensaje: `Put Usuario:`, data: body })
})
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({ mensaje: 'Delete Usuario' })
})


/**
 * Run Server 
 */
app.listen(process.env.PORT, () => {
    console.log(`Services en puerto ${process.env.PORT}`)
})