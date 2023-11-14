const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const reservesModel = require('../models/reserves.model')
const {deleteReservesService} = require('./reserves.services')
const jwt = require('jsonwebtoken');

//Registrar Usuarios
const registerUserService = async ({ userName, email, password, admin, suspended }) => {

  const emailExist = await User.findOne({ email })
  if (emailExist) throw new Error("El correo electrónico ingresado ya está en uso, por favor ingrese otro.");

  // Hasheo del password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Crear usuario
  const newUser = await User.create({ userName, email, password: hashedPassword, admin, suspended });
  // Errores de hashing o almacenamiento
  if (!newUser) throw new Error('Hubo un error al crear el nuevo usuario');

  return newUser;
};

//Loguear Usuarios
const loginUserService = async ({ email, password}) => {
  let userFounded;
  const secretKey = process.env.SECRET_KEY;

  if (email) {
    userFounded = await User.findOne({ email })
  }
  if (!userFounded) throw new Error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');

  const passwordMatch = await bcrypt.compare(password, userFounded.password);

  if (!passwordMatch) throw new Error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');

  if (userFounded.suspended === true) throw new Error('Cuenta suspendida.');

  const payload = {
    userFounded,
  }
  const token = await jwt.sign(payload, secretKey, {
    expiresIn: '10h'
  });

  return { token, userFounded }

};


const editUserService = async (userId, updatedData) => {
    const {email} = updatedData
    const emailExist = await User.findOne({ email })
  if (emailExist) throw new Error("El correo electrónico ingresado ya está en uso, por favor ingrese otro.");

    if (updatedData.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updatedData.password, saltRounds);
      updatedData.password = hashedPassword;
    }
    
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    return updatedUser;
};

const getAllUsersService = async ({ userName, email, admin, suspended, page }) => {
  const pagination = parseInt(page) || 1;
  const perPage = 8;

  let query = {};

  if (userName) {
    query.userName = { $regex: new RegExp(userName, 'i') };
  }
  if (email) {
    query.email = email;
  }
  if (admin) {
    query.admin = admin;
  }
  if (suspended) {
    query.suspended = suspended;
  }

  // Consulta para obtener el número total de usuarios
  const totalUsers = await User.countDocuments(query);

  const totalPages = Math.ceil(totalUsers / perPage);

  // Consulta para obtener los usuarios de la página actual
  const users = await User.find(query)
    .populate({
      path: 'reserves',
      select: 'date day month people hours year'
    })
    .skip((pagination - 1) * perPage)
    .limit(perPage);

  if (users.length === 0) {
    throw new Error("No se encontraron usuarios con los filtros seleccionados");
  }

  // Devuelve tanto los usuarios como el total de páginas
  return {
    users,
    totalPages
  };
};

//Eliminar usuario
const deleteUserService = async (userId) => {
  const users = await User.findById(userId).populate("reserves");
  console.log(users)
  users.reserves.forEach(reserveId => {
    deleteReservesService(reserveId._id)
  }); 
  const userRemoved = await User.findByIdAndDelete(userId)
  if(!userRemoved) throw new Error('no se pudo eliminar el usuario')
  return userRemoved;
}

module.exports = {
  registerUserService,
  editUserService,
  getAllUsersService,
  loginUserService,
  deleteUserService,
}