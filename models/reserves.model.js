//modelos necesarios
const { Schema, model } = require('mongoose');

const reservesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true,
  },
  
})

module.exports= model('reserves', reservesSchema)