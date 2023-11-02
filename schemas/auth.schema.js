const { z } = require("zod"); //nos va a permitir dar tipos de datos

const registerSchema = z.object({
  userName: z.string({
    //primera validacion, debe ser un string
    required_error: "El nombre de usuario es requerido",
  })  
  .min(2, {
    //minimo de caracteres
    message: "El nombre de usuario debe contener minimo 2 caracteres",
  }),

  email: z
    .string({
      // debe ser un string
      required_error: "Email es requerido",
    })
    .email({
      //debe ser un email valido
      message: "Email invalido",
    })
    .max(30, {
      //maximo de caracteres
      message: "El email no debe contener mas de 30 caracteres",
    }),

  password: z
    .string({
      // debe ser un string
      required_error: "contraseña es requerida",
    })
    .min(6, {
      //minimo de caracteres
      message: "La contraseña debe contener mas de 6 caracteres",
    })
    .max(30, {
      //maximo de caracteres
      message: "La contraseña no debe contener mas de 30 caracteres",
    })
});

const loginSchema = z.object({
  email: z
    .string({
      // debe ser un string
      required_error: "Email es requerido",
    })
    .email({
      //debe ser un email valido
      message: "Email invalido",
    })
    .max(30, {
      //maximo de caracteres
      message: "El email no debe contener mas de 30 caracteres",
    }),

  password: z
    .string({
      // debe ser un string
      required_error: "contraseña es requerida",
    })
    .min(6, {
      //minimo de caracteres
      message: "La contraseña debe contener mas de 6 caracteres",
    })
    .max(30, {
      //maximo de caracteres
      message: "La contraseña no debe contener mas de 30 caracteres",
    }),
});

module.exports = {
  registerSchema,
  loginSchema
};
