const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schemas
// SCHEMAS HERE

let ProfileSchema = new Schema({
    name: { type: String, required: true },
    uid: { type: Number, required: true },
    pseudonym: { type: String, required: true },
    avatar: { type: String, required: true },
    logs: [{ type: Schema.Types.ObjectId, ref: "LogSchema"}]
});

let LogSchema = new Schema({
    exercise: { type: String, required: true },
    data: [{sets: Number, reps: Number, weight: Number, warmup: Number}],
    dates: { type: Date, required: true },
});

let ExerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    id: { type: Number, required: true },
});

let WorkoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    id: { type: Number, required: true },
});

let CustomExerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    id: { type: String, required: true },
});

let CustomWorkoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    id: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "CustomExerciseSchema"}],
    owner: { type: Schema.Types.ObjectId, ref: "ProfileSchema" }
});

let schemaCtrl = {
    ProfileSchema: mongoose.model("ProfileSchema", ProfileSchema),
    LogSchema: mongoose.model("LogSchema", LogSchema),
    ExerciseSchema: mongoose.model("ExerciseSchema", ExerciseSchema),
    WorkoutSchema: mongoose.model("WorkoutSchema", WorkoutSchema),
    CustomExerciseSchema: mongoose.model("CustomExerciseSchema", CustomExerciseSchema),
    CustomWorkoutSchema: mongoose.model("CustomWorkoutSchema", CustomWorkoutSchema)
}

module.exports = schemaCtrl;