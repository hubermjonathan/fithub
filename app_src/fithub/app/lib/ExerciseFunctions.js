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

let muscleEnums = {
    "NECK": 1,
    "SHOULDERS": 2, 
    "DELTOID": 3,
    "TRICEPS": 4,
    "BICEPS": 5,
    "FOREARMS": 6,
    "BACK": 7,
    "LATS": 8,
    "TRAPS": 9,
    "CHEST": 10,
    "WAIST": 11,
    "OBLIQUES": 12,
    "HIPS": 13,
    "GLUTES": 14,
    "THIGHS": 15,
    "QUADS": 16,
    "HAMSTRINGS": 17, 
    "CALVES": 18
  }

export function muscleToNum(muscleGroups){
    let enumGroup = [];
    muscleGroups.forEach(element => {
        element = element.toUpperCase();
        enumGroup.push(muscleEnums[element]);
    });
}

export function numToMuscle(muscleGroups){
    let enumGroup = [];
    muscleGroups.forEach(element => {
        var key = Object.keys(muscleEnums)[element-1];
        enumGroup.push(key);
    });
}