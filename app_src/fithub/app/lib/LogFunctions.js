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
        //console.log("DATA", data);
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

//Returns the logs associated with the logged in user
export async function getLogs() {
    const id = await getUserID();
    let response = await fetch(`https://fithub-server.herokuapp.com/logs/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    return json;
}
