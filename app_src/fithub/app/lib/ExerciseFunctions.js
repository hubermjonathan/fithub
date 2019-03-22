//Global helper functions pertaining to posting, requesting, editing, adding etc.to exercises

//Return all the public exercises
export async function getExercises() {
    let response = await fetch('https://fithub-server.herokuapp.com/exercises', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    let json = await response.json();
    return json;
}

// Return a users exercises where id is the is of the user
export async function getUserExercises(id) {
    let response = await fetch('https://fithub-server.herokuapp.com/exercises/'+id, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    let json = await response.json();
    return json;
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
    return enumGroup;
}

export function numToMuscle(muscleGroups){
    let enumGroup = [];
    muscleGroups.forEach(element => {
        var key = Object.keys(muscleEnums)[element-1];
        enumGroup.push(key);
    });
    return enumGroup;
}