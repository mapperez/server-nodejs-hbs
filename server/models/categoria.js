const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;



let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es requerido']
    }
})

// Validaciones
categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} : ya se encuentra registrado'
})

// No enviar campos
categoriaSchema.methods.toJSON = function() {
    let cat = this;
    let catObject = cat.toObject();
    delete catObject.__v;
    return catObject;
}

module.exports = mongoose.model('Categoria', categoriaSchema);