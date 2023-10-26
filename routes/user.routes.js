const express = require('express');
const { registerUser, editUser } = require('../controllers/user.controller');
const route = express();

route.post('/register', registerUser)

route.patch('/', editUser)

module.exports = route
