
//Global helper functions pertaining to posting, requesting, editing, adding etc.to workouts.

export function postStandardWorkout(workout) {
    fetch('/workouts/new', {
        method: 'POST',
        body: JSON.stringify(workout)
    }).then(res => res.json())
        .then((res) => console.log('Success', JSON.stringify(res)))
        .catch(function (e) {
            console.log('Error');
        });
}

/*could delete this later since it's identical to first one*/
export function postCustomWorkout(workout) {
    fetch('/workouts/new', {
        method: 'POST',
        body: JSON.stringify(workout)
    }).then(res => res.json())
        .then((res) => console.log('Success', JSON.stringify(res)))
        .catch(function (e) {
            console.log('Error');
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