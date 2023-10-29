//modulos necesarios
const reservesModels = require('../models/reserves.model')
const userModels = require('../models/user.model');

//crear una reserva 
const createReserveServices = async ({user,date,time}) => {

  const newReserve = new reservesModels({
    user,
    date,
    time
  })

  await newReserve.save();

  const usuario = await userModels.findById(user)
  
  if(usuario){
    usuario.reserves.push(newReserve._id)
    await usuario.save()
  }else{
    throw new Error('no se pudo crear mas de 2 reservas - sevices')
  }

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