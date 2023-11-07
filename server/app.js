//Modulos necesarios
const express = require('express'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const {connection} = require('../db/connection')
const cors = require('cors')

//Definiendo rutas
const userRoutes = require('../routes/user.routes')
const reserversRoutes = require('../routes/reserves.routes')

//Configuramos dotenv 
dotenv.config();

const port = process.env.PORT;

//Instanciamos express
const app = express()

// Configura Express para manejar solicitudes JSON
app.use(express.json());

//Configurar morgan
app.use(morgan('dev'))

//configuramos corse
app.use(cors());

// Escuchamos el puerto
app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`)
})

// Definiendo rutas
app.use('/users', userRoutes);
app.use('/reserves', reserversRoutes)

// Conectando base de datos
connection();