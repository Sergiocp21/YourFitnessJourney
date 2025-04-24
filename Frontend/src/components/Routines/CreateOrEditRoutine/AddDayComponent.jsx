import { useState } from "react";
import ExerciseSelector from "./ExerciseSelector";

const AddDayComponent = ({ day, index, updateDay, deleteDay }) => {
    const [showAddExercise, setShowAddExercise] = useState(false);

    const handleDayNameChange = (e) => {
        updateDay({ ...day, name: e.target.value });
    };

    const addExercise = (exercise) => {
        updateDay({
            ...day,
            exercises: [...day.exercises, { ...exercise, showDescription: false }],
        });
        setShowAddExercise(false);
    };


    const removeExercise = (idx) => {
        const updatedExercises = day.exercises.filter((_, i) => i !== idx);
        updateDay({ ...day, exercises: updatedExercises });
    };

    const toggleDescription = (idx) => {
        const updatedExercises = day.exercises.map((ex, i) =>
            i === idx ? { ...ex, showDescription: !ex.showDescription } : ex
        );
        updateDay({ ...day, exercises: updatedExercises });
    };

    return (
        <div className="bg-gray-900 p-4 mb-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
                <input
                    type="text"
                    placeholder={`Nombre del día ${index + 1}`}
                    value={day.name}
                    onChange={handleDayNameChange}
                    className="border p-2 rounded w-full mr-4"
                />
                <button
                    onClick={deleteDay}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                    Eliminar Día
                </button>
            </div>

            {day.exercises.map((exercise, idx) => (
                <div key={idx} className="bg-gray-800 p-3 rounded border mb-2 hover:shadow transition">
                    <div className="flex justify-between items-center">
                        <div onClick={() => toggleDescription(idx)} className="cursor-pointer font-semibold">
                            Ejercicio {idx + 1}: {exercise.name}
                        </div>
                        <button onClick={() => removeExercise(idx)} className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 text-sm">
                            Eliminar
                        </button>
                    </div>
                    {exercise.showDescription && (
                        <div className="mt-2 text-gray-400">
                            <p>{exercise.description}</p>
                            <strong>Series: {exercise.sets}</strong> {/* Aquí mostramos el número de sets */}
                        </div>
                    )}
                </div>
            ))}


            {showAddExercise ? (
                <div className="mt-3">
                    <ExerciseSelector onSelect={addExercise} />
                </div>
            ) : (
                <button
                    onClick={() => setShowAddExercise(true)}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Añadir ejercicio
                </button>
            )}
        </div>
    );
};

export default AddDayComponent;
