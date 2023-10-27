//modulos necesarios
const express = require('express')

//controladores
const { createReserve } = require('../controllers/reserves.controller')


//instanciamos express
const routesReserves = express();



//peticiones http
routesReserves.post('/reservesCreate', createReserve)

module.exports = routesReserves;