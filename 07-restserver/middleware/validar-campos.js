const { validationResult } = require('express-validator'); // Se importa validationResult para validar los campos


const validarCampos = (req, res, next ) => {
    const errors = validationResult(req); // Se verifica si hay errores en la validación
    if(!errors.isEmpty()) {
        return res.status(400).json(errors); // Se envía un mensaje de error si hay errores en la validación
    }

    next(); // Siguee con el siguiente middleware si no hay entonces sigue con el controlador
}

module.exports = {
    validarCampos
}   