//Global helper functions pertaining to posting, requesting, editing, adding etc.to exercises

export function getExercises(store) {
    fetch('https://fithub-server.herokuapp.com/exercises', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
        .then((res) => {
            console.log('Success', JSON.stringify(res))
            store = JSON.parse(res);
        })
        .catch(function (e) {
            console.log('Error');
        });
}