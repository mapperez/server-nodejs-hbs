const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')


//Declaracion de express
const app = express();
app.use(bodyParser.json())
    // ==================================================


app.post('/login', (req, res) => {
    // Parametros que vienen por  post
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (!userDB) {
            return res.status(500).json({
                success: false,
                error: {
                    message: 'Usuario ó contraseña incorrecto'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Usuario ó contraseña incorrecto'
                }
            })
        }


        //Generar token
        let token = jwt.sign({ user: userDB }, process.env.SING_TOKEN, { expiresIn: process.env.EXPIRE_TOKEN });

        let resp = {
            success: true,
            data: {
                userDB,
                token
            }
        }

        return res.json(resp)


    })
})


module.exports = app;