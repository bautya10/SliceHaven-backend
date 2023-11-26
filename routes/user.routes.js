const express = require('express');
const { registerUser, loginUsers ,editUser, getAllUsers, deleteUser } = require('../controllers/user.controller');
const { jwtValidator } = require('../middleware/jwtValidator');
const route = express();
const { validateSchema } = require("../middleware/validateSchemas");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");

route.get('/', jwtValidator, getAllUsers);
route.post('/register', validateSchema(registerSchema), registerUser);
route.patch('/:userId', editUser); 
route.post('/login', validateSchema(loginSchema), loginUsers);
route.delete('/:userId', deleteUser); 

module.exports = route;
