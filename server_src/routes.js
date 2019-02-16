const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const apiCtrl = require('./api/apiCtrl');

//api

router.post('/users/login',apiCtrl.login);                  //Login a user
router.post('/users/register',apiCtrl.register);            //Register a user
router.get('/users/:uid/workouts',apiCtrl.workouts);        //Get a users workouts
router.get('/users/:uid/exercises',apiCtrl.exercises);      //Get a users exercises
router.post('/workouts/new',apiCtrl.newWorkout);            //Create a new workout plan
router.post('/exercise/new',apiCtrl.newExercise);           //Create a new exercise
router.post('/workouts/log',apiCtrl.logWorkout);            //Log a users workout

module.exports = router;
