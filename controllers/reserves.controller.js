//modulos necesarios
const {createReserveServices} = require('../services/reserves.services')

//controlador para crear una reserva 
const createReserve = async (req, res) => {
  try {
    await createReserveServices(req.body);
    res.status(200).json({msj: 'reserva creada'})
  } catch (error) {
    res.estatus(500).json({msj: 'error'})
  }
}

module.exports = {
  createReserve,

}