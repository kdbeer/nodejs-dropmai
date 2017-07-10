const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

//Models
const User = require('../models/user');
const Subject = require('../models/subject');
const Application = require('../models/application');


//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name : req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user)=> {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, mes : 'User registered'});
    }
  });

});

router.post('/authenticate', (req, res, next)=>{
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

  User.comparePassword(password, user.password, (err, isMatch) => {
    if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(user, config.secret, {
                  expiresIn : 604800
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user : {
            id : user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});


router.get('/profile', passport.authenticate('jwt', {session: false}) ,(req, res, next)=>{
  res.json({user: req.user});
});


router.get('/validate', (req, res, next)=>{
  res.send('Validate')
});


//Subject handle here
router.post('/addsubject', (req, res, next)=>{
  let newSubject = new Subject({
    appId : req.body.appId,
    subjectId : req.body.subjectId,
    subjectName: req.body.subjectName,
    weight: req.body.weight,
    mean: req.body.mean,
    vote_score: req.body.vote_score
  });

  Subject.addSubject(newSubject, (err, subject)=> {
    if(err) {
      res.json({success: false, msg: 'Cannot add new subject'});
    } else {
      res.json({success: true, mes : 'Add new subject completed'});
    }
  });
});

router.post('/getsubject', (req, res, next)=>{
  let appId = req.body.appId;
  Subject.getSubjectsInApp(appId, (err, Subject)=> {
    res.json(Subject);
  });
});


//Application handle
router.post('/addnewapp', (req, res, next)=> {
  let newApp = new Application({
    appId : req.body.appId,
    appMajor : req.body.appMajor,
    appFacalty : req.body.appFacalty,
    auther : req.body.auther,
    dateCreate : req.body.dateCreate,
    view : req.body.view
  });
  //Add
  Application.addApplication(newApp, (err, app)=> {
    if(err)
      res.json({success: false, msg: 'Add application failed'});
    else
      res.json({success: true, msg: 'Add application completed'});
  });

});


router.post('/getapplications', (req, res, next)=> {
  Application.fetchApps((err, data)=> {
    res.json(data);
  });
});

router.post('/updateview', (req, res, next) => {
  Application.updateview( { id : req.body._id, view : req.body.view }, (err, data)=> {
    if(err)
      throw err;
  });
});


module.exports = router;
