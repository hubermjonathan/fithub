import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';
import { Alert } from 'react-native';
let muscleEnums = {
    "NECK": 1,
    "SHOULDERS": 2,
    "DELTOID": 3,
    "TRICEPS": 4,
    "BICEPS": 5,
    "FOREARMS": 6,
    "BACK": 7,
    "LATS": 8,
    "TRAPS": 9,
    "CHEST": 10,
    "WAIST": 11,
    "OBLIQUES": 12,
    "HIPS": 13,
    "GLUTES": 14,
    "THIGHS": 15,
    "QUADS": 16,
    "HAMSTRINGS": 17,
    "CALVES": 18
}

export async function validateLog(log) {
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

export async function postLog(workout) {

    try {
        const id = await getUserID();
        const uid = await getUserUID();
        const token = await getUserToken();
        //const date = //Date

        const data = {
            id: id,
            uid: uid,
            token: token,
            date: workout.date,
            name: workout.name,
            exercises: workout.exercises,
        }
        console.log("DATA", data);
        console.log(JSON.stringify(workout));

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

/*
*/
export async function getLogs(id) {

    fetch(`https://fithub-server.herokuapp.com/logs/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => res.json())
        .then((data) => console.log('Success', JSON.stringify(data)))
        .catch(function (e) {
            console.log('Error');
        });
}