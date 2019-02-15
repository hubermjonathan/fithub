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

let reg = passport.authenticate('googleToken', {session: false});

//Log a user in
let login = function login(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}

//Register a user
let register = function register(req, res) {
  //let db = connectToDb();
  //db.once('open', () => {
  //});
  console.log("auth");
  passport.authenticate('googleToken', {session: false});

}

//Add a new workout into a users profile
let newWorkout = function newWorkout(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    let newWorkout = new schemaCtrl.WorkoutSchema({
      uid: req.body.uid,
      description: req.body.description,
    });

    newWorkout.save(function (err, newWorkout) {
      if (err) return res.status(500).send({ message: 'Workout unsuccessfully added' });
      else res.status(200).send({ message: 'Workout successfully added' });
    });
  });
}

//Add a new exercise to a user's profile
let newExercise = function newExercise(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    let newExercise = new schemaCtrl.ExerciseSchema({
      uid: req.body.uid,
      description: req.body.description,
    });

    newExercise.save(function (err, newExercise) {
      if (err) return res.status(500).send({ message: 'Exercise unsuccessfully added' });
      else res.status(200).send({ message: 'Exercise successfully added' });
    });
  });
}

//Log a user's workout into the DB
let logWorkout = function logWorkout(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    let uid = req.body.uid;
    let newLog = new schemaCtrl.LogSchema({
      exercise: req.body.exercise,
      data: req.body.data,
      dates: req.body.date
    });
    newLog.save(function (err, newLog) {
      if (err) return res.status(500).send({ message: 'Log unsuccessfully added' });
      else res.status(200).send({ message: 'Log successfully added' });
    });
  });
}

//Get a users workouts from DB
let workouts = function workouts(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.workouts.findOne({uid : req.body.uid}, function(err, workouts){
      if(err){
        res.status(500).send({message: "Error getting workouts"});
      }
      else{
        res.send(workouts);
      }
    })
  });
}

//Get a users exercises from DB
let exercises = function exercises(req, res) {
  let db = connectToDb();
  db.once('open', () => {
  });
}

let apiCtrl = {
  login: login,
  register: register,
  newExercise: newExercise,
  newWorkout: newWorkout,
  logWorkout: logWorkout,
  workouts: workouts,
  exercises: exercises,
  passport: passport,
  reg: reg
}

module.exports = apiCtrl;
