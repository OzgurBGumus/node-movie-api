const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req,res,next)=>{
  const {username, password} = req.body;
  bcrypt.hash(password,10).then((hash)=>{
    const user = new User({
      username,
      password:hash
    });
    const promise = user.save();
    promise.then((data)=>{
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});

router.post('/authenticate', (req,res) =>{
  const {username,password} = req.body;
  User.findOne({
    username,
  }, (err,data) =>{
    if(err){
      throw err;
    }
    else if(!data){
      res.json({
        status:false,
        message:'Authentication Failed.. User not found <<<<<<<<'
      });
    }
    else{
      bcrypt.compare(password, data.password).then((result)=>{
        if(!result){
          console.log("OK FALSE!");
          res.json({
            status:false,
            message:'Authentication Failed.. Password is incorrect <<<<<<<<'
          });
        }
        else{
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn:720 //12 saat
          });
          res.json({
            status:true,
            token
          })

        }
      });
    }
  });
});

module.exports = router;
