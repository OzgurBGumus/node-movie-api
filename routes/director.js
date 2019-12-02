const mongoose = require('mongoose');
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
router.get('/', (req,res) =>{
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
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
          bio: '$bio'
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
        movies:'$movies'
      }
    }

  ]);

  promise.then((data) =>{
    /*if(!data){
      next({message:'Director Not found.'});
    }*/
    //else{
      res.json(data);
    //}
  }).catch((err) => {
    res.json(err);
  });
});
router.get('/:director_id', (req,res,next)=>{
  const promise = Director.aggregate([
    {
      $match:{
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
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
          bio: '$bio'
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
        movies:'$movies'
      }
    }

  ]);

  promise.then((data) =>{
    /*if(!data){
      next({message:'Director Not found.'});
    }*/
    //else{
      res.json(data);
    //}
  }).catch((err) => {
    res.json(err);
  });
});
module.exports = router;
