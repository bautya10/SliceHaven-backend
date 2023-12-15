// Validacion de datos
const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  validateSchema
};