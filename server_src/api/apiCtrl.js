const mongoose = require('mongoose');
const schemaCtrl = require('../models/schema');
const url = "mongodb://admin:team5307@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/test?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";
const passport = require('../config/passport');


function connectToDb(res) {
  mongoose.connect(url, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', () => {
    res.status(500).send({ "message" : "Database is down"});
    db.removeAllListeners();
    return console.error.bind(console, 'connection error');
  });
  return db;
}

//Log a user in
let login = function login(req, res) {
  let db = connectToDb();
  db.once('open', () => {
  });
}

//Register a user
let register = function(req,res) {
  passport.authenticate('googleToken', {session: false}, (err, user, info) => {
    if(err){
      res.status(500).send({"message" : "User creation unsuccessful"});
      return;
    } else{
      res.status(200).send({"token" : user.token});
    }
  })(req,res);
}

/*--------Functions for posting user information--------*/

//Create a new workout for the master workout library
let newWorkout = function newWorkout(req, res) {
  let db = connectToDb(res);
  db.once('open', () => {
    schemaCtrl.Profile.findOne({ _id : req.params.id }, (err, user) => {

      if (!user){
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
        ownerUID : req.body.id,
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
            { _id : req.params.id }, 
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

//Log a user's workout into the DB
let newLog = function newLog(req, res) {
  
  let db = connectToDb(res);
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
      { _id : req.params.id }, 
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

let newExercise = function newExercise(req, res) {
  let db = connectToDb(res);
  db.once('open', () => {
    
    //Push the newWorkout log to the user profile
    schemaCtrl.Profile.updateOne(
      { _id : req.params.id }, 
      { $push: { exercises : req.body.exercises } },
      {},
      (err, raw) => {
        if (err) {
          res.status(500).send({"message" : "Error"});
        } else{
          res.status(200).send({"message" : "Success"});
        }
      }
    );
  });
}

//Post an exercise to the standard library
let devExercise = function devExercise(req, res) {
  let db = connectToDb(res);
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

/*--------Functions for returning user information--------*/

//Get a user's logs from the database
let logs = function logs(req, res) {

  let db = connectToDb(res);
  db.once('open', () => {
    schemaCtrl.Profile.findOne({ _id : req.params.id}, (err, user) => {
      if (err){
        handleError(err);
        res.status(500).send();
      } else if (!user){
        res.status(404).send({ "message": "User not found"}) 
      } else {
        res.status(200).send({ "logs" : user.logs});
      }
    });
  });    
}


//Return a users workouts
let workouts = function workouts(req, res) {
  let db = connectToDb(res);
  db.once('open', () => {
    //query profile collection
    schemaCtrl.Profile
    .findOne({ _id : req.params.id}, (err, workouts) => {
      if(err){
        res.status(500).send({message: "Error getting workouts"});
        return;
      }
    })
    .populate('workouts')
    .exec((err, workouts) => {
      if(err){
        res.status(500).send({message: "Error getting workouts"});
      } else{
        res.send(workouts);
      }
    });
  });
}

//Return a users custom exercises
let uExercises = function uExercises(req, res) {
  let db = connectToDb(res);
  db.once('open', () => {
    schemaCtrl.Profile.findOne({ _id : req.params.id }, (err, user) => {
      if (err) {
        handleError(err);
        res.status(500).send();
      } else if (!user){
        res.status(404).send({ "message": "User not found"}) 
      } else {
        res.status(200).send({ "logs" : user.exercises});
      }
    });
  });
}

//Return all standard exercises
let exercises = function exercises(req, res) {
  let db = connectToDb(res);
  db.once('open', () => {
    schemaCtrl.Exercise.find({}, (err, exercises) => {
      if (err) {
        handleError(err);
        res.status(500).send({ "message": "Error"});
      } else {
        res.status(200).send({ "exercises" : exercises});
      }
    });    

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
