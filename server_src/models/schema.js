const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema for a user's profile, represents everything associated with a user
let Profile = new Schema({
    name: { type: String, required: true },                             //Full Name
    pseudonym: { type: String, required: true },                        //Nickname
    email : { type: String, required: true },                           //User email
    avatar: { type: String, required: true },                           //User profile picture
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise"}],       //Exercises the user has submitted to the master list
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout"}],         //Workout plans the user has submitted to the master list
    logs : { type : Array , "default" : [] },                           //Array of JSON objects which contain arrays of exercises
    uid: { type: String, required: true },                              //Google unique user id
    token : { type: String, required: true },
});

//Schema for creating a new exercise
let Exercise = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    ownerUID : { type: String, required: true }
});

//Schema for creating a new workout
let Workout = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise"}],
    ownerUID : { type: String, required: true }
});

//map the schemas to mongo collections
let schemaCtrl = {
    Profile: mongoose.model("Profile", Profile),
    Exercise: mongoose.model("Exercise", Exercise),
    Workout: mongoose.model("Workout", Workout),
}

module.exports = schemaCtrl;
