import { getUserToken, getUserID, getUserUID, getUserName } from '../lib/AccountFunctions';

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
    });
}

export async function addComment(comment) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    comment.id = id;
    comment.uid = uid;
    comment.token = token;
    fetch('https://fithub-server.herokuapp.com/workouts/addComment', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment)
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

export async function followUser(user) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    user.id = id;
    user.uid = uid;
    user.token = token;
    fetch('https://fithub-server.herokuapp.com/profile/follow', {
        method: 'POST',
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then(err => {
        console.log(err);
    });
}

export async function unfollowUser(user) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    user.id = id;
    user.uid = uid;
    user.token = token;
    fetch('https://fithub-server.herokuapp.com/profile/unfollow', {
        method: 'POST',
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then(err => {
        console.log(err);
    });
}