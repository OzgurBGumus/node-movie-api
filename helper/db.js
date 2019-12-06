const mongoose = require('mongoose');
module.exports = () =>{
  mongoose.connect('mongodb://user:abcd1234@ds349628.mlab.com:49628/heroku_14kp4x1w');
  mongoose.connection.on('open', ()=>{
    //console.log("MongoDB: Connected");
  });
  mongoose.connection.on('error', (err)=>{
    console.log("MongoDB: Error >>>>", err);
  });

  mongoose.Promise = global.Promise;
};
