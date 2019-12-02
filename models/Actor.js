const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ActorSchema = new Schema(
  {
    name:{
      type: String,
      required: [true, '{PATH} is required... <<<<<<<<<<<<<'],
      maxlength: [35, '{PATH}`s max Size is 35... <<<<<<<<<<'],
      minlength: [3, '{PATH}`s min Size is 3... <<<<<<<<<<']
    },
    surname:{
      type: String,
      maxlength: [35, '{PATH}`s max Size is 35... <<<<<<<<<<'],
      minlength: [3, '{PATH}`s min Size is 3... <<<<<<<<<<']
    },
    age:{
      type: Number,
      max:[120, 'Is She/he a Zombie? {PATH} <<<<<<<<<<'],
      min:[0, 'Firstly Have to born... {PATH} <<<<<<<<<<'],
      required: [true, 'the {PATH} is required for enrollments...']
    },
    createdAt:{
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('actor', ActorSchema);
