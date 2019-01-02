/**
 * Descripcion: Archivo de configuracion global
 */

// Puerto
process.env.PORT = process.env.PORT || 3000
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb://mapperez:3yaxa9ef@ds147684.mlab.com:47684/cafe'
}

process.env.URLDB = urlDB