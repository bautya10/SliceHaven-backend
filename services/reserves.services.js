//modulos necesarios
const reservesModels = require('../models/reserves.model')
const userModels = require('../models/user.model');

//crear una reserva 
const createReserveServices = async ({user,date,day,month,people,year}) => {

  const newReserve = new reservesModels({
    user,
    date,
    day,
    month,
    year,
    people
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

const editReserveService = async ({ user,date,day,month,people}, reserveId) => {

  const modifiedReserve = await reservesModels.findByIdAndUpdate(reserveId,
    { user:user,
      date:date,
      day:day,
      month:month,
      people:people
    });

    if ((!modifiedReserve)) throw new Error('Hubo un error al editar la reserva - service');

    return modifiedReserve;

}


//Funcion para encontrar las reservas del dia en el mes
const reserveDateService = async(reserveId) => {
  //obtenemos todas las reservas
  const allReserves = await reservesModels.find();
  //obtenemos el dia y el mes de el id de la reserva
  const oneReserve = await reservesModels.findById(reserveId);
  //almacenamos dia y mes
  const day = oneReserve.day
  const month = oneReserve.month

  // creamos una funcion en donde hace un filtrado de las reservas con dicho mes y dia
  function searchDayAndMonth(allReserves,day,month) {
    const objetosFiltrados = allReserves.filter(objeto => {
      return objeto.day === day && objeto.month === month;
    });
    
    //hacemos un mapeo de los objetos encontrados donde obtenemos el valor de la fecha
    const date = objetosFiltrados.map(objeto => objeto.date);
    
    //retornamos el nuevo array de objetos con las reservas del mes y del dia 
    return date
    
  }
  //ejecutamos la funcion
  const reserveDay = searchDayAndMonth(allReserves,day,month)

 if(!reserveDay) throw new Error('no se pudo encontrar las reserva - sevices')
 return reserveDay
}

module.exports = { 
  createReserveServices,
  allReservesServices,
  deleteReservesService,
  editReserveService,
  reserveDateService
}