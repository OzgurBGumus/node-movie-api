const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema(
  {
    director_id:{
      type: Schema.Types.ObjectId,
      //required:true
    },
    title: {
      type:String,
      required:true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    date:{
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('movie', movieSchema);
