//modulos necesarios
const {createReserveServices, allReservesServices, deleteReservesService,reserveMonthDayService} = require('../services/reserves.services')

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

const deleteReserves = async (req, res) => {
  try {
    const reserveId = req.params.reserveId;
    const result = await deleteReservesService(reserveId)
    res.status(200).json({message: "reserva eliminada con exito", result});
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const reserveMonthDay = async (req,res) => {
  try {
    const reserveId = req.params.reserveId;
    const result = await reserveMonthDayService(reserveId)
    res.status(200).json({message: "reserva del dia encontrada con exito", result});
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = {
  createReserve,
  allReserves,
  deleteReserves,
  reserveMonthDay
}