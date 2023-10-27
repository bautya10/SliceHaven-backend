const express = require('express');
const { registerUser, loginUsers, editUser } = require('../controllers/user.controller');
const route = express();

//Ruta para registrar usuarios
route.post('/register', registerUser)

//Ruta para loguear usuarios
route.post('/login', loginUsers)

route.patch('/', editUser)

module.exports = route
