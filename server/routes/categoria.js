const express = require('express')
const _ = require('underscore')
const Categoria = require('../models/categoria')




//Declaracion de express
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())



// Midleware
const { verificatoken, verifica_admin } = require('../midlewares/auth')


// Usuario
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;
    // Usuario que esta realizando la operacion
    let user = req.usuario.user

    Categoria.findById(id, (err, cat) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        res.json({
            success: true,
            data: cat
        })
    })

})
app.get('/categorias',(req, res) => {

    // Todos los usuario con paginacion
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    // Usuario que esta realizando la operacion
    let user = req.usuario.user

    try {
        Categoria.find({ estado: true })

        .skip(desde)
            .limit(limite)
            .populate('usuario', 'nombre email')
            .exec((err, cat) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }
                Categoria.count({ estado: true }, (err, total) => {

                    res.json({
                        success: true,
                        paginacion: {
                            desde,
                            limite,
                            total

                        },
                        data: cat
                    })
                })


            });


    } catch (error) {

        return res.status(400).json({
            success: false,
            error
        })
    }



})
app.post('/categoria',  (req, res) => {

    // Parametros que vienen por  post
    let body = req.body;

    // Usuario que esta realizando la operacion
    let user = req.usuario.user



    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: user._id
    })

    console.log(categoria)

    // Guarda Usuario en moongoose
    categoria.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        res.json({
            success: true,
            data: catDB
        })

    })

})
app.put('/categoria/:id',  (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    // Usuario que esta realizando la operacion
    let user = req.usuario.user


    Categoria.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: catDB
        })


    })

})
app.delete('/categoria/:id',(req, res) => {
    let id = req.params.id;
    // Usuario que esta realizando la operacion
    let user = req.usuario.user

    Categoria.findOneAndUpdate(id, { estado: false }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: catDB
        })
    })
})

// ==================================================


module.exports = app;