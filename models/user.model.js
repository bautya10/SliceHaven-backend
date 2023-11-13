//modelos necesarios
const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  userName: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      requiered: true
  },
  admin: {
      type: Boolean,
      default: false
  },
  suspended: {
      type: Boolean,
      default: false
  },
  reserves: [{
      type: Schema.Types.ObjectId,
      ref: "reserves",
      required: true,
  }]
})

module.exports = model("users", userSchema)