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
const deleteReservesService = async (reserveId) => {
  console.log(reserveId)
  const reservationRemoved = await reservesModels.findByIdAndDelete(reserveId);
  if(!reservationRemoved) throw new Error('no se pudo eliminar la reserva - sevices');
  return reservationRemoved;
};

//Funcion para encontrar las reservas del dia en el mes
const reserveMonthDayService = async(reserveId) => {
 const oneReserve = await reservesModels.findById(reserveId);
  // const day = oneReserve.day
  // const day = oneReserve.mounth
 console.log(oneReserve)
 if(!oneReserve) throw new Error('no se pudo encontrar las reserva - sevices')
 return oneReserve
}

module.exports = { 
  createReserveServices,
  allReservesServices,
  deleteReservesService,
  reserveMonthDayService
}