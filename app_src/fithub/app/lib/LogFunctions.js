import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';

export function validateLog(log) {
    if (log.name === undefined) {
        return false;
    } else if (log.date === undefined) {
        return false;
    }
    if (Array.isArray(log.exercises)) {
        log.exercises.forEach(exercise => {
            if (typeof exercise !== Object) {
                return false;
            } else {
                if (exercise.name === undefined) {
                    return false;
                }
                if (Array.isArray(exercise.muscle_groups)) {
                    exercise.muscle_groups.forEach(muscle => {
                        if (muscle < 0 || muscle > 18) {
                            return false;
                        }
                    });
                }
            }
        });
    } else {
        return false;
    }
}

export async function postLog(workout, date) {

    try {
        const id = await getUserID();
        const uid = await getUserUID();
        const token = await getUserToken();
        //const date = //Date
        let fixedExercises = [];
        for(let x = 0; x < workout.exercises.length;x++){
            let eobj = {name:workout.exercises[x].name,muscle_groups:workout.exercises[x].muscle_groups,sets:[]};
            for(let y = 0; y < workout.exercises[x].sets.length;y++){
                eobj.sets.push({weight:workout.exercises[x].sets[y].weight,reps:workout.exercises[x].sets[y].reps,isWarmup:workout.exercises[x].sets[y].isWarmup})
            }
            fixedExercises.push(eobj);
            
        }
        workout.exercises = fixedExercises;
        
        const data = {
            id: id,
            uid: uid,
            token: token,
            //date: workout.date,
            date: date,
            name: workout.name,
            exercises: workout.exercises,
        }
        console.log("DATA", data);
        //console.log(JSON.stringify(workout));

        fetch('https://fithub-server.herokuapp.com/logs/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((data) => {
                console.log('Success', JSON.stringify(data))
                Alert.alert(
                    'Success!',
                    'Workout was logged!'
                )
            })
            .catch(function (e) {
                console.log('Error');
            });

    } catch (e) {
        console.log(e);
    }
}

export async function editLog(workout) {
    try {
        const id = await getUserID();
        const uid = await getUserUID();
        const token = await getUserToken();

        let fixedExercises = [];
        for(let x = 0; x < workout.exercises.length;x++){
            let eobj = {name:workout.exercises[x].name,muscle_groups:workout.exercises[x].muscle_groups,sets:[]};
            for(let y = 0; y < workout.exercises[x].sets.length;y++){
                eobj.sets.push({weight:workout.exercises[x].sets[y].weight,reps:workout.exercises[x].sets[y].reps,isWarmup:workout.exercises[x].sets[y].isWarmup})
            }
            fixedExercises.push(eobj);
            
        }
        workout.exercises = fixedExercises;
        
        const data = {
            old_log_id: workout._id, 
            _id: workout._id,
            id: id,
            uid: uid,
            token: token,
            date: workout.date,
            name: workout.name,
            exercises: workout.exercises,
        }
        console.log("DATA", data);
        //console.log(JSON.stringify(workout));

        fetch('https://fithub-server.herokuapp.com/logs/edit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((data) => {
                console.log('Success', JSON.stringify(data))
                Alert.alert(
                    'Success!',
                    'Workout was logged!'
                )
            })
            .catch(function (e) {
                console.log('Error');
            });

    } catch (e) {
        console.log(e);
    }
}

//Returns the logs associated with the logged in user
export async function getLogs() {
    const id = await getUserID();
    let response = await fetch('https://fithub-server.herokuapp.com/logs/'+id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    return json;
}
