const express = require('express');
const { registerUser, loginUsers ,editUser, getAllUsers, deleteUser } = require('../controllers/user.controller');
const { jwtValidator } = require('../middleware/jwtValidator');
const route = express();
// Ruta para obtener todos los usuarios
route.get('/', jwtValidator, getAllUsers);
// Ruta para crear un nuevo usuario
route.post('/register', registerUser);
// Ruta para editar un usuario
route.patch('/:userId', editUser);
// Ruta para loguear usuarios
route.post('/login', loginUsers)
// Ruta para eliminar usuarios
route.delete('/:userId', deleteUser)

module.exports = route;
