//modulos necesarios
const {createReserveServices, allReservesServices, deleteReservationsService} = require('../services/reserves.services')

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

const deleteReservations = async (req, res) => {
  try {
    const reserves = await deleteReservationsService(req.body)
    res.status(200).json({reserves})
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = {
  createReserve,
  allReserves,
  deleteReservations
}