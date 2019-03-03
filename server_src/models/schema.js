const mongoose = require('mongoose');
let Schema = mongoose.Schema;

function muslceGroupVal(muscle_groups) {
  if(Array.isArray(muscle_groups)){
    muscle_groups.forEach(muscle => {
        if(muscle<0 || muscle > 18){
            return false;
        }
    });
    return true;
  } else {
    return false;
  }
}

let muscleGroup = [muslceGroupVal, 'Not all rep info logged'];

//Schema for a user's profile, represents everything associated with a user
let Profile = new Schema({
  name: { type: String, required: true },                             //Full Name
  pseudonym: { type: String, required: true },                        //Nickname
  email : { type: String, required: true },                           //User email
  avatar: { type: String, required: true },                           //User profile picture
  uid: { type: String, required: true },                              //Google unique user id
  token : { type: String, required: true },
  workouts: [{ type: Schema.Types.ObjectId, ref: "WorkoutPlan"}],         //Workout plans the user has submitted to the master list
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise"}],         //Private exercises
  logs: [{ type: Schema.Types.ObjectId, ref: "WorkoutData"}],         //Workout data
});

//Schema for creating a new workout plan
let WorkoutPlan = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise", required: true}],
  ownerUID : { type: String, required: true },
  gains : { type : Number, default: 0, required: true },
  public : { type : Boolean, default: true, required: true}
});

//Schema for creating a new exercise (private)
let Exercise = new Schema({
  name: {type: String, required: true},
  muscle_groups: {type: [Number], validate: muscleGroup, required: true},
  equipment_type: {type: String, required: true},
  sets: [{ type: Schema.Types.ObjectId, ref: "SetData", required: true}]
});

let Set = new Schema({
  weight: {type: Number, required: true},
  reps: {type: Number, required: true},
  isWarmup: {type: Boolean, required: true} 
});

//instantiated for each user
let WorkoutData = new Schema({
  name: {type: String, required: true},
  date : {type : Date, /*default: Date.now,*/ required: true},
  exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseData", required: true}]
});

let ExerciseData = new Schema({
  name: {type: String, required: true},
  muscle_groups: {type: [Number], validate: muscleGroup, required: true},
  sets: [{ type: Schema.Types.ObjectId, ref: "SetData", required: true}]
});

let SetData = new Schema({
  weight: {type: Number, required: true},
  reps: {type: Number, required: true},
});

//map the schemas to mongo collections
let schemaCtrl = {
    Profile: mongoose.model("Profile", Profile),
    WorkoutPlan: mongoose.model("WorkoutPlan", WorkoutPlan),
    Exercise: mongoose.model("Exercise", Exercise),
    Set: mongoose.model("Set", Set),
    WorkoutData: mongoose.model("WorkoutData", WorkoutData),
    ExerciseData: mongoose.model("ExerciseData", ExerciseData),
    SetData: mongoose.model("SetData", SetData),
}

module.exports = schemaCtrl;
