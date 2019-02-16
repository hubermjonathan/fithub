const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema for a user's profile, represents everything associated with a user
let ProfileSchema = new Schema({
    name: { type: String, required: true },
    //pseudonym will be the user name
    pseudonym: { type: String, required: true },
    //url tag to be concatenated with database storing pictures link
    avatar: { type: String, required: true },
    //exercises that the user created
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseSchema"}],
    //workouts that the user created
    workouts: [{ type: Schema.Types.ObjectId, ref: "WorkoutSchema"}],
    //logging data for the user
    log : { type : Array , "default" : [] }
    //For authentication
    uid: { type: String, required: true },
    token : { type: String, required: true },
    email : { type: String, required: true }
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
    LogSchema: mongoose.model("LogSchema", LogSchema),
    LogExerciseSchema: mongoose.model("LogExerciseSchema", LogExerciseSchema),
    LogWorkoutSchema: mongoose.model("LogWorkoutSchema", LogWorkoutSchema),
    ExerciseSchema: mongoose.model("ExerciseSchema", ExerciseSchema),
    WorkoutSchema: mongoose.model("WorkoutSchema", WorkoutSchema),
}

module.exports = schemaCtrl;
