import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';

// Returns the usernames and ids of all the users registered with the app
export async function getUsers() {
    let response = await fetch('https://fithub-server.herokuapp.com/users', {
        method: 'GET'
    });
    let json = await response.json();
    return json;
}

export async function getGains(id) {
    let response = await fetch('https://fithub-server.herokuapp.com/workouts/public/'+id, {
        method: 'GET'
    });
    let json = await response.json();
    return json;
}

export async function addGains(workout) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    workout.uid = uid;
    workout.id = id;
    workout.token = token;
    console.log(workout)
    fetch('https://fithub-server.herokuapp.com/workouts/gain', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workout)
    }).then(res => {
        //console.log(res);
    }).catch(err => {
        console.log(err);
    })
}