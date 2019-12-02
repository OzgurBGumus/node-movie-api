const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DirectorSchema = new Schema(
  {
    name:{
      type: String,
      required: [true, " >>{PATH}<<---Alani zorunludur."],
      minlength: [3, "{PATH} 3 karakterden az Olamaz."],
      maxlength: [30, "{PATH} 30 Karakterden fazla olamaz."]
    },
    surname:{
      type: String,
      minlength: [3, "{PATH} 3 karakterden az Olamaz."],
      maxlength: [30, "{PATH} 30 Karakterden fazla olamaz."]
    },
    bio:{
      type: String,
      minlength: [3, "{PATH} 3 karakterden az Olamaz."],
      maxlength: [1500, "{PATH} 30 Karakterden fazla olamaz."]
    },
    createdAt: {
      type: Date,
      default:Date.now
    }
  });

module.exports= mongoose.model('director', DirectorSchema);
