const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')




//Declaracion de express
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Usuario
app.get('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        res.json({
            success: true,
            data: usuario
        })
    })

})
app.get('/usuarios', (req, res) => {

    // Todos los usuario con paginacion
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;


    Usuario.find({ estado: true }, 'nombre email rol img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }
            Usuario.count({ estado: true }, (err, total) => {

                res.json({
                    success: true,
                    paginacion: {
                        desde,
                        limite,
                        total

                    },
                    data: usuarios
                })
            })


        });



})
app.post('/usuario', (req, res) => {

    // Parametros que vienen por  post
    let body = req.body;
    // Crea un nuevo objeto usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    })

    // Guarda Usuario en moongoose
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        res.json({
            success: true,
            data: usuarioDB
        })

    })

})
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //Quitar campos no actualizables
    // UnderScore pick
    let body = _.pick(req.body, ['nombre', 'img', 'rol', 'estado']);


    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: usuarioDB
        })


    })


})
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    Usuario.findOneAndUpdate(id, { estado: false }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: usuarioDB
        })
    })
})

// ==================================================


module.exports = app;