import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';

/*

*/
export async function editProfile(profile) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    profile.uid = uid;
    profile.id = id;
    profile.token = token;
    fetch('https://fithub-server.herokuapp.com/profile/editName', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profile)
    }).then(res => res.json())
        .then((res) => console.log('Success', JSON.stringify(res)))
        .catch(function (e) {
            console.log('Error');
        });
}

/*

*/
export async function getProfile(id, store) {
    fetch(`https://fithub-server.herokuapp.com/users/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => res.json())
        .then((res) => {
            store=JSON.stringify(res);
            return console.log('Success', JSON.stringify(res)); 
        })
        .catch(function (e) {
            console.log('Error');
        });
}

/*

*/
export async function getProfileDates(id, store) {
    fetch(`https://fithub-server.herokuapp.com/profile/dates/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => res.json())
        .then((res) => {
            store=JSON.stringify(res);
            return console.log('Success', JSON.stringify(res)); 
        }).catch(function (e) {
            console.log('Error');
        });
}

/*

*/
export async function getProfileStats(id, store) {
    let promise = fetch(`https://fithub-server.herokuapp.com/profile/${id}/stats`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => res.json());
    return promise;
/*        .then((res) => {
            store=JSON.stringify(res);
            return console.log('Success', JSON.stringify(res)); 
        }).catch(function (e) {
            console.log('Error');
        });*/
}

export async function getProfileActivity(id, store) {
    fetch(`https://fithub-server.herokuapp.com/profile/${id}/activity`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => res.json())
        .then((res) => {
            store=JSON.stringify(res);
            return console.log('Success', JSON.stringify(res)); 
        }).catch(function (e) {
            console.log('Error');
        });
}