const express = require('express');
const router = express.Router();

var passport = require('passport');
var GooglePlusTokenStrategy = require('passport-google-plus-token');
var configAuth = require('./config/auth')

//Google Strategy for logging in
passport.use("googleToken", new GooglePlusTokenStrategy({
        clientID             : configAuth.googleAuth.clientID,
        clientSecret          : configAuth.googleAuth.clientSecret,
  },
  async(accessToken, refreshToken, profile, done) => {
    try {

      console.log('profile', profile);
  
    } catch(error) {
      done(error, false, error.message);
    }
  }));

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const apiCtrl = require('./api/apiCtrl');

//api
router.route('/oauth/google').post(passport.authenticate('googleToken', { session: false }));
router.post('/users/login',apiCtrl.login);
router.post('/users/register',apiCtrl.register);
router.get('/users/:uid/workouts',apiCtrl.workouts);
router.get('/users/:uid/exercises',apiCtrl.exercises);
router.post('/workouts/new',apiCtrl.newWorkout);
router.post('/workouts/log',apiCtrl.logWorkout);
router.post('/exercise/new',apiCtrl.newExercise);

module.exports = router;
