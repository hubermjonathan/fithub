import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';

export async function getCalories(id) {
    let response = await fetch('https://fithub-server.herokuapp.com/logs/'+id+'/calories', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    return json;
}

export async function getWeight(id) {
    let response = await fetch('https://fithub-server.herokuapp.com/logs/'+id+'/weight', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    return json;
}

export async function editCalories(calories) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    calories.uid = uid;
    calories.id = id;
    calories.token = token;
    fetch('https://fithub-server.herokuapp.com/logs/calories', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(calories)
    }).then(res => res.json())
        .then((res) => console.log('Success', JSON.stringify(res)))
        .catch(function (e) {
            console.log(e);
        });
}

export async function editWeight(weight) {
    const id = await getUserID();
    const uid = await getUserUID();
    const token = await getUserToken();
    weight.uid = uid;
    weight.id = id;
    weight.token = token;
    fetch('https://fithub-server.herokuapp.com/logs/weight', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(weight)
    }).then(res => res.json())
        .then((res) => console.log('Success', JSON.stringify(res)))
        .catch(function (e) {
            console.log(e);
        });
}