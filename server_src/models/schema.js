const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema for a user's profile, represents everything associated with a user
let Profile = new Schema({
    name: { type: String, required: true },                             //Full Name
    pseudonym: { type: String, required: true },                        //Nickname
    email : { type: String, required: true },                           //User email
    avatar: { type: String, required: true },                           //User profile picture
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout"}],         //Workout plans the user has submitted to the master list
    logs : [{                                                           //Array of JSON objects which contain arrays of exercises
                name: String,
                reps: Array,
                isWarmup: Boolean, 
           }],                           
    uid: { type: String, required: true },                              //Google unique user id
    token : { type: String, required: true },
});

//Schema for creating a new exercise
let Exercise = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    muscleGroup : [{ type: String , required: true}],
});

//Schema for creating a new workout
let Workout = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [{           
                    name: String,
                    reps: Array,
                    isWarmup: Boolean, 
                }],
    ownerUID : { type: String, required: true },
    likes : { type : Number }
});

//map the schemas to mongo collections
let schemaCtrl = {
    Profile: mongoose.model("Profile", Profile),
    Exercise: mongoose.model("Exercise", Exercise),
    Workout: mongoose.model("Workout", Workout),
}

module.exports = schemaCtrl;
