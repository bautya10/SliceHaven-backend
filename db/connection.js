//Modulos necesarios
const mongoose = require('mongoose');

//Creamos la variable Connection

const connection = async () => {
  try {
    const conectionString = process.env.CONNECTION_STRING
    await mongoose.connect(conectionString)
    console.log('Conexión a la base de datos exitosa.')
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  connection,
}