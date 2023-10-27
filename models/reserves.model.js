//modelos necesarios
const { Schema, model } = require('mongoose');

const reservesSchema = new Schema({
  user: {
    type: String,
    require: true,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "users",
  //   require: true,
  // },
  date: {
    type: Number,
    require: true
  },
  time: {
    type: Number,
    require: true,
  },
  
})

module.exports= model('reserves', reservesSchema)