const hbs = require('hbs')

hbs.registerHelper('capitalizar', (texto) => {



    let parrafo = texto.split(' ');
    let nparra = []


    parrafo.forEach((pal, idx) => {

        nparra[idx] = pal.charAt(0).toUpperCase() + pal.slice(1).toLowerCase();
    });

    return nparra.join(' ');

})