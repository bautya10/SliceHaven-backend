//modulos necesarios
const express = require('express')

//controladores
const { createReserve, allReserves, deleteReservations} = require('../controllers/reserves.controller')


//instanciamos express
const routesReserves = express();



//peticiones http
routesReserves.post('/reservesCreate', createReserve)
routesReserves.get('/reservesAll', allReserves)
routesReserves.delete('/reservationsDelete', deleteReservations)

module.exports = routesReserves;