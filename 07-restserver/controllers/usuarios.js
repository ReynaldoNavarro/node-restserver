const { response, request } = require('express'); // destructurar response de express

const usuariosGet = (req, res = response) => { // al escribir res = response se está asignando un valor por defecto a res
    //const query = req.query; // Se obtienen los parámetros de la petición
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query; // Se obtienen los valores de q, nombre y apikey de la petición // Si no se envía el valor de nombre, se asigna el valor 'No name'                                                

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req = request, res = response) => {
    const { id }  = req.params; // Se obtiene el id de la petición (id es el nombre que se le dio en el archivo usuarios.js en la ruta put('/:id', usuariosPut);)
    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosPost = (req, res = response) => {
    //const body = req.body; // Se obtiene el body de la petición
    const { nombre, edad } = req.body; // Se obtienen los valores de nombre y edad del body de la petición
    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
} // Se exporta la función usariosGet