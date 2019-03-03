const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const apiCtrl = require('./api/apiCtrl');



//api

router.post('/users/login', apiCtrl.login);                 //Login a user
router.get('/profile/:id', apiCtrl.profile);                //Get a users profile
router.get('/profile/:id/stat')
router.get('/profile/:id/dates')
router.get('/users', apiCtrl.users);

router.get('/workouts/user/:id', apiCtrl.workouts);             //Get a users workout plans
router.get('/workouts/public', apiCtrl.publicWorkouts);
router.post('/workouts/new', apiCtrl.newWorkout);           //Post a new workout plan

router.get('/exercises/', apiCtrl.exercises);               //Get the standard exercises
router.get('/exercises/:id', apiCtrl.uExercises);          //Get a users CUSTOM exercises
router.post('/exercises/new', apiCtrl.newExercise);         //Post a custom exercise to a user profile

router.get('/logs/:id', apiCtrl.logs);                     //Get a users workout logs
router.post('/logs/new', apiCtrl.newLog);                   //Post a users workout

//router.post('/dev/exercises/new', apiCtrl.devExercise);     //Post a custom standard exercise (DEV ONLY)

module.exports = router;
