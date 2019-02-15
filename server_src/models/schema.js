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
    log: { type: Schema.Types.ObjectId, ref: "LogSchema"},
    //For authentication
    uid: { type: String, required: true },
    token : { type: String, required: true},
    email : { type: String, required: true}
});

//Sub-schema of ProfileSchema for a user's log information, contains an array of days
let LogSchema = new Schema({
    days: [{ type: Schema.Types.ObjectId, ref: "LogDaySchema"}],
});

//Sub-schema of LogSchema representing data for exercises performed on a specific day
let LogDaySchema = new Schema({
    exercises: [{ type: Schema.Types.ObjectId, ref: "LogExerciseSchema"}],
    date: { type: Date, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
});

//Sub-schema of LogSchema representing data 
let LogExerciseSchema = new Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    isWarmup: { type: Boolean, required: true },
});

//Schema for creating a new exercise
let ExerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
});

//Schema for creating a new workout
let WorkoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseSchema"}],
    owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
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
