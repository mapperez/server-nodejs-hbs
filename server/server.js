// Directos
require('./config/config')
require('../hbs/helpers');
// Librerias
const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors');


//Declaracion de express
const app = express();



// Rutas
app.use(require('./routes/index'));

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