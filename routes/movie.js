const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');


router.post('/', (req, res, next) => {
  const { title, imdb_score, category, country, year, director_id } = req.body;
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year,
    director_id: director_id
  });

  //const movie =new Movie(req.body);

  /*movie.save((err,data)=>{
    if(err){
      res.json(">>>>>>>>>>>>Error:", err);
    }
    else{
      res.json({status:1 });
    }
  });*/

  const promise = movie.save();
  promise.then((data)=>{
    res.json({status:1});
  }).catch((err) => {
    res.json(err);
  });

});
router.get('/', (req,res)=>{
  const promise = Movie.find({});

  promise.then((data) =>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
router.get('/top10', (req,res,next)=>{
  const promise = Movie.find({}).sort({'imdb_score': -1}).limit(10);

  promise.then((movie)=>{
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});
router.get('/:movie_id', (req,res,next) =>{
  const promise = Movie.findById(req.params.movie_id);


    promise.then((movie) =>{
      if(!movie){
        next({message:'The movie was not found.'});
      }
      else{
        res.json(movie);
      }
    }).catch((err) => {
      console.log("Here?");
      res.json(err);
    });
});
router.put('/:movie_id', (req,res,next) =>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body
  );
  promise.then((movie) =>{
    if(!movie){
      next({message:'The movie was not found.'});
    }
    else{
      res.json(movie);
    }
  }).catch((err) => {
    res.json(err);
  });
});
router.delete('/:movie_id', (req,res,next) =>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) =>{
    if(!movie){
      next({message:'The movie was not found'});
    }
    else{
      res.json(movie);
    }
  }).catch((err) => {
    res.json(err);
  });
});
router.get('/between/:start_year/:end_year', (req,res,next)=>{
  console.log('Entered >>>>>> /between/:start_year/:end_year');
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: {"$gte": start_year, "$lte": end_year}
  });

  promise.then((movie) =>{
    if(!movie){
      next({message:'Bu Aralikta Film Yok.'});
    }
    else {
      res.json(movie);
    }
  }).catch((err) => {
    res.json(err);
  });
});


module.exports = router;
