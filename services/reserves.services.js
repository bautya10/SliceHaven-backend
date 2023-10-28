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
// Funcion para eliminar reservas por id
const deleteReservationsService = async ({_id}) => {
  const reservationRemoved = await reservesModels.findByIdAndDelete({_id})
  if(!reservationRemoved) throw new Error('no se pudo encontrar la reserva - sevices')
  return reservationRemoved;
}

module.exports = { 
  createReserveServices,
  allReservesServices,
  deleteReservationsService
}