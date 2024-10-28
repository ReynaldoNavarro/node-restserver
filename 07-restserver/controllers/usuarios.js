const { response, request } = require('express'); // destructurar response de express
const Usuario = require('../models/usuario'); // Se importa el modelo de usuario
const bcryptjs = require('bcryptjs'); // Se importa bcryptjs

const {emailExiste}  = require('../helpers/db-validators');

const usuariosGet = async(req, res = response) => { // al escribir res = response se está asignando un valor por defecto a res
    //const query = req.query; // Se obtienen los parámetros de la petición
    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query; // Se obtienen los valores de q, nombre y apikey de la petición // Si no se envía el valor de nombre, se asigna el valor 'No name'                                                

    const { limite = 5, desde = 0 } = req.query; // Se obtienen los valores de limite y desde de la petición
    const query = { estado: true }; // Se crea un objeto query con el estado true

    // Se hace una desestructuración de arreglos para obtener el total y los usuarios y se pone el await en Promise.all para que se ejecuten al mismo tiempo.
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), // se realiza la cuenta de los documentos que cumplan con el query (estado: true)
        Usuario.find(query)
        .skip(Number(desde))  // Se castea a numero, debido a que el query es un string
        .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req = request, res = response) => {
    const { id }  = req.params; // Se obtiene el id de la petición (id es el nombre que se le dio en el archivo usuarios.js en la ruta put('/:id', usuariosPut);)
    const { _id, password, google,correo, ...resto } = req.body; // Se obtiene el body de la petición excluyendo el _id, password y google
 
    if(password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // numero de vueltas para encriptar la contraseña
        resto.password = bcryptjs.hashSync(password, salt); // Se encripta la contraseña
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true }); // se agrega el {new: true} para que devuelva el usuario actualizado.

    res.json({
        msg: 'put API - Controlador',
        usuario
    });
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre, correo, password, rol } = req.body; // Se obtiene el body de la petición
    //const { nombre, edad } = req.body; // Se obtienen los valores de nombre y edad del body de la petición
    const usuario = new Usuario({nombre, correo, password, rol}); // Se crea una nueva instancia de Usuario
    
    const existeCorreo = emailExiste(correo);
    // Encriptar la contraseña
    if (typeof password === 'string') { // Se verifica si la contraseña es un string
        const salt = bcryptjs.genSaltSync(); // numero de vueltas para encriptar la contraseña
        usuario.password = bcryptjs.hashSync(password, salt); // Se encripta la contraseña
    } else { 
        return res.status(400).json({
            msg: 'La contraseña debe ser un string'
        });
    }    
    // Guardar en BD
    await usuario.save(); // Se guarda el usuario en la base de datos

    res.json({
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params; // Se obtiene el id de la petición

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}); // Se actualiza el estado del usuario a false

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};