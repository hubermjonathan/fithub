import { Alert } from 'react-native';
//Global helper functions pertaining to posting, requesting, editing, adding etc.to workouts.
import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';



export async function postWorkout(workout) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    workout.uid = uid;
    workout.id = id;
    workout.token = token;
    fetch('https://fithub-server.herokuapp.com/workouts/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workout)
    }).then(res => res.json())
        .then((res) => console.log('Success', JSON.stringify(res)))
        .catch(function (e) {
            console.log('Error');
        });
}

export function getWorkouts(uid) {
    fetch(`/users/${uid}/workouts`, {
        method: 'GET'
    }).then(res => res.json())
        .then(res => console.log(res))
        .catch(function (e) {
            console.log("User not found");
        });
}