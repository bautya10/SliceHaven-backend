const express = require('express'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const {connection} = require('../db/connection')
const cors = require('cors')

const userRoutes = require('../routes/user.routes')
const reserversRoutes = require('../routes/reserves.routes')

dotenv.config();
const port = process.env.PORT;
const app = express()
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`)
})

app.use('/users', userRoutes);
app.use('/reserves', reserversRoutes)

connection();