//Default provided Exercises, Workouts, etc.
//This permits local storage so that unnecessary server calls aren't made

export const defaultExercises = [
        //Exercise Template
        //{name: "", equipment_type: "", muscle_group: ""},

        //Generic Chest Exercises
        {name: "Bench Press", equipment_type: "Barbell", muscle_group: "Pectorals"},
        {name: "Bench Press", equipment_type: "Dumbbell", muscle_group: "Pectorals"},
        {name: "Bench Press", equipment_type: "Plate Machine", muscle_group: "Pectorals"},
        {name: "Chest Flyes", equipment_type: "Cables", muscle_group: "Pectorals"},
        {name: "Chest Flyes", equipment_type: "Dumbbell", muscle_group: "Pectorals"},
        {name: "Chest Dips", equipment_type: "Dip Machine", muscle_group: "Pectorals"},
        {name: "Chest Pullovers", equipment_type: "Dumbbell", muscle_group: "Pectoralis"},

        //Generic Back Exercises
        {name: "Lat Pulldown", equipment_type: "Cable Machine", muscle_group: "Lats"},
        {name: "Pull Up", equipment_type: "Pullup Bar", muscle_group: "Lats"},
        {name: "Chin Up", equipment_type: "Pullup Bar", muscle_group: "Lats"},
        {name: "Bent-over Row", equipment_type: "Dumbbell", muscle_group: "Lats"},
        {name: "Bent-over Row", equipment_type: "Barbell", muscle_group: "Lats"},

        //Generic Shoulder Exercises
        {name: "Upright Row", equipment_type: "Cable Machine", muscle_group: "Deltoids"},
        {name: "Shoulder Press", equipment_type: "Dumbbell", muscle_group: "Deltoids"},
        {name: "Shoulder Press", equipment_type: "Barbell", muscle_group: "Deltoids"},
        {name: "Military Press", equipment_type: "Dumbbell", muscle_group: "Deltoids"},
        {name: "Arnold Press", equipment_type: "Dumbbell", muscle_group: "Deltoids"},
        {name: "Lateral Raise", equipment_type: "Dumbbell", muscle_group: "Deltoids"},

        //Generic Arm Exercises
        {name: "Rope Pushdowns", equipment_type: "Cable Machine", muscle_group: "Triceps"},
        {name: "Tricep Extensions", equipment_type: "Dumbbell", muscle_group: "Triceps"},
        {name: "Skullcrushers", equipment_type: "EZ Bar", muscle_group: "Triceps"},
        {name: "Curls", equipment_type: "Dumbbell", muscle_group: "Biceps"},
        {name: "Curls", equipment_type: "Barbell", muscle_group: "Biceps"},
        {name: "Alternating Curls", equipment_type: "Dumbbell", muscle_group: "Biceps"},
        {name: "Hammer Curls", equipment_type: "Dumbbell", muscle_group: "Biceps"},
        {name: "Forearm Curls", equipment_type: "Dumbbell", muscle_group: "Forearms"},

        //Generic Leg Exercises
        {name: "Front Squat", equipment_type: "Barbell", muscle_group: "Quadriceps"},
        {name: "Back Squat", equipment_type: "Barbell", muscle_group: "Quadriceps"},
        {name: "Leg Press", equipment_type: "Plate Machine", muscle_group: "Quadriceps"},
        {name: "Deadlift", equipment_type: "Barbell", muscle_group: "Quadriceps"},
        {name: "Leg Extensions", equipment_type: "Other", muscle_group: "Quadriceps"},
        {name: "Hamstring Exensions", equipment_type: "Other", muscle_group: "Hamstrings"},
        {name: "Leg Curls", equipment_type: "Other", muscle_group: "Hamstrings"},
        {name: "Calve Raises", equipment_type: "Plate Machine", muscle_group: "Calves"},
        {name: "Calve Raises", equipment_type: "Dumbbell", muscle_group: "Calves"},
];

export const defaultWorkouts = [
    {
        uid: undefined,
        name: "Chest Day",
        exercises: [
            {name: "Bench Press", equipment_type: "Barbell", muscle_group: "Pectorals", sets: []},
            {name: "Chest Flyes", equipment_type: "Dumbbell", muscle_group: "Pectorals", sets: []},
            {name: "Bench Press", equipment_type: "Dumbbell", muscle_group: "Pectorals", sets: []},
            {name: "Chest Pullovers", equipment_type: "Dumbbell", muscle_group: "Pectoralis", sets: []},
            {name: "Chest Flyes", equipment_type: "Cables", muscle_group: "Pectorals", sets: []},
        ],
    },
    {
        uid: undefined,
        name: "Back & Shoulder Day",
        exercises: [
            {name: "Lat Pulldown", equipment_type: "Cable Machine", muscle_group: "Lats", sets: []},
            {name: "Pull Up", equipment_type: "Pullup Bar", muscle_group: "Lats", sets: []},
            {name: "Bent-over Row", equipment_type: "Barbell", muscle_group: "Lats", sets: []},
            {name: "Shoulder Press", equipment_type: "Barbell", muscle_group: "Deltoids", sets: []},
            {name: "Lateral Raise", equipment_type: "Dumbbell", muscle_group: "Deltoids", sets: []},
            {name: "Arnold Press", equipment_type: "Dumbbell", muscle_group: "Deltoids", sets: []},
        ],
    },
    {
        uid: undefined,
        name: "Arm Day",
        exercises: [
            {name: "Curls", equipment_type: "Dumbbell", muscle_group: "Biceps", sets: []},
            {name: "Rope Pushdowns", equipment_type: "Cable Machine", muscle_group: "Triceps", sets: []},
            {name: "Alternating Curls", equipment_type: "Dumbbell", muscle_group: "Biceps", sets: []},
            {name: "Tricep Extensions", equipment_type: "Dumbbell", muscle_group: "Triceps", sets: []},
            {name: "Hammer Curls", equipment_type: "Dumbbell", muscle_group: "Biceps", sets: []},
            {name: "Forearm Curls", equipment_type: "Dumbbell", muscle_group: "Forearms", sets: []},
        ],
    },
    {
        uid: undefined,
        name: 'Leg Day',
        exercises: [
            {name: "Back Squat", equipment_type: "Barbell", muscle_group: "Quadriceps", sets: []},
            {name: "Hamstring Exensions", equipment_type: "Other", muscle_group: "Hamstrings", sets: []},
            {name: "Leg Press", equipment_type: "Plate Machine", muscle_group: "Quadriceps", sets: []},
            {name: "Leg Curls", equipment_type: "Other", muscle_group: "Hamstrings", sets: []},
            {name: "Calve Raises", equipment_type: "Plate Machine", muscle_group: "Calves", sets: []},
        ],
    },
]