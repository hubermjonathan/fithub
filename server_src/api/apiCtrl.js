const mongoose = require('mongoose');
const schemaCtrl = require('../models/schema');
const url = "mongodb://admin:team5307@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/test?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";
const passport = require('../config/passport');

function connectToDb() {
  mongoose.connect(url, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  return db;
}

//Log a user in
let login = function login(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}

//Register a user
let register = passport.authenticate('googleToken', {session: false});

//Create a new workout for the master workout library
let newWorkout = function newWorkout(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.ProfileSchema.findOne({ "uid" : req.body.uid}, function(err, user) {

      let exerciseIDs = [];
      if (user){
        console.log("----------Found user----------\n" + user + "\n------------------------------");
      } else {
        res.status(404).send({message : "User not found"});
        return;
      }
      req.body.exercises.forEach(id => {
        exerciseIDs.push(id);
      });

      console.log(exerciseIDs);

      //build the workout by adding requested exercise ObjectIDs into an array
      let newWorkout = new schemaCtrl.WorkoutSchema({
        name: req.body.name,
        exercises: exerciseIDs,
        description: req.body.description,
        ownerUID: req.body.uid,
      });

      //save the workout to the master workout collection
      newWorkout.save(function (err, newWorkout) {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: 'Workout unsuccessfully added' });
        }
        else {
          res.status(200).send({ message: 'Workout successfully added' })
        };
      });
    });
  });
}

//Add exercise to user profile
let newExercise = function newExercise(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.ProfileSchema.findOne({ "uid" : profile.uid}, function(err, user) {
      if (user){
        console.log("----------Found user----------\n" + user + "\n------------------------------");
      } else {
        res.status(404).send({message : "User not found"});
        return;
      }
      //parse body for exercises and retrieve ObjectIDs of each from the exercise collection
      for (exercise in req.body.exercises){
        let newExercise = new schemaCtrl.ExerciseSchema({
          name: exercise.name,
          description: exercise.description,
          ownerUID: req.body.uid,
        });

        newExercise.save(function (err, newExercise) {
          if (err) return res.status(500).send({ message: 'Error when parsing JSON exercises' });
          else res.status(200).send();
        });
      }
    });
  });
}

//Log a user's workout into the DB
let logWorkout = function logWorkout(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    

    let exerciseIDs = [];
    //parse body for exercises and retrieve ObjectIDs of each from the exercise collection
    req.body.exercises.forEach(exercise => {

      let newExercise = new schemaCtrl.LogExerciseSchema({
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        isWarmup: exercise.isWarmup
      });

      newExercise.save(function (err, newExercise) {
        if (err) return res.status(500).send({ message: 'Error when parsing JSON exercises' });
        else exerciseIDs.push(mongoose.Types.ObjectID(newExercise.id));
      });
    });

    //build the workout by adding requested exercise ObjectIDs into an array
    let newWorkout = new schemaCtrl.WorkoutSchema({
      name: req.body.name,
      exercises: exerciseIDs,
      description: req.body.description,
      ownerUID: req.body.uid,
    });

    //save the workout to the master workout collection
    newWorkout.save(function (err, newWorkout) {
      if (err) return res.status(500).send({ message: 'Workout unsuccessfully added' });
      else res.status(200).send({ message: 'Workout successfully added' });
    });
    
    
    
    
    
    let uid = req.body.uid;

    //loop over the exercises performed that day and create a new LogExercise for each
    let exerciseObjectIDs = []

    //create LogDay containing array of the LogExercises
    let LogDay = new schemaCtrl.LogDaySchema({
      exercise: exerciseObjectIDs,
      date: req.body.data,
      ownerUID: req.body.date
    });

    //save day
    LogDay.save(function (err, newLog) {
      if (err) return res.status(500).send({ message: 'Log unsuccessfully added' });
      else res.status(200).send({ message: 'Log successfully added' });
    });

    //update LogSchema
  });
}

//Get a user's workouts from DB, queries using req body UID of the caller
let workouts = function workouts(req, res) {
  /*let db = connectToDb();
  db.once('open', () => {
    //query profile collection
    schemaCtrl.ProfileSchema
    .findOne({uid : req.body.uid}, function(err, workouts))
    .populate('workouts')
    .exec(function(err, workouts){
      if(err){
        res.status(500).send({message: "Error getting workouts"});
      }
      else{
        res.send(workouts);
      }
    });
  });*/
}

//Get a user's exercises from DB, queries using req body UID of the caller
let exercises = function exercises(req, res) {
  /*let db = connectToDb();
  db.once('open', () => {
    //query profile collection
    schemaCtrl.ProfileSchema
    .findOne({uid : req.body.uid}, function(err, exercises))
    .populate('exercises')
    .exec(function(err, exercises){
      if(err){
        res.status(500).send({message: "Error getting exercises"});
      }
      else{
        res.send(exercises);
      }
    });
  });*/
}

let apiCtrl = {
  login: login,
  register: register,
  newExercise: newExercise,
  newWorkout: newWorkout,
  logWorkout: logWorkout,
  workouts: workouts,
  exercises: exercises,
}

module.exports = apiCtrl;
