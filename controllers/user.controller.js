const { registerUserService, editUserService } = require("../services/user.services");


// Controlador para registrar un usuario
const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//editar usuarios
const editUser = async (req, res) => {
  try {
    const modifiedUser = await editUserService(req.body);
    res.status(200).json({ modifiedUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  registerUser,
  editUser
}

