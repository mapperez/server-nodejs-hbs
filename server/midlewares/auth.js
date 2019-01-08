/**
 * Verifacion de TOKEN
 */

const jwt = require('jsonwebtoken');

let verificatoken = (req, res, next) => {

    let token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            success: false,
            error: {
                message: 'Se requiere Token de Authorization'
            }
        })
    } else {
        jwt.verify(token, process.env.SING_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: {
                        message: 'El token no es valido'
                    }
                })
            } else {
                req.usuario = decoded
                next();
            }
        })

    }
}
let verifica_admin = (req, res, next) => {
    let usuario = req.usuario.user;
    if (!usuario) {
        res.status(401).json({
            success: false,
            error: {
                message: 'Se requiere usuario'
            }
        })
    } else {
        if (usuario.rol === "ADMIN_ROLE") {
            next();
        } else {
            res.status(401).json({
                success: false,
                error: {
                    message: 'Se requiere rol de administrador'
                }
            })
        }
    }
}

module.exports = {
    verificatoken,
    verifica_admin
}