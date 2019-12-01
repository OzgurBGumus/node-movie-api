const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

router.post('/', (req,res,next) =>{
  const { name, surname, bio} = req.body;
  const director = new Director({
    name: name,
    surname:surname,
    bio:bio,

  });

  const promise = director.save();
  promise.then((data)=>{
    console.log('Ok!');
    res.json({status:1});
  }).catch((err) => {
    res.json(err);
  });

});
router.get('/', (req,res,next) =>{
  const promise = Director.find({});

  promise.then((director) =>{
    if(!director){
      next({message:'Director Not found.'});
    }
    else{
      res.json(director);
    }
  }).catch((err) => {
    res.json(err);
  });
});
module.exports = router;
