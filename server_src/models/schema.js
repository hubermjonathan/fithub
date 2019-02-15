const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schemas
// SCHEMAS HERE

let ProfileSchema = new Schema({
    name: { type: String, required: true },
    pseudonym: { type: String, required: true },
    avatar: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseSchema"}],
    log: { type: Schema.Types.ObjectId, ref: "LogSchema"},
    workouts: [{ type: Schema.Types.ObjectId, ref: "WorkoutSchema"}],
    //For authentication
    uid: { type: String, required: true },
    token : { type: String, required: true},
    email : { type: String, required: true}
});

let LogSchema = new Schema({
    days: [{ type: Schema.Types.ObjectId, ref: "LogDaySchema"}],
});

let LogDaySchema = new Schema({
    exercises: [{ type: Schema.Types.ObjectId, ref: "LogExerciseSchema"}],
    owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
});

let LogExerciseSchema = new Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    sets: { type: Number, required: true },
    weight: { type: Number, required: true },
    isWarmup: { type: Boolean, required: true },
    date: { type: Date, required: true },
});

let ExerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
});

let WorkoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseSchema"}],
    owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
});

let schemaCtrl = {
    ProfileSchema: mongoose.model("ProfileSchema", ProfileSchema),
    LogSchema: mongoose.model("LogSchema", LogSchema),
    LogExerciseSchema: mongoose.model("LogExerciseSchema", LogExerciseSchema),
    LogWorkoutSchema: mongoose.model("LogWorkoutSchema", LogWorkoutSchema),
    ExerciseSchema: mongoose.model("ExerciseSchema", ExerciseSchema),
    WorkoutSchema: mongoose.model("WorkoutSchema", WorkoutSchema),
}

module.exports = schemaCtrl;
