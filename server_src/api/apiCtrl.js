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
    console.log("Here");
  });
}

//Register a user
let register = passport.authenticate('googleToken', { successRedirect: '/',
                                                     failureRedirect: '/login' });

// let register = passport.authenticate('googleToken', function(err, user, info) {
//     if (err) { return next(err); }
//     else if (!info) { return res.redirect("/login"); }
//     else { return "/login";}
//   });

//Create a new workout for the master workout library
let newWorkout = function newWorkout(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.Profile.findOne({ "uid" : req.body.uid}, (err, user) => {

      if (user){
        console.log("----------Found user----------\n" + user + "\n------------------------------");
      } else {
        res.status(404).send({message : "User not found"});
        return;
      }

      //Construct the JSON exercise objects and push them to exercises
      let exercises = [];      
      req.body.exercises.forEach(exercise => {
        let newExercise = {
          name: exercise.name,
          reps: exercise.reps,
          isWarmup: exercise.isWarmup
        };
        exercises.push(newExercise);
      });
  
      //Construct the workout JSON object
      let newWorkout = new schemaCtrl.Workout({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        exercises: exercises,
        ownerUID : req.body.uid,
        likes: 0,
      });


      //save the workout to the master workout collection
      newWorkout.save((err, newWorkout) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: 'Workout unsuccessfully added' });
        }
        else {
          schemaCtrl.Profile.updateOne(
            { uid: req.body.uid }, 
            { $push: { workouts : newWorkout._id } },
            {},
            (err, raw) => {
              if (err) {
                return res.status(500).send({ message: 'Workout unsuccessfully added' });
              } else{
                res.status(200).send({"message" : "Workout added successfully"});
              }
            }
          );
        };
      });
    });
  });
}

let newExercise = function newExercise(req, res) {
  let db = connectToDb();
  db.once('open', () => {

  });
}

//Add exercise to user profile
let devExercise = function devExercise(req, res) {
  let db = connectToDb();
  db.once('open', () => {

    //Construct the exercise from the schema
    let newExercise = new schemaCtrl.Exercise({
      name: req.body.name,
      description: req.body.description,
      muscleGroup : req.body.muscleGroup,
    });

    //save the workout to the master workout collection
    newExercise.save((err, newWorkout) =>{
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'Workout unsuccessfully added' });
      }
      else {
        return res.status(200).send({"message" : "Workout added successfully"})
      }
    });
  });
}

//Log a user's workout into the DB
let newLog = function newLog(req, res) {
  
  let db = connectToDb();
  db.once('open', () => {
    let exercises = [];    
    //Construct the JSON exercise objects and push them to exercises
    req.body.exercises.forEach(exercise => {
      let newExercise = {
        name: exercise.name,
        reps: exercise.reps,
        weight: exercise.weight,
        isWarmup: exercise.isWarmup
      };
      exercises.push(newExercise);
    });

    //Construct the workout JSON object
    let newWorkout = {
      name: req.body.name,
      date: req.body.date,
      exercises: exercises,
    };

    //Push the newWorkout log to the user profile
    schemaCtrl.Profile.updateOne(
      { uid: req.body.uid }, 
      { $push: { logs : newWorkout } },
      {},
      (err, raw) => {
        if (err) {
          res.status(300).send({"message" : "Error"});
        } else{
          res.status(200).send({"message" : newWorkout});
        }
      }
    );

  });    
}

//Get a user's logs from the database
let logs = function logs(req, res) {
  
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.Profile.findOne({ "uid" : req.body.uid}, (err, user) => {
      if (err) return handleError(err);
      if (!user){
        res.status(404).send({ "message": "User not found"}) 
      } else {
        res.status(200).send({ "logs" :user.logs});
      }
    });
  });    
}

//Get a user's workouts from DB, queries using req body UID of the caller
let workouts = function getUserWorkouts(req, res) {
  let db = connectToDb();
  db.once('open', () => {
    //query profile collection
    schemaCtrl.Profile
    .findOne({uid : req.body.uid}, (err, workouts) => {
      if(err){
        res.status(500).send({message: "Error getting workouts"});
      }
      else{
        res.send(workouts);
      }
    })
    .populate('workouts')
    .exec((err, workouts) =>{
      if(err){
        res.status(500).send({message: "Error getting workouts"});
      }
      else{
        res.send(workouts);
      }
    });
  });
}



//Get a user's exercises from DB, queries using req body UID of the caller
let exercises = function exercises(req, res) {
  let db = connectToDb();
  db.once('open', () => {

    schemaCtrl.Exercise.find({}, (err, exercises) => {
      if (err) {
        handleError(err);
        res.status(500).send({ "message": "Error"});
      } else {
        res.status(200).send({ "exercises" : exercises});
      }
    });    

    //query profile collection
    /*schemaCtrl.Profile
    .findOne({uid : req.body.uid}, (err, exercises)=>{
      if(err){
        res.status(500).send({message: "Error getting exercises"});
      }
      else{
        res.send(exercises);
      }
    })
    .populate('exercises')
    .exec((err, exercises)=>{
      if(err){
        res.status(500).send({message: "Error getting exercises"});
      }
      else{
        res.send(exercises);
      }
    });*/
  });
}

let uExercises = function uExercises(req, res) {
  let db = connectToDb();
  db.once('open', () => {
  });
}

let apiCtrl = {
  login: login,
  register: register,
  
  workouts: workouts,
  newWorkout: newWorkout,
  
  exercises: exercises,
  uExercises: uExercises,
  newExercise: newExercise,
  
  logs: logs,
  newLog: newLog,

  devExercise: devExercise

}

module.exports = apiCtrl;
