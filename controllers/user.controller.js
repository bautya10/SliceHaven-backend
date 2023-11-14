const { registerUserService, loginUserService, editUserService, getAllUsersService, deleteUserService } = require("../services/user.services");

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
// Controlador para editar un usuario
const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    const modifiedUser = await editUserService(userId, updatedData);
    res.status(200).json({ modifiedUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
}
// Controlador para traer usuarios
const getAllUsers = async (req, res) => {
  try {
    const info = await getAllUsersService(req.query)
    res.status(200).json({ info })
  } catch (error) {
    res.status(500).json( error.message )
  }
}
// Controlador para eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await deleteUserService(userId);
    res.status(200).json({message: "usuario eliminado con exito",users});
  } catch (error) {
    res.status(500).json( error.message );
  }
}

module.exports = {
  registerUser,
  editUser,
  getAllUsers,
  loginUsers,
  deleteUser,
}

