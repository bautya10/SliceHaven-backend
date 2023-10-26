const { registerUserService, loginUserService } = require("../services/user.services");

// Controlador para registrar un usuario
const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const loginUsers = async (req, res) => {
  try {
    const loguedUser = await loginUserService(req.body)
    res.status(201).json({ loguedUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  registerUser,
  loginUsers,
}
