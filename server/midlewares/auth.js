/**
 * Verifacion de TOKEN
 */

const jwt = require('jsonwebtoken');

let verificatoken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SING_TOKEN, (err, decoded) => {

        if (err) {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Token no valido'
                }
            })
        }
        req.usuario = decoded
        next();

    })
}

module.exports = {
    verificatoken
}