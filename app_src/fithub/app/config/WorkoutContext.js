import React from 'react';

const WorkoutContext = React.createContext();

export default class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        const workout = Workout;
        this.state = {
            workout: workout,
            name: workout.name,
            uid: workout.uid,
            exercises: workout.exercises,
        }
    }

    componentDidUpdate() {
        console.log("Workout Context has changed: ", this.state.exercises);
    }

    render() {
        return (
            <WorkoutContext.Provider value={{
                state: this.state,
                addExercise: this.addExercise, 
                deleteExercise: (exerciseIndex) => {
                    this.setState(prevState => ({
                        exercises: prevState.exercises.filter((_, index) => index !== exerciseIndex)
                    }));
                },
                addSet: (exerciseIndex, set) => {
                    const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
                    newExercises[exerciseIndex].sets.push(set);
                    this.setState({
                        exercises: newExercises
                    });
                },
                editSet: (exerciseIndex, setIndex, set) => {
                    console.log("Exercise Index: ", exerciseIndex);
                    console.log("Set Index: ", setIndex); 
                    console.log("Set: ", set);
                    const newExercises = JSON.parse(JSON.stringify(this.state.exercises)); 
                    newExercises[exerciseIndex].sets.splice(setIndex, 1, set);
                    this.setState({
                        exercises: newExercises
                    });
                },
                duplicateSet: (exerciseIndex, setIndex) => { 
                    const newSet = this.state.exercises[exerciseIndex].sets[setIndex];
                    const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
                    newExercises[exerciseIndex].sets.splice(setIndex, 0, newSet);
                    this.setState({
                        exercises: newExercises
                    });
                },
                deleteSet: (exerciseIndex, setIndex) => {
                    const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
                    newExercises[exerciseIndex].sets.splice(setIndex, 1);
                    this.setState({
                        exercises: newExercises
                    });
                }
            }}>
            {this.props.children}
            </WorkoutContext.Provider>
        );
    }

    addExercise = (newExercise) => {
        this.setState(prevState => ({ 
            exercises: [...prevState.exercises, newExercise]
        }));
    }

}

const Workout = {
    uid: '12345678910',
    name: 'Chest Day Boi',
    exercises: [
      {name: 'Bench Press', muscle_group: 'Pectorals', equipment_type: 'Barbell', sets: []},
      {name: 'Chest Pullovers', muscle_group: 'Pectorals', equipment_type: 'Dumbbell', sets: []},
      //{name: 'Flyes', muscle_group: 'Pectoralis', equipment_type: 'Cables', sets: []},
    ],
  };