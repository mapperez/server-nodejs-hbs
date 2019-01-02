/**
 * Descripcion: Archivo de configuracion global
 */

// Puerto
process.env.PORT = process.env.PORT || 3000
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


// URL DB
let urlDB;
let firma;
let expira;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
    firma = 'local'
    expira = 60 * 60 * 24 * 30;
} else {
    urlDB = process.env.MONGO_URI
    firma = process.env.SING_TOKEN
    expira = 60 * 60 * 24 * 30;
}

process.env.URLDB = urlDB
process.env.SING_TOKEN = firma
process.env.EXPIRE_TOKEN = expira