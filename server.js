const express = require('express')
const app = express();


//hbs def
const hbs = require('hbs')
require('./hbs/helpers');

const PORT = process.env.PORT || 3000;

// Middleware Contenido Estatico
app.use(express.static(__dirname + '/public'));

// Express HBS Engine
hbs.registerPartials(__dirname + '/views/parciales')



app.set('view engine', 'hbs');



// paginas
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




app.listen(PORT, () => {
    console.log(`Services en puerto ${PORT}`)
})