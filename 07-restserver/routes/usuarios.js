const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete} = require('../controllers/usuarios'); // Se importa la función usuariosGet del archivo usuarios.js
const { esRolValido, emailExiste , existeUsuarioPorId} = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');
const router = Router();

// Se elimina el prefijo /api de las rutas ya que se está utilizando en el archivo server.js porque en ese archivo se configura el path /api/usuarios

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(), // Se verifica si el id es un id de mongo
    check('id').custom( existeUsuarioPorId ), // Se verifica si el id existe en la base de datos
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // Se verifica si el nombre no está vacío
    check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}), // Se verifica si la contraseña tiene más de 6 letras
    check('correo', 'El correo no es válido').isEmail(),  // Se verifica si el correo es válido
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), // Se verifica si el rol es válido
    check('rol').custom( esRolValido ), // Cuando el callback recibe el mismo argumento que se recibe en la función, se puede simplificar solo pasando el nombre de la función.
    check('correo').custom( emailExiste ), // Sino se coloca aqui entonces el error no se va a mostrar en la respuesta y se va a mostrar en la consola.
    validarCampos // Se verifica si hay errores en la validación
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );


module.exports = router; // Se exporta el router