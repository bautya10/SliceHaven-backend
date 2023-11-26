const express = require('express')
const { createReserve, allReserves, deleteReserves, editReserves, reserveDate} = require('../controllers/reserves.controller');

const routesReserves = express();

routesReserves.post('/reservesCreate', createReserve);
routesReserves.get('/reservesAll', allReserves);
routesReserves.delete('/:reserveId', deleteReserves);
routesReserves.patch('/:reserveId', editReserves);
routesReserves.get('/reserveDate/:reservationDay', reserveDate);

module.exports = routesReserves;