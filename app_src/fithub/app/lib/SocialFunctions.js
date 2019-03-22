import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';

// Returns the usernames and ids of all the users registered with the app
export async function getUsers() {
    let response = await fetch('https://fithub-server.herokuapp.com/users', {
        method: 'GET'
    });
    let json = await response.json();
    return json;
}