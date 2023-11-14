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

  if (usuario) {
    usuario.reserves.push(newReserve._id)
    await usuario.save()
  } else {
    throw new Error('no se pudo crear mas de 2 reservas - sevices')
  }

  if (!newReserve) throw new Error('no se pudo crear la reserva - sevices')

  return newReserve
}

//obtener todas las reservas
const allReservesServices = async () => {
  const allReserves = await reservesModels.find().populate({
    path: 'user',
    select: 'userName'
  });

  if (!allReserves) throw new Error('no se pudo encontrar las resevas - sevices')

  return allReserves
}
// Funcion para eliminar reservas por id
const deleteReservesService = async (reserveId) => {
  console.log(reserveId)
  const reservationRemoved = await reservesModels.findByIdAndDelete(reserveId);
  if (!reservationRemoved) throw new Error('no se pudo eliminar la reserva - sevices');
  return reservationRemoved;
};

const editReserveService = async ({date, day, month, people, year}, reserveId) => {


  const modifiedReserve = await reservesModels.findByIdAndUpdate(reserveId,
    {
      date: date,
      day: day,
      month: month,
      people: people,
      year:year
    });

  if ((!modifiedReserve)) throw new Error('Hubo un error al editar la reserva - service');

  return modifiedReserve;

}


//Funcion para encontrar las reservas del dia en el mes
const reserveDateService = async (reservationDay) => {
  const dayMonth = reservationDay.split('-')
  let fecha = parseInt(dayMonth[0])
  let month = parseInt(dayMonth[1])
  let year = parseInt(dayMonth[2])
  console.log(fecha,month,year)
  // obtenemos todas las reservas
  const allReserves = await reservesModels.find();
  
  // creamos una funcion en donde hace un filtrado de las reservas con dicho mes y dia
  
  function searchDayAndMonth(allReserves, fecha, month, year) {
    const objetosFiltrados = allReserves.filter(objeto => {
      return objeto.day === fecha && objeto.month === month && objeto.year === year;
    });
    //hacemos un mapeo de los objetos encontrados donde obtenemos el valor de la fecha
    const date = objetosFiltrados.map(objeto => objeto.date);
    // retornamos el nuevo array de objetos con las reservas del mes y del dia 
    return date

  }
  //ejecutamos la funcion
  const reserveDay = searchDayAndMonth(allReserves, fecha, month, year)
  console.log(reserveDay)

  if (!reserveDay) throw new Error('no se pudo encontrar las reserva del dia - sevices')
  return reserveDay
}

module.exports = {
  createReserveServices,
  allReservesServices,
  deleteReservesService,
  editReserveService,
  reserveDateService
}