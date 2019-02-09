const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const apiCtrl = require('./api/apiCtrl');

//api
router.post('/register',apiCtrl.register);
router.post('/login',apiCtrl.login);
router.post('/newWorkout',apiCtrl.newWorkout);
router.post('/newExercise',apiCtrl.newExercise);
router.post('/logWorkout',apiCtrl.logWorkout);
router.get('/workouts/:uid',apiCtrl.workouts);
router.get('/workoutDetails',apiCtrl.workoutDetails);

module.exports = router;
