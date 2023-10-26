//Modulos necesarios
const express = require('express'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const {connection} = require('../db/connection')
const userRoutes = require('../routes/user.routes')

//Configuramos dotenv 
dotenv.config();

const port = process.env.PORT;

//Instanciamos express
const app = express()

// Configura Express para manejar solicitudes JSON
app.use(express.json());

// Escuchamos el puerto
app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`)
})

// Definiendo rutas
app.use('/users', userRoutes);

// Conectando base de datos
connection();