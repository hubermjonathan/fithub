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


// Returns the profile of the user where id is the
// id of the user
export async function getProfile(id) {
    let response = await fetch(`https://fithub-server.herokuapp.com/profile/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    return json;
}

/*
    Returns the dates the user with a matching id has worked out
*/
export async function getProfileDates(id) {
    let response = await fetch(`https://fithub-server.herokuapp.com/profile/${id}/dates/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    return json;
}


// Returns the max stats of a user where is is the id of the user 
// Stats is an object with the form of
//  {
//      volumes{
//          workout_name: max_weight
//      }
//      maxes{
//          workout_name: max_weight            
//      }
//  }
export async function getProfileStats(id) {
    let response = await fetch(`https://fithub-server.herokuapp.com/profile/${id}/stats`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    return json;
}

// Return the recent profile activity of a user where 
// id is the id of the user
export async function getProfileActivity(id) {
    let response = await fetch(`https://fithub-server.herokuapp.com/profile/${id}/activity`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    return json;
}