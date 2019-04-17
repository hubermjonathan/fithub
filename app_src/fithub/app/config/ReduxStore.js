import { createStore } from "redux";
import { cloneDeep } from "lodash";

import { editLog } from '../lib/LogFunctions';

const initialState = {
    workout: {
        uid: '',
        name: '',
        exercises: [],
    }
}

const reducer = function(state=initialState, action) {
    const newState = cloneDeep(state);
    
    switch(action.type) {
        case "SetWorkout":
            newState.workout = action.payload;
            break;
        case "AddExercise":
            //AddExercise appends a new exercise object to the end of the array. Action.Payload: <Exercise_Object>
            newState.workout.exercises = [...state.workout.exercises, action.payload];
            editLog(newState.workout);
            break;
        case "DeleteExercise":
            //DeleteExercise receives the index of the exercise to be deleted. Action.Payload: <Exercise_Index>
            newState.workout.exercises = state.workout.exercises.filter((_, index) => index !== action.payload);
            editLog(newState.workout);
            break;

        case "AddSet": 
            //newState.workout.exercises[action.payload.exerciseIndex].sets.push(action.payload.set); 
            newState.workout.exercises[action.payload.exerciseIndex].sets = [...state.workout.exercises[action.payload.exerciseIndex].sets, action.payload.set];
            editLog(newState.workout);
            break;

        case "DuplicateSet": 
            const set = cloneDeep(state.workout.exercises[action.payload.exerciseIndex].sets[action.payload.setIndex]); 
            newState.workout.exercises[action.payload.exerciseIndex].sets.splice(action.payload.setIndex, 0, set);
            editLog(newState.workout);
            break;

        case "DeleteSet":
            newState.workout.exercises[action.payload.exerciseIndex].sets = 
                state.workout.exercises[action.payload.exerciseIndex].sets.filter((_, index) => index !== action.payload.setIndex);
            editLog(newState.workout); 
            break;

        case "EditSet":
            newState.workout.exercises[action.payload.exerciseIndex].sets.splice(action.payload.setIndex, 1, action.payload.set);
            editLog(newState.workout);
            break;

        default:
            console.log("Redux Store Reducer function received invalid type: ", action.type);
    }
    return newState;
}


export default createStore(reducer);
