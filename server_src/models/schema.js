const mongoose = require('mongoose');
let Schema = mongoose.Schema;

function validator(exercise) {
    if(exercise.reps.size()==exercise.weight.size() && exercise.weight.size()==exercise.isWarmup.size() && exercise.reps.size()==exercise.isWarmup.size()){
        return true;
    } else {
        return false;
    }
}
let err = [validator, 'Not all rep info logged'];

//Schema for a user's profile, represents everything associated with a user
let Profile = new Schema({
    name: { type: String, required: true },                             //Full Name
    pseudonym: { type: String, required: true },                        //Nickname
    email : { type: String, required: true },                           //User email
    avatar: { type: String, required: true },                           //User profile picture
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout"}],         //Workout plans the user has submitted to the master list
    exercises : { type: [{
                            name: { type: String, required: true },
                            description: { type: String, required: true },
                            muscleGroups : { type: [String] , required: true},
                        }], required : true },
    logs : [{                                                           //Array of JSON objects which contain arrays of exercises
                name: {type : String, required: true},
                date : {type : String, required: true},
                exercises : { type : [{           
                    name: {type: String, required: true},
                    reps: {type: [Number], required: true},
                    weight: {type: [Number], required: true},                    
                    isWarmup: {type: [Boolean], required: true} 
                }], 
                required: true, validate : err},
           }],                           
    uid: { type: String, required: true },                              //Google unique user id
    token : { type: String, required: true },
});

//Schema for creating a new exercise
let Exercise = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    muscleGroups : { type: [String] , required: true},
});

//Schema for creating a new workout
let Workout = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: { type : [{           
                    name: {type: String, required: true},
                    reps: {type: [Number], required: true},
                    isWarmup: {type: [Boolean], required: true} 
                }], required: true},
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
