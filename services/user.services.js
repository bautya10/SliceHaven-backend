const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require ('jsonwebtoken');

//Registrar Usuario
const registerUserService = async ({userName, email, password, admin, suspended}) => {
  // Hasheo del password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Crear usuario
  const newUser = await User.create({userName, email, password: hashedPassword, admin, suspended});
  // Errores de hashing o almacenamiento
  if (!newUser) throw new Error('Hubo un error al crear el nuevo usuario');

  return newUser;
};

//Loguear Usuario
const loginUserService = async ({userName, email, password}) => {
  let userFounded;
  const secretKey = process.env.SECRET_KEY;

  if(userName) {
    userFounded = await User.findOne({userName})
  } else if (email){
      userFounded = await User.findOne({email})
  }
  if(!userFounded) throw new Error('Los datos ingresados no son válidos');

  const passwordMatch = await bcrypt.compare(password, userFounded.password);
  
  if(!passwordMatch) throw new Error('Los datos ingresados no son válidos');

  const payload = {
    userFounded,
  }
  const token = await jwt.sign(payload, secretKey, {
    expiresIn: '10h'
  });

  return {token, userFounded}

};


//Editar usuarios
const editUserService = async ({ userName, password }) => {
  //Hasheo del password 
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  //Crear usuario
  const newUser = await User.findOneAndUpdate({ userName:userName}, {password:hashedPassword},{
    new: true,});
  if ((!newUser)) throw new Error('Hubo un error al editar el usuario');
  
  return newUser;
}

//Traer todos los usuarios
const getAllUsersService = async ({ userName, email, admin, suspended }) => {
  // Query inicial
  let query = {};
  // Consulta de params
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
  // Guardamos los usuarios encontrados
  const users = await User.find(query).populate({
    path:'reserves',
    select: 'date time'
  });
  // Si no hay resultados devolvemos un error
  if (users.length === 0) {
    throw new Error("No se encontraron usuarios con los filtros seleccionados");
  };
  return users;
};

module.exports = {
  registerUserService,
  editUserService,
  getAllUsersService,
  loginUserService,
}