const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const apiCtrl = require('./api/apiCtrl');

//api
router.post('/login',apiCtrl.login);
router.post('/users/register',apiCtrl.register);
router.get('/users/:uid/workouts',apiCtrl.workouts);
router.get('/users/:uid/exercises',apiCtrl.exercises);
router.post('/workouts/new',apiCtrl.newWorkout);
router.post('/workouts/log',apiCtrl.logWorkout);
router.post('/exercise/new',apiCtrl.newExercise);

module.exports = router;
