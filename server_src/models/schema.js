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
    log: { type: Schema.Types.ObjectId, ref: "LogSchema" },
    //For authentication
    uid: { type: String, required: true },
    token : { type: String, required: true },
    email : { type: String, required: true }
});

//Sub-schema of ProfileSchema for a user's log information, contains an array of days
let LogSchema = new Schema({
    days: [{ type: Schema.Types.ObjectId, ref: "LogDaySchema"}],
    //owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
    ownerUID : { type: String, required: true }
});

//Sub-schema of LogSchema representing data for exercises performed on a specific day
let LogWorkoutSchema = new Schema({
    exercises: [{ type: Schema.Types.ObjectId, ref: "LogExerciseSchema"}],
    date: { type: Date, required: true },
    ownerUID : { type: String, required: true }
});

//Sub-schema of LogSchema representing data 
let LogExerciseSchema = new Schema({
    name: { type: String, required: true },             //Name for the exercise
    sets: { type: Number, required: true },             //Number for the amount of sets done
    reps: { type: Array, required: true },              //Array for the reps done for each set
    weight: { type: Array, required: true },            //Weight lifted for each set
    isWarmup: { type: Boolean, required: true },        //Boolean for each warmup
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
