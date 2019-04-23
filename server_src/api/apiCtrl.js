const mongoose = require('mongoose');
const schemaCtrl = require('../models/schema');
const url = "mongodb://admin:team5307@fithub-database-shard-00-00-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-01-3xylr.gcp.mongodb.net:27017,fithub-database-shard-00-02-3xylr.gcp.mongodb.net:27017/prod?ssl=true&replicaSet=fithub-database-shard-0&authSource=admin&retryWrites=true";
const passport = require('../config/passport');
const moment = require('moment');
moment().format();

mongoose.connect(url, {
  useNewUrlParser: true
});

async function recalc(req, res) {
  if (!isConnected(req, res)) { return console.log("DB is offline"); }
  let user = await schemaCtrl.Profile.findById(req.params.id, 'logs').populate
    ({
      path: "logs",
      populate: {
        path: "exercises",
        select: "-__v",
        populate:
        {
          path: "sets",
          model: "SetData",
          select: "-__v"
        }
      }
    }
    ).sort({ "logs.date": -1 }).catch(err => { console.log("invalid id"); });
  user.maxes = {};
  user.dates = {};
  user.volumes = {};

  user.logs.forEach(log => {
    let day = log.date.getDate();
    let month = log.date.getMonth() + 1;
    let year = log.date.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let gitLog = `${year}-${month}-${day}`

    if (gitLog in user.dates) {
      user.dates[gitLog]++;
    } else {
      user.dates[gitLog] = 1;
    }
    log.exercises.forEach(exercise => {
      let vol = 0;
      exercise.sets.forEach(set => {
        vol += set.reps * set.weight;
        if (exercise.name in user.maxes) {
          if (user.maxes[exercise.name] < set.weight) {
            user.maxes[exercise.name] = set.weight;
          }
        } else {
          user.maxes[exercise.name] = set.weight;
        }
      });
      if (exercise.name in user.volumes) {
        if (user.volumes[exercise.name] < vol) {
          user.volumes[exercise.name] = vol;
        }
      } else {
        user.volumes[exercise.name] = vol;
      }
    });
  });
  user.updateOne({ $set: { maxes: user.maxes, dates: user.dates, volumes: user.volumes } }, {}, (err, raw) => { });
  res.send({ dates: user.dates, maxes: user.maxes, volumes: user.volumes });
  //end populate
}

let db = mongoose.connection;
db.once('open', () => {
});

let muscleEnums = {
  "NECK": 1,
  "SHOULDERS": 2,
  "DELTOID": 3,
  "TRICEPS": 4,
  "BICEPS": 5,
  "FOREARMS": 6,
  "BACK": 7,
  "LATS": 8,
  "TRAPS": 9,
  "CHEST": 10,
  "WAIST": 11,
  "OBLIQUES": 12,
  "HIPS": 13,
  "GLUTES": 14,
  "THIGHS": 15,
  "QUADS": 16,
  "HAMSTRINGS": 17,
  "CALVES": 18
}

function isConnected(req, res) {
  if (db.readystate == 0) {
    res.status(500).send({ error: "Error: Database connection is down" });
    return false;
  }
  else {
    return true;
  }
}

function isValidated(req, res, user) {
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return false;
  }
  else if (user.uid != req.body.uid || user.token != req.body.token) {
    res.status(401).send({ message: "Unauthorized" });
    return false;
  }
  else {
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

//Create a new workout plan under a user
let newWorkout = async function newWorkout(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }
  let muscles = [];
  let all_exercises = [];
  let exercise_retrieval_promises = [];

  //create each exercise
  for (let i = 0; i < req.body.exercises.length; i++) {
    let exercise = req.body.exercises[i];
    if (exercise.exists) { //exercise exists
      let retrieve_exercise = schemaCtrl.Exercise.findById(exercise.id, (err, exercise) => {
        //exercise confirmed to exist, push _id
        all_exercises.push(exercise);
      }).catch(err => { return res.status(404).send({ message: "newWorkout: Exercise claimed to exist not found" }) });
      exercise_retrieval_promises.push(retrieve_exercise);
    }
    else { //exercise does not exist, create a new one
      //create each set for each exercise
      //validate input before creating
      let new_sets = []; //holds all the new sets we created for this exercise
      let validate_promises = []; //holds all promises we fire off for validating set input
      let save_promises = []; //holds all promises we fire off for saving set objects
      exercise.sets.forEach(set => {
        let new_set = new schemaCtrl.Set(set);
        let promise = new_set.validate().catch(err => { res.status(500).send({ "message": "newWorkout: validation error creating sets" }); return console.log(err) });;
        validate_promises.push(promise);
        new_sets.push(new_set);
      });//end for each set
      let ensure_validated = await Promise.all(validate_promises);

      //save the sets
      new_sets.forEach(set => {
        let promise = set.save().catch(err => { res.status(500).send({ "message": "newWorkout: error attempting to save sets" }); return console.log(err); });
        save_promises.push(promise);
      });
      let ensure_sets_saved = await Promise.all(save_promises);

      //all sets have beens saved at this line

      //create the exercise
      let new_exercise = await schemaCtrl.Exercise.create
        ({
          name: exercise.name, //string
          muscle_groups: exercise.muscle_groups, //array of strings
          equipment_type: exercise.equipment_type, //string
          sets: new_sets
        })
        .catch(err => { res.status(500).send({ "message": "newWorkout: error creating exercise object" }); return console.log(err); });

      //exercise has been created at this point

      //push to user profile
      let wait_for_update = await user.updateOne({ $push: { exercises: new_exercise._id } })
        .catch(err => { res.status(500).send({ "message": "newWorkout: error pushing id to profile" }); return console.log(err); });

      all_exercises.push(new_exercise);
    }

    //build workout muscle list
    exercise.muscle_groups.forEach(muscle => {
      if (muscles.find(all => all == muscle) == undefined) {
        muscles.push(muscle);
      }
    });

  }; //end for each exercise
  let ensure_existing_exercises_retrieved = await Promise.all(exercise_retrieval_promises);
  //all exercises and been created and/or retrieved at this point

  let new_workout = await schemaCtrl.WorkoutPlan.create
    ({
      name: req.body.name,
      description: req.body.description,
      muscle_groups: muscles,
      date: req.body.date,
      exercises: all_exercises,
      ownerUID: req.body.id,
      gains: 0,
      public: req.body.public
    })
    .catch(err => { res.status(500).send({ "message": "newWorkout: error creating workout object" }); return console.log(err); });

  let wait_for_update = await user.updateOne({ $push: { workouts: new_workout._id } })
    .catch(err => { res.status(500).send({ "message": "newWorkout: error pushing id to profile" }); return console.log(err); });

  res.status(200).send({ "message": "newWorkout: Success!" });
  console.log(new_workout);
} //end newWorkout

//Log a user's workout into the DB
let newLog = async function newLog(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }

  //no clue wtf any of this is dont blame me if it breaks
  let gitLog;
  if (req.body.date instanceof Date) {
    const day = req.body.date.getDate();
    const month = req.body.date.getMonth() + 1;
    const year = req.body.date.getFullYear();
    gitLog = `${year}-${month}-${day}`;
  }
  else {
    gitLog = req.body.date;
  }

  let newActivity = `${user.name} worked out on ${req.body.date}!`
  if (gitLog in user.dates) {
    user.dates[gitLog]++;
  }
  else {
    user.dates[gitLog] = 1;
  }

  //

  //create each exercise
  let all_exercises = []; //all the new exercise data that will be necessary for creating the log
  let exercise_validate_promises = []; //all the promises that will be used to validate each exercise
  let exercise_save_promises = []; //all the promises that will be used to save each exercise

  let all_sets = []; //global tracker for all sets
  let set_save_promises = []; //global tracker for all promises during saving of all sets

  //validation for sets are done inside the exercise loop because we need to validate them locally before attempting to create an exercise and validate an exercise object

  for (let i = 0; i < req.body.exercises.length; i++) { //for each exercise
    let exercise = req.body.exercises[i];

    let set_validate_promises = []; //promises used to validate the local sets
    let local_sets = []; //sets pertaining to the current exercise

    exercise.sets.forEach(set => { //create the set and push to validation array
      //keep track of maxes
      if (exercise.name in user.maxes) {
        if (user.maxes[exercise.name] < set.weight) {
          newActivity = `${user.name} has achieved a new max of ${set.weight} on ${exercise.name}`;
          user.maxes[exercise.name] = set.weight;
        }
      }
      else {
        user.maxes[exercise.name] = set.weight;
        newActivity = `${user.name} has done ${exercise.name} for the first time!`;
      }
      //end

      let new_set = new schemaCtrl.SetData(set);
      let promise = new_set.validate().catch(err => { res.status(500).send({ "message": "newLog: validation error creating sets" }); return console.log(err) });
      set_validate_promises.push(promise);
      all_sets.push(new_set); //push to global sets for saving later
      local_sets.push(new_set); //keep track of local sets to construct current exercise
    });
    let ensure_sets_validated = await Promise.all(set_validate_promises); //ensure all local sets have been validated

    let new_exercise = new schemaCtrl.ExerciseData //create new exercise object with validated sets
      ({
        name: exercise.name,
        muscle_groups: exercise.muscle_groups,
        sets: local_sets
      });

    //fire off validation for the exercise and save to the exercise list
    let promise = new_exercise.validate().catch(err => { res.status(500).send({ "message": "newLog: validation error creating exercises" }); return console.log(err) });
    exercise_validate_promises.push(promise);
    all_exercises.push(new_exercise);
  }
  let ensure_exercises_validated = await Promise.all(exercise_validate_promises);

  //create new log and fire off validate promise
  let new_log = new schemaCtrl.WorkoutData
    ({
      name: req.body.name,
      date: req.body.date,
      exercises: all_exercises,
    })
  let log_validate = await new_log.validate().catch(err => { res.status(500).send({ "message": "newLog: error creating log object" }); return console.log(err); });

  //everything has been created and validated, start saving and hope nothing goes wrong after this line

  all_sets.forEach(set => { //save all sets
    let promise = set.save().catch(err => { res.status(500).send({ "message": "newLog: error saving sets" }); return console.log(err) });
    set_save_promises.push(promise);
  });

  all_exercises.forEach(exercise => { //save all exercises
    let promise = exercise.save().catch(err => { res.status(500).send({ "message": "newLog: error saving exercises" }); return console.log(err) });
    exercise_save_promises.push(promise);
  });

  let ensure_sets_saved = await Promise.all(set_save_promises);
  let ensure_exercises_saved = await Promise.all(exercise_save_promises);
  let ensure_log_saved = await new_log.save().catch(err => { res.status(500).send({ "message": "newLog: error saving log object" }); return console.log(err); });

  //user activity and max
  await user.updateOne({ $set: { maxes: user.maxes, dates: user.dates } })
    .catch(err => { res.status(500).send({ "message": "newLog: error updating user max" }); return console.log(err); });
  await user.updateOne({ $push: { logs: new_log._id, activity: newActivity } })
    .catch(err => { res.status(500).send({ "message": "newLog: pushing id and error updating user activity" }); return console.log(err); });

  res.status(200).send({ "message": "newLog: Success!" });
  //console.log(new_log);
} //end newLog

let newExercise = async function newExercise(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  //Find the user
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };

  let new_sets = [];
  let validate_promises = [];
  let save_promises = [];

  for (let i = 0; i < req.body.sets.length; i++) {
    let set = new schemaCtrl.Set(req.body.sets[i]);
    let promise = set.validate().catch(err => { res.status(500).send({ "message": "newExercise: validation error creating sets" }); return console.log(err) });;
    validate_promises.push(promise);
    new_sets.push(set);
  }

  let ensure_valid = await Promise.all(validate_promises);

  for (let i = 0; i < new_sets.length; i++) {
    let set = new_sets[i];
    let promise = set.save().catch(err => { res.status(500).send({ "message": "newExercise: error attempting to save sets" }); return console.log(err); });
    save_promises.push(promise);
  }

  let ensure_saved = await Promise.all(save_promises);

  let new_exercise = await schemaCtrl.Exercise.create
    ({
      name: req.body.name, //string
      muscle_groups: req.body.muscle_groups, //array of strings
      equipment_type: req.body.equipment_type, //string
      sets: new_sets
    })
    .catch(err => { res.status(500).send({ "message": "newExercise: error creating exercise object" }); return console.log(err); });

  //push to user profile
  user.updateOne({ $push: { exercises: new_exercise._id } })
    .catch(err => { res.status(500).send({ "message": "newExercise: error pushing id to profile" }); return console.log(err); });
  res.status(200).send({ "message": "newExercise: Success!" });
} //end new exercise


/*--------Functions for deleting information--------*/
//delete exercise
//TODO: look into deleting residual parent workouts
let delExercise = async function delExercise(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("delExercise: invalid id"); });
  if (!isValidated(req, res, user)) { return console.log("delExercise: Unauthorized request"); };

  let exercises = req.body.exercises;
  let exerciseIds = [];
  let setIds = [];
  let user_exercises = await schemaCtrl.Profile.findById(req.body.id).populate({
    path: "exercises",
    model: "Exercise",
    populate: {
      path: "sets",
      model: "Set"
    },
  })
    .select("_id")
    .exec()
    .catch(err => { console.log("delExercise: error querying profile"); });

  for (let i = 0; i < user_exercises.exercises.length; i++) {
    let exercise = user_exercises.exercises[i];
    if (exercises.includes(exercise._id) || exercises.includes("drop_all")) {
      exerciseIds.push(exercise._id); //push into deletion bin
      exercise.sets.forEach(set => {
        setIds.push(set._id); //push into deletion bin
      }); //end forEach set in exercise
      //remove from profile
      user.exercises.remove(exercise._id);
    }
  }; //end forEach exercise
  user.save().catch(err => { console.log("delExercise: error saving profile edits"); });

  //begin deleting garbage
  if (exerciseIds.length == 0) {
    return res.status(404).send({ "message": "Database Error: Exercise not found" });
  }
  else {
    exerciseIds.forEach(id => {
      //console.log("exercise: " + id);
      schemaCtrl.Exercise.deleteOne({ _id: id }).catch(err => { return console.log("delExercise: error deleting exercise: " + id); });
    });
    setIds.forEach(id => {
      //console.log("set: " + id);
      schemaCtrl.Set.deleteOne({ _id: id }).catch(err => { return console.log("delExercise: error deleting set: " + id); });
    });
    return res.status(200).send({ "message": "Successfully deleted exercises: " + exerciseIds });
  }
}

let delWorkout = async function delWorkout(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { return console.log("delWorkouts: invalid id"); });
  if (!isValidated(req, res, user)) { return console.log("delWorkouts: Unauthorized request"); };

  let workouts = req.body.workouts;
  let workoutIds = [];
  let exerciseIds = [];
  let setIds = [];
  let user_workouts = await schemaCtrl.Profile.findById(req.body.id).populate({
    path: "workouts",
    model: "WorkoutPlan",
    populate: {
      path: "exercises",
      model: "Exercise",
      populate: {
        path: "sets",
        model: "Set"
      }
    },
  })
    .select("_id")
    .exec()
    .catch(err => { return console.log("delWorkouts: error querying initial profile"); });

  for (let i = 0; i < user_workouts.workouts.length; i++) {
    let workout = user_workouts.workouts[i];
    if (workouts.includes(workout._id) || workouts.includes("drop_all")) {
      workoutIds.push(workout._id); //push workout into deletion bin
      workout.exercises.forEach(exercise => {
        exerciseIds.push(exercise._id); //push into exercise deletion bin
        exercise.sets.forEach(set => {
          setIds.push(set._id); //push set into deletion bin
        }); //forEach set in exercise
        user.exercises.remove(exercise._id);
      }); //forEach exercise in workout

      //remove from profile
      user.workouts.remove(workout._id);
    }
  }; //forEach workout
  user.save().catch(err => { console.log("delWorkouts: error saving exits to profile"); });

  //begin deleting garbage
  if (workoutIds.length == 0) {
    return res.status(404).send({ "message": "Database Error: Workout not found" });
  }
  else {
    workoutIds.forEach(id => {
      //console.log("workout: " + id);
      schemaCtrl.WorkoutPlan.deleteOne({ _id: id }).catch(err => { console.log("delWorkouts: error deleting workout: " + id); });
    });
    exerciseIds.forEach(id => {
      //console.log("exercise: " + id);
      schemaCtrl.Exercise.deleteOne({ _id: id }).catch(err => { console.log("delWorkouts: error deleting exercise: " + id); });
    });
    setIds.forEach(id => {
      //console.log("set: " + id);
      schemaCtrl.Set.deleteOne({ _id: id }).catch(err => { console.log("delWorkouts: error deleting set: " + id); });
    });
    return res.status(200).send({ "message": "Successfully deleted workouts: " + workoutIds });
  }
}

let editWorkoutPublic = async function editWorkoutPublic(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };

  user = await schemaCtrl.Profile.findById(req.body.id).populate({
    path: "workouts",
    model: "WorkoutPlan",
  })
    .exec()
    .catch(err => { return console.log("editWorkoutPublic: error querying initial profile workouts"); });
  console.log(user);

  let workoutId = req.body.workout;
  let flag;

  if (req.body.isPublic) {
    flag = true;
  }
  else {
    flag = false;
  }

  if (user.workouts.length == 0) {
    return res.status(500).send({ "message": "You have no workouts!" });
  }

  for (let i = 0; i < user.workouts.length; i++) {
    let workout = user.workouts[i];
    if (workout._id == workoutId) {
      workout.set("public", flag);
      workout.save();
    }
  }

  let isPublic;
  if (flag) {
    isPublic = "public";
  }
  else {
    isPublic = "private";
  }
  return res.status(200).send({ "message": "Successfully set workout " + workoutId + " to " + isPublic });
}

let logWeight = async function logWeight(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  //Find the user
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };
  if (!req.body.weight || !req.body.date) {
    res.status(500).send({ "message": "logWeight: missing fields" });
  }
  req.body.date = req.body.date.substring(0, 10);
  //if(req.body.date instanceof Date){
  let new_weight = {
    date: req.body.date,
    weight: req.body.weight
  }
  /*
  for(let i = 0; i < user.weight.length; i++){
    let pair = user.weight[i];
    if(pair.date == req.body.date){
      user.weight[i] = new_weight;
      console.log(user.weight[i]);
      await user.save()
      .catch(err => {res.status(500).send({ "message": "Error saving new weight"}); console.log(err)});
      console.log(user);
      return res.status(200).send({"message": "logWeight: Failure!"});
    }
  }
  */

  for (let i = 0; i < user.weight.length; i++) {
    let pair = user.weight[i];
    if (pair.date == req.body.date) {
      user.weight.pop();
    }
  }

  user.weight.push(new_weight);
  await user.save()
    .catch(err => { res.status(500).send({ "message": "Error saving new weight" }); console.log(err) });
  res.status(200).send({ "message": "logWeight: Success!" });
  //}
  //res.status(500).send({"message": "logWeight: Incorrect input"});
}

let logCalories = async function logWeight(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  //Find the user
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };

  if (!req.body.calories || !req.body.date) {
    res.status(500).send({ "message": "logWeight: missing fields" });
  }
  req.body.date = req.body.date.substring(0, 10);
  //if(req.body.date instanceof Date){
  let new_calories = {
    date: req.body.date,
    calories: req.body.calories
  }
  /*
  for(let i = 0; i < user.calories.length; i++){
    let pair = user.calories[i];
    if(pair.date == req.body.date){
      user.calories[i] = new_calories;
      console.log(user.calories[i]);
      await user.save()
      .catch(err => {res.status(500).send({ "message": "Error saving new calories"}); console.log(err)});
      console.log(user);
      return res.status(200).send({"message": "logWeight: Failure!"});
    }
  }
  */

  for (let i = 0; i < user.calories.length; i++) {
    let pair = user.calories[i];
    if (pair.date == req.body.date) {
      user.calories.pop();
    }
  }

  user.calories.push(new_calories);
  await user.save()
    .catch(err => { res.status(500).send({ "message": "Error saving new calories" }); console.log(err) });
  res.status(200).send({ "message": "logCalories: Success!" });
  //}
  //res.status(500).send({"message": "logWeight: Incorrect input"});
}

let addComment = async function addComment(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  //Find the user
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };

  if (!req.body.workoutId || !req.body.comment) {
    return res.status(500).send({ "message": "addComment: Missing workout or comment text" });
  }
  let workoutPlan = await schemaCtrl.WorkoutPlan.findById(req.body.workoutId);
  let comment = {
    user: user._id,
    username: user.name,
    text: req.body.comment
  }
  workoutPlan.comments.push(comment);
  workoutPlan.save().catch(err => { res.status(500).send({ "message": "addComment: Failed to save workout plan" }) });
  return res.status(200).send({ "message": "Successfully added comment" });
}

/*--------Functions for editing user information--------*/
let editUsername = async function editUsername(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  //Find the user
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };
  let new_name = req.body.name;
  if (new_name.length > 32 || !(new_name.match(/^[a-z0-9 ]+$/i))) {
    return res.status(500).send({ "message": "Invalid name: name must be 32 alphanumeric characters or less" });
  }
  else {
    user.set('name', req.body.name);
    user.save().catch(err => { console.log(err); });
    return res.status(200).send({ "message": "Successfully changed name to " + new_name });
  }
}

let editExercise = async function editExercise(req, res) { //deletes old exercise data and replaces it with new exercise data passed in
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };

  user = await schemaCtrl.Profile.findById(req.body.id).populate({
    path: "exercises",
    model: "Exercise",
    populate: {
      path: "sets",
      model: "Set"
    }
  })
    .exec()
    .catch(err => { return console.log("editExercise: error querying initial profile"); });

  let updated_set_ids = [];
  for (let i = 0; i < req.body.sets.length; i++) {
    let set = req.body.sets[i];
    updated_set = await schemaCtrl.Set.create(set).catch(err => { res.status(500).send({ message: "Input error: validation failed for json set input" }); return console.log("validation error in creating sets"); })
    updated_set.save();
    updated_set_ids.push(mongoose.Types.ObjectId(updated_set._id)); //push saved set to array
  }

  //parse user exercises
  for (let i = 0; i < user.exercises.length; i++) {
    let curr_exercise = user.exercises[i];
    if (curr_exercise._id == req.body.old_exercise_id) {
      //purge old sets
      for (let j = 0; j < curr_exercise.sets.length; j++) {
        let curr_set = curr_exercise.sets[j];
        await schemaCtrl.Set.deleteOne({ _id: curr_set.id }).catch(err => { res.status(500).send({ "message": "editExercise: error deleting set: " + curr_set._id }); return console.log("editExercise: error deleting set: " + curr_set._id); });
      }
      //update fields of the exercise
      curr_exercise.set('name', req.body.name);
      curr_exercise.set('muscle_groups', req.body.muscle_groups);
      curr_exercise.set('equipment_type', req.body.equipment_type);
      curr_exercise.set('sets', updated_set_ids);
      curr_exercise.save().catch(err => { res.status(500).send({ "message": "editExercise: Failed to update exercise" }); return console.log(err); });
      return res.status(200).send({ "message": "Successfully updated exercise " + req.body.old_exercise_id });
    }
  }
}

let editWorkout = async function editWorkout(req, res) { //deletes old exercise data and replaces it with new exercise data passed in
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };

  user = await schemaCtrl.Profile.findById(req.body.id).populate({
    path: "workouts",
    model: "WorkoutPlan",
    populate: {
      path: "exercises",
      model: "Exercise",
      populate: {
        path: "sets",
        model: "Set"
      }
    }
  })
    .exec()
    .catch(err => { return console.log("editWorkout: error querying initial profile"); });

  let profile_workouts = user.workouts;
  let old_workout_id = req.body.old_workout_id;
  let muscles = [];
  let exercise_ids = [];

  //delete the old workout
  for (let i = 0; i < profile_workouts.length; i++) {
    let workout = profile_workouts[i];
    if (workout._id == old_workout_id) {
      schemaCtrl.WorkoutPlan.deleteOne({ _id: old_workout_id }).catch(err => { return console.log("editWorkouts: error deleting workout: " + id); });
    }
  }

  //build the new workout
  for (let i = 0; i < req.body.exercises.length; i++) {
    let exercise = req.body.exercises[i];
    exercise.muscle_groups.forEach(muscle => {
      if (muscles.find(all => all == muscle) == undefined) {
        muscles.push(muscle);
      }
    });
    if (exercise.exists) { //exercise exists
      try {
        let findExercise = await schemaCtrl.Exercise.findById(exercise.id, (err, exercise) => {
          //exercise confirmed to exist, push _id
          exercise_ids.push(mongoose.Types.ObjectId(exercise._id));
        });
      } catch (err) {
        return res.status(404).send({ message: "Database Error: Exercise claimed to exist not found" });
      }
    }
    else { //create exercise on the fly
      //creating set data for the exercise
      let set_ids = [];
      for (let j = 0; j < exercise.sets.length; j++) {
        let set = exercise.sets[j];
        let new_set;
        try {
          new_set = await schemaCtrl.Set.create(set);
        } catch (validation_err) {
          console.log("Input Error: invalid json input at Set");
          return res.status(500).send({ "message": "Input Error: Validation error while constructing set" })
        };
        new_set.save(function (err, ret) {
          if (err) { return res.status(500).send({ message: "Database error: unable to save set data" }); }
        });
        set_ids.push(mongoose.Types.ObjectId(new_set._id)); //push saved set to array
      }; //end forEach exercise.set

      let newExercise;
      try {
        newExercise = await schemaCtrl.Exercise.create({ //create new exercise
          name: exercise.name,
          muscle_groups: exercise.muscle_groups,
          equipment_type: exercise.equipment_type,
          sets: set_ids,
        });
      } catch (validation_err) {
        console.log("Input Error: invalid json input at exercise");
        return res.status(500).send({ "message": "Input Error: Validation error while constructing exercise" })
      };

      newExercise.save((err, newExercise) => { //save new exercise
        if (err) {
          console.log("error saving exercise");
          res.status(500).send({ "message": "Database error: Error saving exercise to database" });
          return false;
        }
        else {
          user.updateOne({ $push: { exercises: newExercise._id } }, {}, (err, raw) => {
            if (err) {
              console.log(err);
              res.status(500).send({ "message": "Database Error: Error while pushing exercise to user profile" });
              return true;
            }
          }); //end updateOne
        }
      }); //end save
      exercise_ids.push(mongoose.Types.ObjectId(newExercise._id));
    }
  }; //end foreach exercise


  //Construct the workout JSON object
  let newWorkout;
  try {
    newWorkout = await schemaCtrl.WorkoutPlan.create({
      _id: old_workout_id,
      name: req.body.name,
      description: req.body.description,
      muscle_groups: muscles,
      date: req.body.date,
      exercises: exercise_ids,
      ownerUID: req.body.id,
      gains: 0,
      public: req.body.public
    });
  } catch (validation_err) {
    console.log("Input Error: invalid json input at workout"); return res.status(500).send({ "message": "Input Error: Validation error while constructing workout" })
  };

  //save the workout to the master workout collection
  newWorkout.save((err, newWorkout) => {
    if (err) {
      console.log("error saving workout");
      res.status(500).send({ "message": "Database Error: Error while saving new workout plan" });
      return;
    }
    else {
      res.status(200).send({ "message": "Workout edited successfully" });
    }
  }); //end save
}

let editLog = async function editLog(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }

  user = await schemaCtrl.Profile.findById(req.body.id).populate({
    path: "logs",
    model: "WorkoutData",
    populate: {
      path: "exercises",
      model: "ExerciseData",
      populate: {
        path: "sets",
        model: "SetData"
      }
    }
  })
    .exec()
    .catch(err => { return console.log("editLog: error querying initial profile"); });

  //delete old log
  let profile_logs = user.logs;
  let old_log_id = req.body.old_log_id;

  //delete the old log
  for (let i = 0; i < profile_logs.length; i++) { //for each log
    let log = profile_logs[i];
    if (log._id == old_log_id) {
      for (let j = 0; j < log.exercises.length; j++) { //for each exercise in the log
        let exercise = log.exercises[j];
        for (let z = 0; z < exercise.sets.length; z++) { //for each exercise in the log
          let set = exercise.sets[z];
          schemaCtrl.SetData.deleteOne({ _id: set._id }).catch(err => { return console.log("editLog: error deleting set: " + set._id); });
        }
        schemaCtrl.ExerciseData.deleteOne({ _id: exercise._id }).catch(err => { return console.log("editLog: error deleting exercise: " + exercise._id); });
      }
      schemaCtrl.WorkoutData.deleteOne({ _id: log._id }).catch(err => { return console.log("editLog: error deleting log: " + log._id); });
    }
  }


  //validate setData json input

  let exerciseData_ids = [];
  let newActivity = `${user.name} worked out on ${req.body.date}!`
  if (req.body.date in user.dates) {
    user.dates[req.body.date]++;
  } else {
    user.dates[req.body.date] = 1;
  }
  //Construct the exerciseData objects
  for (let i = 0; i < req.body.exercises.length; i++) {
    let exercise = req.body.exercises[i];

    exercise.sets.forEach(set => {
      //For keeping track of user maxes
      if (exercise.name in user.maxes) {
        if (user.maxes[exercise.name] < set.weight) {
          newActivity = `${user.name} has achieved a new max of ${set.weight} on ${exercise.name}`;
          user.maxes[exercise.name] = set.weight;
        }
      } else {
        user.maxes[exercise.name] = set.weight;
        newActivity = `${user.name} has done ${exercise.name} for the first time!`;
      }
    });

    //build setData objects for the current exercise
    let setData_ids = [];
    for (let j = 0; j < exercise.sets.length; j++) {
      let set = exercise.sets[j];

      let newSetData;
      try {
        newSetData = await schemaCtrl.SetData.create(set);
      } catch (validation_err) { console.log("Input Error: invalid json input at SetData"); return res.status(500).send({ "message": "Input Error: Validation error while constructing setData" }) };

      newSetData.save((err, newSetData) => {
        if (err) {
          console.log(err); return res.status(500).send({ "message": "Database Error: Error while saving exercise set log" });
        }
      }); //end save
      setData_ids.push(mongoose.Types.ObjectId(newSetData._id));
    }; //end forEach set

    //build exerciseData objects for the workoutData
    let newExerciseData;
    try {
      newExerciseData = await schemaCtrl.ExerciseData.create({
        name: exercise.name,
        muscle_groups: exercise.muscle_groups,
        sets: setData_ids
      });
    } catch (validation_err) { console.log("Input Error: validation error creating ExerciseData"); return res.status(500).send({ "message": "Input Error: Validation error while constructing exerciseData" }) };

    //save the exerciseData
    newExerciseData.save((err, newExerciseData) => {
      if (err) {
        console.log(err); return res.status(500).send({ "message": "Database Error: Error while saving exercise log" });
      }
    }); //end save
    exerciseData_ids.push(mongoose.Types.ObjectId(newExerciseData._id));
  }; //end forEach exercise, all exerciseData documents have been built and saved

  //Construct the workoutData object, catch validation error
  let newWorkoutData;
  try {
    newWorkoutData = await schemaCtrl.WorkoutData.create({
      _id: old_log_id,
      name: req.body.name,
      date: req.body.date,
      exercises: exerciseData_ids
    });
  } catch (validation_err) { console.log("Input Error: validation failed creating WorkoutData"); return res.status(500).send({ "message": "Input Error: Validation error while constructing workoutData" }) };
  newWorkoutData.save().catch(err => { return res.status(500).send({ "message": "editLog: Error saving log" }) });
  user.updateOne({ $set: { maxes: user.maxes, dates: user.dates } }, {}, (err, raw) => { });
  return res.status(200).send({ "message": "Successfully edited workout: " + old_log_id });
} //end newLog

let gain = async function gain(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }
  let workout = await schemaCtrl.WorkoutPlan.findById(req.body.workout).catch(err => { console.log("error querying post"); });
  if (!workout.public) {
    return res.status(500).send({ "message": "This is a private workout" });
  }
  /*
  if(workout.ownerUID == user._id){
    return res.status(500).send({ "message": "You cannot gain your own post!" });
  }
  */
  for (let i = 0; i < workout.liked_users.length; i++) {
    let curr_usr = workout.liked_users[i]._id;
    if (curr_usr == req.body.id) {
      //return res.status(500).send({ "message": "You have already gained workout!" });
      workout.gains--;
      workout.liked_users.splice(workout.liked_users.indexOf(user._id), 1);
      workout.save();
      return res.status(200).send({ "message": "Successfully ungained!" });
    }
  }
  workout.gains++;
  workout.liked_users.push(user._id);
  workout.save();
  return res.status(200).send({ "message": "Successfully gained!" });
}

let editStats = async function editStats(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }
  user.selected_stat1 = req.body.stat1;
  user.selected_stat2 = req.body.stat2;
  user.save().catch(err => { console.log("editStats: error saving profile"); });
  return res.status(200).send({ "message": "Successfully edited selected stats" });
}


/*--------Functions for returning user information--------*/

//Get a user's logs from the database
let logs = async function logs(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  let logs = await schemaCtrl.Profile.findById(req.params.id, 'logs').populate
    ({
      path: "logs",
      populate: {
        path: "exercises",
        select: "-__v",
        populate:
        {
          path: "sets",
          model: "SetData",
          select: "-__v"
        }
      }
    }
    ).sort({ "logs.date": -1 }).catch(err => {
      return console.log("logs: invalid id");
    });
  if (!logs) {
    res.status(404).send({ "message": "Database Error: User not found" });
    return
  } else {
    res.status(200).send(logs);
  }
  //end populate
}

//Return a users workouts
let workouts = async function workouts(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  let workouts = await schemaCtrl.Profile.findById(req.params.id, 'workouts').populate
    ({
      path: "workouts",
      model: "WorkoutPlan",
      select: "-__v",
      populate:
      {
        path: "exercises",
        model: "Exercise",
        select: "-__v",
        populate:
        {
          path: "sets",
          model: "Set",
          select: "-__v"
        }
      }
    }
    ).catch(err => {
      return console.log("workouts: invalid id");
    });
  if (!workouts) {
    res.status(404).send({ "message": "Database Error: User not found" });
    return
  } else {
    res.status(200).send(workouts);
  }
  //end populate
}

//Return a users custom private exercises
let uExercises = function uExercises(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  let data = schemaCtrl.Profile.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).send({ "message": "Database Error: error querying profile" });
      return
    }
    else if (!user) {
      res.status(500).send({ "message": "Database Error: User not found" });
      return
    }
  }) //end findById
    .select("-email -logs -workouts -avatar -__v -token")
    .populate
    ({
      path: "exercises",
      select: "-__v",
      populate:
      {
        path: "sets",
        model: "Set",
        select: "-__v",
      }
    }) //end populate
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ "message": "Database Error: Populate query failed" });
        return;
      }
      else {
        res.status(200).send(data);
      }
    });
}

//Return a users general profile information
let profile = function profile(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  let data = schemaCtrl.Profile.findById(req.params.id, (err, user) => {
    /*
    if(!isValidated(req, res, err, user)){
      return;
    }
    */
    if (err) {
      res.status(404).send({ "message": "Database Error: error querying profile" });
      return
    }
    else if (!user) {
      res.status(500).send({ "message": "Database Error: user not found" });
      return
    }
  }) //end findById
    .select("-__v -token -uid -_id -workouts -exercises -logs")
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ "message": "Database Error: profile query failed" });
        return;
      }
      else {
        res.status(200).send(data);
      }
    });
}

//Get a user's logs from the database
let weights = async function weights(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  let bodyWeight = await schemaCtrl.Profile.findById(req.params.id, 'logs').populate
    ({
      path: "bodyWeight",
      select: "-__v",
      model: "WeightLog"
    }).sort({ "bodyWeight.date": -1 }).catch(err => {
      return console.log("Weight: invalid id");
    });
  if (!bodyWeight) {
    res.status(404).send({ "message": "Database Error: User not found" });
    return
  } else {
    res.status(200).send(bodyWeight);
  }
  //end populate
}

//Get a user's logs from the database
let calories = async function calories(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  let calories = await schemaCtrl.Profile.findById(req.params.id, 'calories').populate
    ({
      path: "calories",
      select: "-__v",
      model: "CaloricLog"
    }).sort({ "calories.date": -1 }).catch(err => {
      return console.log("logs: invalid id");
    });
  if (!calories) {
    res.status(404).send({ "message": "Database Error: User not found" });
    return
  } else {
    res.status(200).send(calories);
  }
  //end populate
}

let selected_stats = function selected_stats(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }

  let data = schemaCtrl.Profile.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).send({ "message": "Database Error: error querying profile" });
      return
    }
    else if (!user) {
      res.status(500).send({ "message": "Database Error: user not found" });
      return
    }
  }) //end findById
    .select("selected_stat1 selected_stat2")
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ "message": "Database Error: profile query failed" });
        return;
      }
      else {
        res.status(200).send(data);
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

let users = function users(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }
  let query = schemaCtrl.Profile.find({}).select('pseudonym _id');
  query.exec((err, users) => {
    res.status(200).send(users);
  });
}

let publicWorkouts = function publicWorkouts(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }
  let query = schemaCtrl.WorkoutPlan.find({ public: true }).select('-__v').populate({
    path: "exercises",
    select: "-__v",
    populate:
    {
      path: "sets",
      model: "Set",
      select: "-__v",
    }
  }).sort({ "date": -1 });
  let suggestions = [];
  query.exec((err, plans) => {
    if (req.body.muscles == undefined || req.body.muscles.length === 0) {
      res.status(200).send(plans);
      return;
    }
    plans.forEach(plan => {
      let add = true;
      req.body.muscles.forEach(muscle => {
        if (plan.muscle_groups.find(wktMuscles => wktMuscles == muscle) == undefined) {
          add = false;
          return;
        }
      });
      if (add) {
        suggestions.push(plan);
      }
    });
    res.status(200).send(suggestions);
  });
}

let activity = function activity(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }
  let query = schemaCtrl.Profile.findById(req.params.id).select("activity");
  let promise = query.exec();
  promise.then(data => {
    if (!data) {
      res.status(500).send({ "message": "Database Error: user not found" });
      return
    }
    res.status(200).send(data);
  });
}

let social = function social(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }
  let query = schemaCtrl.WorkoutPlan.findById(req.params.id);
  let promise = query.exec();
  promise.then(data => {
    if (!data) {
      res.status(500).send({ "message": "Database Error: workout not found" });
      return
    }
    if (!data.public) {
      res.status(500).send({ "message": "Error: This workout is private" });
      return
    }
    res.status(200).send({ gains: data.gains });
  });
}

let dates = function dates(req, res) {
  if (db.readyState == 0) {
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }
  let query = schemaCtrl.Profile.findById(req.params.id).select("dates")
  let promise = query.exec();
  promise.then(data => {
    if (!data) {
      res.status(500).send({ "message": "Database Error: user not found" });
      return
    }
    res.status(200).send(data);
  });
}

let follow = async function follow(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  console.log(req.body);
  let error = false;
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => {
    res.status(400).send({ message: "Invalid user id" });
    error = true;
    return;
  });
  if (error) return;
  if (user == null) {
    res.status(404).send({ message: "Original user not found" });
    return;
  }
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }
  let ufollow = await schemaCtrl.Profile.findById(req.body.followid).catch(err => {
    res.status(400).send({ message: "Invalid user id" });
    error = true;
    return;
  });
  if (error) return;
  if (ufollow == null) {
    res.status(404).send({ message: "User to follow not found" });
    return;
  }
  let index = user.following.find(function (element) {
    return element == req.body.followid
  });
  if (index != undefined) {
    res.status(200).send({ message: "Already following this user" });
    return;
  }
  await user.updateOne({ $push: { following: ufollow.id } });
  res.status(200).send({ message: "Success" });
}

let unfollow = async function unfollow(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => {
    console.log("invalid id");
    return;
  });
  if (user == null) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }
  let index = user.following.find(function (element) {
    return element == req.body.followid
  });
  if (index !== undefined) {
    user.following.splice(index, 1);
    await user.updateOne({ following: user.following });
    res.status(200).send({ message: "Success" });
  } else {
    res.status(400).send({ message: "Not following specified user" });
  }
}

let followingWorkouts = async function followingWorkouts(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => {
    console.log("invalid id");
    return
  });
  if (user == null) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }
  let workouts = await schemaCtrl.WorkoutPlan.find({ ownerUID: { $in: user.following } }).select('-__v').populate({
    path: "exercises",
    select: "-__v",
    populate:
    {
      path: "sets",
      model: "Set",
      select: "-__v",
    }
  }).sort({ "date": -1 });
  res.status(200).send(workouts);
}

let stats = function stats(req, res) {
  recalc(req, res);
  /*if(db.readyState==0){
    res.status(500).send({
      error: "Database connection is down."
    });
    return;
  }

  let query = schemaCtrl.Profile.findById(req.params.id).select("maxes")
  let promise = query.exec();
  promise.then(data => {
    if(!data){
      res.status(500).send({ "message": "Database Error: user not found" });
      return
    }
    res.status(200).send(data);
  });
  */
}

let getCalories = async function getCalories(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.params.id).catch(err => { console.log("invalid id"); });
  if (!user) {
    res.status(404).send({ message: "user not found" });
  }
  res.status(200).send(user.calories);
}

let getWeight = async function getWeight(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.params.id).catch(err => { console.log("invalid id"); });
  if (!user) {
    res.status(404).send({ message: "user not found" });
  }
  res.status(200).send(user.weight);
}

let calorieChart = async function calorieChart(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { return console.log("Unauthorized request"); }
  let rangeA;
  let rangeB;
  let dateA;
  let dateB;
  if (req.body.from) {
    rangeA = req.body.from.split("-");
    dateA = new Date(rangeA[0], rangeA[1] - 1, rangeA[2]);
  }
  if (req.body.to) {
    rangeB = req.body.to.split("-");
    dateB = new Date(rangeB[0], rangeB[1] - 1, rangeB[2]);
  }

  let calories = user.calories;

  let data = [];

  if (req.body.from && req.body.to) {
    calories.forEach(c => {
      let range = c.date.split("-");
      let date = new Date(range[0], range[1] - 1, range[2]);
      //console.log("CurrDate: " + date.toString());
      if (date >= dateA && date <= dateB) {
        /*
        console.log("A: " + dateA.toString());
        console.log("B: " + dateB.toString());
        console.log("CurrDate: " + date.toString());
        */
        data.push(c);
      }
    });
  }
  else if (req.body.from && !req.body.to) {
    calories.forEach(c => {
      let range = c.date.split("-");
      let date = new Date(range[0], range[1] - 1, range[2]);
      //console.log("CurrDate: " + date.toString());
      if (date >= dateA) {
        data.push(c);
        /*
        console.log("A: " + dateA.toString());
        console.log("CurrDate: " + date.toString());
        */
      }
    });
  }
  else {
    data = user.calories;
  }

  let dates = [];
  let calorie = [];

  data.forEach(d => {
    dates.push(d.date);
    calorie.push(+d.calories);
  })

  let avgCalories;
  let minCalories;
  let maxCalories;
  let sum = 0;
  if (calorie.length != 0) {
    minCalories = calorie[0];
    maxCalories = calorie[0];
    calorie.forEach(c => {
      sum += +c;
      if (c < minCalories) {
        minCalories = c;
      }
      if (c > maxCalories) {
        maxCalories = c;
      }
    });
    avgCalories = (sum / calorie.length);
  }

  let chart = {
    dates: dates,
    calories: calorie,
    min: minCalories,
    max: maxCalories,
    avg: avgCalories
  }

  if (calorie.length == 0) {
    chart = {
      message: "There are no calorie statistics to display",
      dates: dates,
      calories: calorie,
      min: minCalories,
      max: maxCalories,
      avg: avgCalories
    }
  }
  res.status(200).send(chart);
}

let usersFollowing = async function usersFollowing(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.params.id).catch(err => { console.log("invalid id"); });
  res.status(200).send(user.following);
}

let weightChart = async function weightChart(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { return console.log("Unauthorized request"); }

  let rangeA;
  let rangeB;
  let dateA;
  let dateB;
  if (req.body.from) {
    rangeA = req.body.from.split("-");
    dateA = new Date(rangeA[0], rangeA[1] - 1, rangeA[2]);
  }
  if (req.body.to) {
    rangeB = req.body.to.split("-");
    dateB = new Date(rangeB[0], rangeB[1] - 1, rangeB[2]);
  }

  let weight = user.weight;

  let data = [];

  if (req.body.from && req.body.to) {
    weight.forEach(c => {
      let range = c.date.split("-");
      let date = new Date(range[0], range[1] - 1, range[2]);
      if (date >= dateA && date <= dateB) {
        data.push(c);
      }
    });
  }
  else if (req.body.from && !req.body.to) {
    weight.forEach(c => {
      let range = c.date.split("-");
      let date = new Date(range[0], range[1] - 1, range[2]);
      //console.log("CurrDate: " + date.toString());
      if (date >= dateA) {
        data.push(c);
        /*
        console.log("A: " + dateA.toString());
        console.log("CurrDate: " + date.toString());
        */
      }
    });
  }
  else {
    data = user.weight;
  }

  let dates = [];
  let volume = [];

  //console.log(data);

  data.forEach(d => {
    dates.push(d.date);
    volume.push(+d.weight);
  })

  let avgVolume;
  let minVolume;
  let maxVolume;
  let sum = 0;
  if (volume.length != 0) {
    minVolume = volume[0];
    maxVolume = volume[0];
    volume.forEach(c => {
      sum += +c;
      if (c < minVolume) {
        minVolume = c;
      }
      if (c > maxVolume) {
        maxVolume = c;
      }
    });
    avgVolume = (sum / volume.length);
  }

  let chart = {
    dates: dates,
    volume: volume,
    min: minVolume,
    max: maxVolume,
    avg: avgVolume
  }

  if (volume.length == 0) {
    chart = {
      message: "There are no weight statistics to display",
      dates: dates,
      volume: volume,
      min: minVolume,
      max: maxVolume,
      avg: avgVolume
    }
  }
  res.status(200).send(chart);
}

let volumeChart = async function volumeChart(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).populate
    ({
      path: "logs",
      populate: {
        path: "exercises",
        select: "-__v",
        populate:
        {
          path: "sets",
          model: "SetData",
          select: "-__v"
        }
      }
    }
    ).sort({ "logs.date": 1 }).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; }

  volumes = [];
  dates = [];

  user.logs.forEach(log => {

    let day = log.date.getDate();
    let month = log.date.getMonth() + 1;
    let year = log.date.getFullYear();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    if (req.body.from != undefined && !moment(`${year}-${month}-${day}`).isBetween(req.body.from, req.body.to)) {
      return;
    }

    let date = `${year}-${month}-${day}`

    let volume = 0;
    log.exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        volume += set.reps * set.weight;
      });
    });
    let pos = dates.find(elm => elm === date);
    if (pos == undefined) {
      dates.push(date);
      volumes.push(volume);
    } else {
      volumes[pos] += volume;
    }
  });
  let min = 100000;
  let max = 0;
  let avg = 0;
  volumes.forEach(vol => {
    if (vol < min) {
      min = vol;
    }
    if (vol > max) {
      max = vol;
    }
    avg += vol;
  });
  avg = avg / volumes.length - 1;

  if(min==100000){
    res.status(200).send({message: "No logs", dates : [], volumes : [], min: 0, max: 0, avg:0});
    return;
  }

  res.status(200).send({dates : dates, volumes : volumes, min: min, max: max, avg:avg});
   //end populate
}

let getWorkoutComments = async function getWorkoutComments(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let workout = await schemaCtrl.WorkoutPlan.findById(req.params.id).catch(err => { console.log("invalid id"); });
  if (!workout) {
    res.status(500).send({ message: "getWorkoutComments: workout does not exist" });
  }
  res.status(200).send(workout.comments);
}

let delComment = async function delComment(req, res) {
  if (db.readyState == 0) { res.status(500).send({ error: "Database connection is down." }); return; }
  let user = await schemaCtrl.Profile.findById(req.body.id).catch(err => { console.log("invalid id"); });
  if (!isValidated(req, res, user)) { console.log("Unauthorized request"); return; };
  let index = req.body.comment_index;

  let workout = await schemaCtrl.WorkoutPlan.findById(req.body.workoutId).catch(err => { console.log("invalid id"); });
  if (!workout) {
    return res.status(500).send({ message: "getWorkoutComments: workout does not exist" });
  }
  if (workout.comments.length == 0) {
    return res.status(500).send({ message: "getWorkoutComments: workout has no comments to delete" });
  }
  let comments = workout.comments;
  if (index < 0 || index > comments.length) {
    return res.status(500).send({ message: "getWorkoutComments: invalid index" });
  }
  if (comments[index].user._id == req.body.id) {
    comments.splice(index, 1);
  }
  else {
    return res.status(401).send({ message: "getWorkoutComments: unauthorized deletion" });
  }
  workout.save();
  return res.status(200).send({ message: "getWorkoutComments: Success!" });
}




let apiCtrl = {
  login: login,
  editUsername: editUsername,

  delComment: delComment,

  workouts: workouts,
  newWorkout: newWorkout,
  editWorkoutPublic: editWorkoutPublic,
  editWorkout: editWorkout,
  social: social,
  gain: gain,
  selected_stats: selected_stats,
  editStats: editStats,
  follow: follow,
  unfollow: unfollow,
  followingWorkouts: followingWorkouts,
  addComment: addComment,
  getWorkoutComments: getWorkoutComments,

  delExercise: delExercise,
  delWorkout: delWorkout,

  exercises: exercises,
  editExercise: editExercise,
  uExercises: uExercises,
  profile: profile,
  newExercise: newExercise,

  logs: logs,
  editLog: editLog,
  newLog: newLog,
  logWeight: logWeight,
  logCalories: logCalories,
  getCalories: getCalories,
  getWeight: getWeight,
  calorieChart: calorieChart,
  weightChart: weightChart,
  volumeChart: volumeChart,

  users: users,                     //Returns all users
  publicWorkouts: publicWorkouts,   //Returns all public workouts and filters
  usersFollowing: usersFollowing,

  activity: activity,
  dates: dates,                     //Returns all the dates a user has worked out
  stats: stats                      //Returns the max weights lifted by a user

};

module.exports = apiCtrl;
