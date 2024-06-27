const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete} = require('../controllers/usuarios'); // Se importa la función usuariosGet del archivo usuarios.js
const router = Router();

// Se elimina el prefijo /api de las rutas ya que se está utilizando en el archivo server.js porque en ese archivo se configura el path /api/usuarios

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete );


module.exports = router; // Se exporta el router