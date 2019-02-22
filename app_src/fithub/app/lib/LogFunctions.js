import { getUserToken, getUserID, getUserUID } from '../lib/AccountFunctions';

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
        //date:
        description: 'user_data_log',
        name: workout.name,
        exercises: workout.exercises,
    }
    console.log("DATA", data);

    fetch('https://fithub-server.herokuapp.com/logs/new', {
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

    } catch(e) {
        console.log(e);
    }
}

