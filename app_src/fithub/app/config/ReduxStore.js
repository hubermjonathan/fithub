import { createStore } from "redux";
import { cloneDeep } from "lodash";

const initialState = {
    // workout: {
    //     name: undefined,
    //     id: undefined,
    //     exercises: [],
    // }
    workout: {
        uid: '12345678910',
        name: 'Chest Day Boi',
        exercises: [
          {name: 'Bench Press', muscle_group: 'Pectorals', equipment_type: 'Barbell', sets: [
              {reps: 15, weight: 45, warmup: true},
              {reps: 12, weight: 65, warmup: true},
              {reps: 8, weight: 95, warmup: true},
              {reps: 8, weight: 135, warmup: false},
              {reps: 6, weight: 165, warmup: false},
              {reps: 6, weight: 165, warmup: false},
              {reps: 15, weight: 115, warmup: false},
          ]},
          {name: 'Chest Pullovers', muscle_group: 'Pectorals', equipment_type: 'Dumbbell', sets: [
            {reps: 8, weight: 50, warmup: false},
            {reps: 8, weight: 50, warmup: false},
            {reps: 8, weight: 50, warmup: false},
            {reps: 6, weight: 50, warmup: false},
          ]},
          {name: 'Flyes', muscle_group: 'Pectoralis', equipment_type: 'Cables', sets: [
            {reps: 8, weight: 25, warmup: false},
            {reps: 8, weight: 25, warmup: false},
            {reps: 6, weight: 25, warmup: false}, 
            {reps: 6, weight: 25, warmup: false},
          ]},
        ],
    }
}

const reducer = function(state=initialState, action) {
    const newState = cloneDeep(state);
    //console.log("NEW STATE: ", newState);
    //console.log("ACTION: ", action);
    // const exerciseIndex = action.payload.exerciseIndex;
    // const setIndex = action.payload.setIndex;
    
    switch(action.type) {
        case "AddExercise":
            //AddExercise appends a new exercise object to the end of the array. Action.Payload: <Exercise_Object>
            newState.workout.exercises = [...state.workout.exercises, action.payload];
            break;
        case "DeleteExercise":
            //DeleteExercise receives the index of the exercise to be deleted. Action.Payload: <Exercise_Index>
            newState.workout.exercises = state.workout.exercises.filter((_, index) => index !== action.payload);
            break;

        case "AddSet":
            //newState.workout.exercises[action.payload.exerciseIndex].sets.push(action.payload.set);
            newState.workout.exercises[action.payload.exerciseIndex].sets = [...state.workout.exercises[action.payload.exerciseIndex].sets, action.payload.set];
            break;

        case "DuplicateSet": 
            const set = cloneDeep(state.workout.exercises[action.payload.exerciseIndex].sets[action.payload.setIndex]); 
            newState.workout.exercises[action.payload.exerciseIndex].sets.splice(action.payload.setIndex, 0, set);
            break;

        case "DeleteSet":
            newState.workout.exercises[action.payload.exerciseIndex].sets = 
                state.workout.exercises[action.payload.exerciseIndex].sets.filter((_, index) => index !== action.payload.setIndex);
            break;

        case "EditSet":
            newState.workout.exercises[action.payload.exerciseIndex].sets.splice(action.payload.setIndex, 1, action.payload.set);
            break;

        default:
            console.log("Redux Store Reducer function received invalid type: ", action.type);
    }
    return newState;
}

export default createStore(reducer);
