const express = require('express');
const { registerUser, loginUsers ,editUser, getAllUsers } = require('../controllers/user.controller');
const route = express();
// Ruta para obtener todos los usuarios
route.get('/', getAllUsers);
// Ruta para crear un nuevo usuario
route.post('/register', registerUser);
// Ruta para editar un usuario
route.patch('/', editUser);
//Ruta para loguear usuarios
route.post('/login', loginUsers)

module.exports = route;
