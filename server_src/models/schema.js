const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema for a user's profile, represents everything associated with a user
let ProfileSchema = new Schema({
    name: { type: String, required: true },                                     //Full Name
    pseudonym: { type: String, required: true },                                //Nickname
    email : { type: String, required: true },                                   //User email
    avatar: { type: String, required: true },                                   //User profile picture
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseSchema"}],         //Exercises the user has submitted to the master list
    workouts: [{ type: Schema.Types.ObjectId, ref: "WorkoutSchema"}],           //Workout plans the user has submitted to the master list
    logs : { type : Array , "default" : [] },                                    //Array of JSON objects which contain arrays of exercises
    uid: { type: String, required: true },                                      //Google unique user id
    token : { type: String, required: true },
});

//Schema for creating a new exercise
let ExerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    ownerUID : { type: String, required: true }
});

//Schema for creating a new workout
let WorkoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseSchema"}],
    ownerUID : { type: String, required: true }
});

//map the schemas to mongo collections
let schemaCtrl = {
    ProfileSchema: mongoose.model("ProfileSchema", ProfileSchema),
    ExerciseSchema: mongoose.model("ExerciseSchema", ExerciseSchema),
    WorkoutSchema: mongoose.model("WorkoutSchema", WorkoutSchema),
}

module.exports = schemaCtrl;
