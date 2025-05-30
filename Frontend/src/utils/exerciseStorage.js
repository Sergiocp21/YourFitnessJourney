const EXERCISE_STORAGE_KEY = "activeExerciseData";
const EXERCISE_INDEX_STORAGE_KEY = "activeExerciseIndex";
const STORAGE_EXPIRATION_HOURS = 2;

export const saveExerciseDataToStorage = (data) => {
    const timestamp = new Date().getTime();
    // Aseguramos que cada ejercicio en el array tenga el campo exerciseId sin sobrescribir valores existentes
    if (data.exercises) {
        data.exercises = data.exercises.map((exercise) => ({
            ...exercise,
            exerciseId: exercise.exerciseId, // Mantenemos el exerciseId existente
        }));
    }
    localStorage.setItem(EXERCISE_STORAGE_KEY, JSON.stringify({ data, timestamp }));
};

export const getExerciseDataFromStorage = () => {
    const storedData = localStorage.getItem(EXERCISE_STORAGE_KEY);
    if (!storedData) return null;

    const { data, timestamp } = JSON.parse(storedData);
    const now = new Date().getTime();
    const expirationTime = STORAGE_EXPIRATION_HOURS * 60 * 60 * 1000;

    if (now - timestamp > expirationTime) {
        localStorage.removeItem(EXERCISE_STORAGE_KEY);
        return null;
    }

    return data;
};

export const clearExerciseDataFromStorage = () => {
    localStorage.removeItem(EXERCISE_STORAGE_KEY);
};


export const getNextExerciseIndexFromStorage = () => {
    const storedData = localStorage.getItem(EXERCISE_STORAGE_KEY);
    if (!storedData) return 0;

    const { data } = JSON.parse(storedData);
    return data.exercises ? data.exercises.length : 0;
};
