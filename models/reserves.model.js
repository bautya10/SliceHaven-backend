//modelos necesarios
const { Schema, model } = require('mongoose');

const reservesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  day: {
    type: Number,
    required: true,
  },
  mounth: {
    type: Number,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },

  
})

module.exports= model('reserves', reservesSchema)