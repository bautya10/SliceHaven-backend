//modulos necesarios
const reservesModels = require('../models/reserves.model')

//crear una reserva 
const createReserveServices = async ({user,date,time}) => {
  const newReserve = await reservesModels.create({
    user,
    date,
    time
  })
  if(!newReserve) throw new Error('no se pudo crear la reserva - sevices')
  
  return newReserve
}

//obtener todas las reservas
const  allReservesServices = async () => {
  const allReserves = await reservesModels.find();

  if(!allReserves) throw new Error('no se pudo encontrar las resevas - sevices')

  return allReserves
}


module.exports = { 
  createReserveServices,
  allReservesServices

  
}