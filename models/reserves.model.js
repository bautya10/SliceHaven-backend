//modelos necesarios
const { Schema, model } = require('mongoose');

const reservesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },

  
})

module.exports= model('reserves', reservesSchema)
