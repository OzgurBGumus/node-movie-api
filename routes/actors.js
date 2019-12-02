const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Actor = require('../models/Actor');

router.post('/', (req,res,next) =>{
  const {name, surname, age} = req.body;
  const actor = new Actor({
    name: name,
    surname: surname,
    age: age
  });
  const promise = actor.save();
  promise.then((data)=>{
    if(!data){
      next({message:"The Actor Was not found.. <<<<<<<<<"});
    }
    else{
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
});
router.get('/', (req,res,next) =>{
  const promise = Actor.aggregate([
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'actor_id',
        as:'movies'
      }
    },
    {
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group:{
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          age: '$age'
        },
        movies:{
          $push:'$movies'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        age:'$_idd.age',
        movies:'$movies'
      }
    }
  ]);








/*  const promise = Actor.find({ });*/
  promise.then((data) =>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
