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

// Return a users workout plans where id is the id of the user
export async function getWorkouts(id) {
    let response = await fetch('https://fithub-server.herokuapp.com/workouts/user/'+id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    let json = await response.json;
    return json;
}

// Get the public workouts where muscles is an array of muscle
// that the user wants. Leave empty if you want all public
// workouts returned. Usage : muscles = [4, 3, 10]
export async function getPublicWorkouts(muscles) {
    let response = await fetch('https://fithub-server.herokuapp.com/workouts/public', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workout)
    });
    let json = await response.json();
    return json;
}