//modulos necesarios
const {createReserveServices, allReservesServices} = require('../services/reserves.services')

//controlador para crear una reserva 
const createReserve = async (req, res) => {
  try {
    const result = await createReserveServices(req.body);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

//controlador para traer todas las reservas
const allReserves = async (req, res) => {
  try {
    const result = await allReservesServices(req.body);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  createReserve,
  allReserves

}