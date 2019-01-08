const express = require('express')
const _ = require('underscore')
const Producto = require('../models/producto')




//Declaracion de express
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())



// Midleware
const { verificatoken, verifica_admin } = require('../midlewares/auth')


// Usuario
app.get('/producto/:id', [verificatoken], (req, res) => {
    let id = req.params.id;
    // Usuario que esta realizando la operacion
    let user = req.usuario.user

    Producto.findById(id, (err, pro) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        res.json({
            success: true,
            data: pro
        })
    })

})
app.get('/productos', [verificatoken], (req, res) => {

    // Todos los usuario con paginacion
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    // Usuario que esta realizando la operacion
    let user = req.usuario.user

    try {
        Producto.find({ estado: true })

        .skip(desde)
            .limit(limite)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'nombre')
            .exec((err, pro) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }
                Producto.count({ estado: true }, (err, total) => {

                    res.json({
                        success: true,
                        paginacion: {
                            desde,
                            limite,
                            total

                        },
                        data: pro
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
app.get('/productos/buscar/:termino', [verificatoken], (req, res) => {

    // Todos los usuario con paginacion
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    let termino = req.params.termino || "";

    // expresion regular like
    let regex = new RegExp(termino, 'i')


    // Usuario que esta realizando la operacion
    let user = req.usuario.user

    try {
        Producto.find({ estado: true, nombre: regex })

        .skip(desde)
            .limit(limite)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'nombre')
            .exec((err, pro) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }
                Producto.count({ estado: true }, (err, total) => {

                    res.json({
                        success: true,
                        paginacion: {
                            desde,
                            limite,
                            total

                        },
                        data: pro
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
app.post('/producto', [verificatoken, verifica_admin], (req, res) => {

    // Parametros que vienen por  post
    let body = req.body;

    // Usuario que esta realizando la operacion
    let user = req.usuario.user



    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: user._id,
    })



    // Guarda Usuario en moongoose
    producto.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        res.json({
            success: true,
            data: proDB
        })

    })

})
app.put('/producto/:id', [verificatoken, verifica_admin], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'precioUni',
        'descripcion',
        'disponible',
        'categoria'
    ]);

    // Usuario que esta realizando la operacion
    let user = req.usuario.user


    Producto.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: proDB
        })


    })

})
app.delete('/producto/:id', [verificatoken, verifica_admin], (req, res) => {
    let id = req.params.id;
    // Usuario que esta realizando la operacion
    let user = req.usuario.user

    Producto.findOneAndUpdate(id, { estado: false }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: proDB
        })
    })
})

// ==================================================


module.exports = app;