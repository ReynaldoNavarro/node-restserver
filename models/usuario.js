// una coleccion en mongo es una tabla en mysql

const e = require('express');
const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // se cambia de enum a emun para que no haya problemas cuando se valida el rol desde la BD.
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// metodo que sobre escribe el metodo toJSON. tiene que ser una funcion normal para que funcione el this. Porque tiene que hacer referencia a la instancia de la clase.
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject(); // Se extrae la versión y la contraseña del objeto usuario y se unifican en un objeto llamado usuario
    return usuario; 
}

module.exports = model('Usuario', UsuarioSchema);

