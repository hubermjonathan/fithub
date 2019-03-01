const mongoose = require('mongoose');
const schemaCtrl = require('../models/schema');
const url = "mongodb://admin:team5307@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/test?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";
const passport = require('../config/passport');

mongoose.connect(url, {
  useNewUrlParser: true
});
let db = mongoose.connection;
db.once('open', () => {
});

function isConnected() {
  if (db.readystate == 0) {
    res.status(500).send({ error: "Error: Database connection is down"});
    return false;
  }
  else{
    return true;
  }
}

function isValidated(err, user) {
  if (!user) 
  {
    res.status(404).send({ message: "User not found" });
    return false;
  }
  else if (user.uid != req.body.uid || user.token != req.body.token) 
  {
    res.status(401).send({ message: "Unauthorized" });
    return false;
  }
  else{
    return true;
  }
}

//Register a user
let login = function login(req, res) {
  passport.authenticate('googleToken', {
    session: false
  }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        "message": "Error"
      });
      return;
    } else {
      res.status(200).send({
        "id": user._id,
        "uid": user.uid,
        "token": user.token
      });
    }
  })(req, res);
}

/*--------Functions for posting user information--------*/

//Create a new workout for the master workout library
let newWorkout = function newWorkout(req, res) {
  if(!isConnected())
  {
    console.log("DB Offline");
    return;
  }
  schemaCtrl.Profile.findById(req.body.id, (err, user) => 
  {
    if(!isValidated){
      return;
    }
    //Construct the exercise documents and keep track of their IDs
    let exercise_ids = [];
    req.body.exercises.forEach(exercise => 
    {
      if(exercise.exists) //exercise exists
      {
        schemaCtrl.Exercise.findById(exercise.id, (err, exercise) => 
        {
          if(!exercise) //couldn't find exercise?
          {
            res.status(404).send({ message: "Database Error: Exercise claimed to exist not found" });
            return;
          }
          else //exercise confirmed to exist, push _id
          {
            exercise_ids.push(mongoose.Types.ObjectId(exercise._id));
          }
        });
      }
      else //create exercise on the fly
      {
        //creating set data for the exercise
        let set_ids = [];
        exercise.set_data.forEach(set =>
        {
          let new_set = new schemaCtrl.SetData(set);
          new_set.save(function (err, ret) 
          {
            if(err)
            {
              res.status(500).send({ message: "Database error: unable to save set_data" });
              return;
            }
          });
          set_ids.push(mongoose.Types.ObjectId(new_set._id)); //push saved set to array
        }); //end forEach exercise.set
        newExercise = new schemaCtrl.Exercise( //create new exercise
        {
          name: exercise.name,
          muscle_groups: exercise.muscle_groups,
          equipment_type: exercise.equipment_type,
          sets: set_ids,
        });
        newExercise.save((err, newExercise) =>  //save new exercise
        {
          if (err) 
          {
            res.status(500).send({ "message": "Database error: Error saving exercise to database" });
            return;
          }
          else
          {
            user.updateOne({$push: { exercises: newExercise._id }}, {}, (err, raw) => 
            {
              if (err) 
              {
                console.log(err);
                res.status(500).send({ "message": "Database Error: Error while pushing exercise to user profile" });
                return;
              }
            }); //end updateOne
          }
        }); //end save
        exercise_ids.push(mongoose.Types.ObjectId(newExercise._id));
      }
    }); //end foreach exercise

    //Construct the workout JSON object
    let newWorkout = new schemaCtrl.WorkoutPlan({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      exercises: exercise_ids,
      ownerUID: req.body.id,
    });

    //save the workout to the master workout collection
    newWorkout.save((err, newWorkout) => 
    {
      if (err) 
      {
        console.log(err);
        res.status(500).send({ "message": "Database Error: Error while saving new workout plan" });
        return;
      } 
      else 
      {
        user.updateOne({$push: { workouts: newWorkout._id }}, {}, (err, raw) => 
        {
          if (err) 
          {
            console.log(err);
            res.status(500).send({ "message": "Database Error: Error while pushing workout plan to user profile" });
            return;
          }
          else 
          {
            res.status(200).send({ "message": "Workout added successfully" });
            return;
          }
        }); //end updateOne
      }
    }); //end save
  }); //end findbyId
} //end newWorkout

//Log a user's workout into the DB
let newLog = function newLog(req, res) {

  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }

  schemaCtrl.Profile.findById(req.body.id, (err, user) => {
    if (!user) {
      res.status(404).send({
        message: "User not found"
      });
      return;
    }
    if (user.uid != req.body.uid || user.token != req.body.token) {
      res.status(401).send({
        message: "Unauthorized"
      });
      return;
    }

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
      exercises: req.body.exercises,
    };

    //Push the newWorkout log to the user profile
    user.updateOne({
        $push: {
          logs: newWorkout
        }
      }, {},
      (err, raw) => {
        if (err) {
          res.status(500).send({
            "message": " Error: Log addition unsuccessful"
          });
        } else {
          res.status(200).send({
            "message": " Log added successfully "
          });
        }
      }
    );
  });
}

let newExercise = function newExercise(req, res) {
  if(!isConnected()){
    console.log("DB is offline");
    return;
  }
  //Find the user
  schemaCtrl.Profile.findById(req.body.id, (err, user) => 
  {
    if (!user) 
    {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (user.uid != req.body.uid || user.token != req.body.token) 
    {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    //parse set_data array of JSON to build exercise object
    let set_ids= [];
    req.body.set_data.forEach(set =>
    {
      let new_set = new schemaCtrl.SetData(set);
      new_set.save(function (err, ret) 
      {
        if(err)
        {
          res.status(500).send({ message: "Database error: unable to save set_data" });
          return;
        }
      });
      set_ids.push(mongoose.Types.ObjectId(new_set._id)); //push saved set to array
    });
    //construct exercise
    let new_exercise = new schemaCtrl.Exercise
    ({
      name: req.body.name, //string
      muscle_groups: req.body.muscle_groups, //array of strings
      equipment_type: req.body.equipment_type, //string
      sets: set_ids
    });
    new_exercise.save(function (err, ret) 
    {
      if(err)
      {
        res.status(500).send({ message: "Database error: unable to save data" });
        return;
      }
    });
    //push to user profile
    user.updateOne({$push: { exercises: new_exercise._id }}, {},(err, raw) => 
    {
      if (err) 
      {
        res.status(500).send({ "message": " Error: Exercise addition unsuccessful" });
      }
      else 
      {
        res.status(200).send({ "message": " Exercise added successfully " });
      }
    }); //end updateOne
  }); //end findbyId
} //end new exercise

//Post an exercise to the standard library
let devExercise = function devExercise(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }

  if(req.body.authenticate!="e498a0841ce3c3ed948e48e9b788dcf620742070304ea327b3bdb0a83d26f37065dac9e611ce0e2d51478655c4007cef"){
    res.status(401).send({message:"Unauthorized"});
    return;
  }

  //Construct the exercise from the schema
  let newExercise = new schemaCtrl.Exercise({
    name: req.body.name,
    description: req.body.description,
    muscleGroups: req.body.muscleGroups,
  });

  //save the workout to the master workout collection
  newExercise.save((err, newWorkout) => {
    if (err) {
      console.log(err);
      if(err.name=='ValidationError'){
        res.status(400).send({message: "Bad request"});
        return;
      }
      res.status(500).send({
        message: 'Workout unsuccessfully added'
      });
      return;
    } else {
      return res.status(200).send({
        "message": "Workout added successfully"
      })
    }
  });

}

/*--------Functions for returning user information--------*/

//Get a user's logs from the database
let logs = function logs(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }

  let errorNum = 0;
  schemaCtrl.Profile.findById(req.params.id, (err, user) => {
    if (err) {
      errorNum = 1;
    } else if (!user) {
      errorNum = 2;
    } else {
      errorNum = 3;
    }

    if(errorNum == 1){
      console.log(err);
      res.status(500).send({
        message: "Error"
      });
    }
    else if(errorNum == 2){
      console.log(err);
      res.status(404).send({
        message: "User not found"
      })
    }
    else if(errorNum == 3){
      console.log(err);
      res.status(200).send({
        "logs": user.logs
      });
    }
  });
}

//Return a users workouts
let workouts = function workouts(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }

  //query profile collection
  let error = false;
  schemaCtrl.Profile
    .findOne({
      _id: req.params.id
    }, (err, workouts) => {
      if (err) {
        error = true;
      }
    })
    .populate('workouts')
    .exec((err, workouts) => {
      if (err && err == false) {
        console.log(err);
        res.status(500).send({
          "message": "Error querying profile collection in exec"
        });
      } 
      else if (!err && error == true){
        console.log(err);
        res.status(500).send({
          "message": "Error querying profile collection in findOne"
        });
      }
      else {
        res.send(workouts);
      }
    });
}

//Return a users custom exercises
let uExercises = function uExercises(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }

  schemaCtrl.Profile.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        "message": "Error"
      });
    } else if (!user) {
      res.status(404).send({
        "message": "User not found"
      })
    } else {
      res.status(200).send({
        "exercises": user.exercises
      });
    }
  });

}

//Return all standard exercises
let exercises = function exercises(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }
  schemaCtrl.Exercise.find({}, (err, exercises) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        "message": "Error"
      });
    } else {
      res.status(200).send({
        "exercises": exercises
      });
    }
  });

}

let apiCtrl = {
  login: login,

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
