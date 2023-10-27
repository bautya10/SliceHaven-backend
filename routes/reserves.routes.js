//modulos necesarios
const express = require('express')

//controladores
const { createReserve, allReserves} = require('../controllers/reserves.controller')


//instanciamos express
const routesReserves = express();



//peticiones http
routesReserves.post('/reservesCreate', createReserve)
routesReserves.get('/reservesAll', allReserves)

module.exports = routesReserves;