const bcrypt = require('bcrypt');
const userSchema = require('../models/user.model');
const jwt = require ('jsonwebtoken');

//Registrar Usuario
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

module.exports = {
  registerUserService,
  loginUserService,
}