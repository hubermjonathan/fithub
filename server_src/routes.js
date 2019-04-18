const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const apiCtrl = require('./api/apiCtrl');

//api

router.post('/users/login', apiCtrl.login);                     //Login a user
router.get('/profile/:id/', apiCtrl.profile);                   //Get a users profile
router.get('/profile/:id/stats', apiCtrl.stats);
router.get('/profile/:id/dates', apiCtrl.dates);
router.get('/profile/:id/activity', apiCtrl.activity);
router.get('/users', apiCtrl.users);
router.get('/profile/:id/selected_stats', apiCtrl.selected_stats);          //get the user's selected stats
router.post('/profile/editName', apiCtrl.editUsername);          //Get a users CUSTOM exercises
router.post('/profile/editStats', apiCtrl.editStats);          //edit a user's selected stats
router.post('/profile/follow/', apiCtrl.follow);          //edit a user's selected stats
router.post('/profile/unfollow/', apiCtrl.unfollow);          //edit a user's selected stats

router.get('/profile/following/:id', apiCtrl.usersFollowing);             //Get a users workout plans
router.post('/workouts/following/', apiCtrl.followingWorkouts);          //edit a user's selected stats
router.get('/workouts/user/:id', apiCtrl.workouts);             //Get a users workout plans
router.get('/workouts/public/:id', apiCtrl.social);             //get comments and gains for a workout plan
router.get('/workouts/public/:user/:id', apiCtrl.social);             //get comments and gains for a workout plan
router.get('/workouts/comments/:id', apiCtrl.getWorkoutComments);               //Get the standard exercises
router.post('/workouts/public', apiCtrl.publicWorkouts);
router.post('/workouts/new', apiCtrl.newWorkout);           //Post a new workout plan
router.post('/workouts/delete', apiCtrl.delWorkout);         //Post a workout deletion to a user profile
router.post('/workouts/setpublic', apiCtrl.editWorkoutPublic);         //Post a workout deletion to a user profile
router.post('/workouts/edit', apiCtrl.editWorkout);          //edit a user's workout
router.post('/workouts/gain', apiCtrl.gain);          //gain a workout
router.post('/workouts/addComment', apiCtrl.addComment);          //add a comment to a workout

router.get('/exercises/', apiCtrl.exercises);               //Get the standard exercises
router.get('/exercises/:id', apiCtrl.uExercises);          //Get a users CUSTOM exercises
router.post('/exercises/new', apiCtrl.newExercise);         //Post a custom exercise to a user profile
router.post('/exercises/delete', apiCtrl.delExercise);         //Post an exercise deletion to a user profile
router.post('/exercises/edit', apiCtrl.editExercise);          //edit a user's private exercise1

router.get('/logs/:id', apiCtrl.logs);                     //Get a users workout logs
router.post('/logs/new', apiCtrl.newLog);                   //Post a users workout
router.post('/logs/edit', apiCtrl.editLog);                   //Post a users workout
router.post('/logs/weight', apiCtrl.logWeight);                   //Post a users new weight
router.post('/logs/calories', apiCtrl.logCalories);                   //Post a users new calories
router.get('/logs/:id/calories', apiCtrl.getCalories);                     //Get a users calorie logs
router.post('/logs/volumeChart/', apiCtrl.volumeChart);                     //Get a users weight chart for all dates
router.post('/logs/calorieChart/', apiCtrl.calorieChart);                     //Get a users calorie chart for all dates
router.post('/logs/weightChart/', apiCtrl.weightChart);                     //Get a users weight chart for all dates
router.get('/logs/:id/weight', apiCtrl.getWeight);                     //Get a users weight logs

//router.post('/dev/exercises/new', apiCtrl.devExercise);     //Post a custom standard exercise (DEV ONLY)

module.exports = router;
