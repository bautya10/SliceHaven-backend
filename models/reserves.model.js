//modelos necesarios
const { Schema, model } = require('mongoose');

const reservesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  date: {
    type: Number,
    require: true
  },
  time: {
    type: Number,
    require: true,
  },
  
})

module.exports= model('Reserves', reserveSchema)