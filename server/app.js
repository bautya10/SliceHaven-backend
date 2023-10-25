//Modulos necesarios
const express = require('express'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const {connection} = require('../db/connection')

//Configuramos dotenv 
dotenv.config();

const port = process.env.PORT;

//Instanciamos express

const app = express()

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`)
})

connection();