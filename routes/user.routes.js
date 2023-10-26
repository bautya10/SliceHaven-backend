const express = require('express');
const { registerUser } = require('../controllers/user.controller');
const route = express();

route.post('/register', registerUser)

module.exports = route