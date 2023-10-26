const bcrypt = require('bcrypt');
const userSchema = require('../models/user.model');

const registerUserService = async ({userName, email, password, admin, suspended}) => {
  // Hasheo del password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Crear usuario
  const newUser = await userSchema.create({userName, email, password: hashedPassword, admin, suspended});
  // Errores de hashing o almacenamiento
  if (!newUser) throw new Error('Hubo un error al crear el nuevo usuario');

  return newUser;
};

const editUserService = async ({ userName, password }) => {
  //Hasheo del password 
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  //Crear usuario
  const newUser = await userSchema.findOneAndUpdate({ userName:userName}, {password:hashedPassword},{
    new: true,});
  if ((!newUser)) throw new Error('Hubo un error al editar el usuario');
  
  return newUser;
}

module.exports = {
  registerUserService,
  editUserService
}