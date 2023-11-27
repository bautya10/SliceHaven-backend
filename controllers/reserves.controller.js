const {createReserveServices, allReservesServices, deleteReservesService, editReserveService,reserveDateService} = require('../services/reserves.services');

//controlador para crear una reserva 
const createReserve = async (req, res) => {
  try {
    const result = await createReserveServices(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//controlador para traer todas las reservas
const allReserves = async (req, res) => {
  try {
    const result = await allReservesServices(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//controlador para eliminar las reservas
const deleteReserves = async (req, res) => {
  try {
    const reserveId = req.params.reserveId;
    const result = await deleteReservesService(reserveId)
    res.status(200).json({message: "reserva eliminada con exito", result});
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const reserveDate = async (req,res) => {
  try {
    const reservationDay = req.params.reservationDay
    const result = await reserveDateService(reservationDay);
    res.status(200).json({message: "reservas del dia encontrada con exito", result});
  } catch (error) {
    res.status(500).json(error.message);
  }
};
 //controlador para editar una reserva
const editReserves = async (req, res) => {
  try {
    const reserveId = req.params.reserveId;
    const updatedReserveData = req.body;
    const modifiedReserve = await editReserveService(updatedReserveData, reserveId);
    res.status(200).json({modifiedReserve});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createReserve,
  allReserves,
  deleteReserves,
  editReserves,
  reserveDate
};