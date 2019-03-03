import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';

export function getUsers() {
    fetch(`/users`, {
        method: 'GET'
    }).then(res => res.json())
        .then(res => console.log(res))
        .catch(function (e) {
            console.log("User not found");
        });
}

export function getPublicWorkouts() {
    fetch(`/workouts/public`, {
        method: 'GET'
    }).then(res => res.json())
        .then(res => console.log(res))
        .catch(function (e) {
            console.log("User not found");
        });
}