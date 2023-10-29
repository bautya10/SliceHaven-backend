const { registerUserService, loginUserService, editUserService, getAllUsersService } = require("../services/user.services");

// Controlador para registrar un usuario
const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// Controlador para loguear un usuario
const loginUsers = async (req, res) => {
  try {
    const loguedUser = await loginUserService(req.body)
    res.status(201).json({ loguedUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
// controlador para editar un usuario
const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const modifiedUser = await editUserService(updatedUserData,userId);
    res.status(200).json({ modifiedUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
}
// Controlador para traer usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.query)
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json( error.message )
  }
}

module.exports = {
  registerUser,
  editUser,
  getAllUsers,
  loginUsers,
}

