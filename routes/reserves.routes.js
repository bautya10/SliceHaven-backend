//modulos necesarios
const express = require('express')

//controladores
const { createReserve, allReserves, deleteReserves} = require('../controllers/reserves.controller')


//instanciamos express
const routesReserves = express();



//peticiones http
routesReserves.post('/reservesCreate', createReserve)
routesReserves.get('/reservesAll', allReserves)
routesReserves.delete('/:reserveId', deleteReserves)

module.exports = routesReserves;