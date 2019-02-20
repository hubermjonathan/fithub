import { Alert } from 'react-native';
//Global helper functions pertaining to posting, requesting, editing, adding etc.to workouts.

export function postStandardWorkout(workout) {
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

/*could delete this later since it's identical to first one*/
export function postCustomWorkout(workout) {
    fetch('https://fithub-server.herokuapp.com/workouts/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workout)
    }).then(res => res.json())
        .then((res) => {
            console.log('Success', JSON.stringify(res))
            Alert.alert(
                'Success!',
                'Workout has been added',
                {
                   text:'Ok',
                   style:'cancel'
                }
            );
        })
        .catch(function (e) {
            console.log('Error');
            Alert.alert(
                'Uh Oh',
                'Something went wrong',
                {
                   text:'Ok',
                   style:'cancel'
                }
            );
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