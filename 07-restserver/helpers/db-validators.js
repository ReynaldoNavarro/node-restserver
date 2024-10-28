const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => { // Se verifica si el rol es válido
    const existeRol = await Role.findOne({ rol }); // Se verifica si el rol existe en la base de datos
    if(!existeRol) {
        // Error personalizado que sera atrapado en el custom.
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
};


const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo});
    if(existeEmail) {
        throw new Error(`El correo: ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = { 
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}