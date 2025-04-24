import { useState } from "react";

export default function AddedExerciseComponent({ exercise, index, onRemove }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="border rounded p-4 bg-gray-800 text-white mb-4">
            <div
                className="cursor-pointer font-semibold text-lg flex justify-between items-center"
                onClick={() => setShowDetails(prev => !prev)}
            >
                <span>Ejercicio {index + 1}: {exercise.name}</span>
            </div>

            {showDetails && (
                <div className="mt-2 text-sm">
                    <p><strong>Descripción:</strong> {exercise.description}</p>
                    {exercise.image && (
                        <img src={exercise.image} alt={exercise.name} className="mt-2 w-64 h-auto" />
                    )}
                </div>
            )}

            <button
                className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={onRemove}
            >
                Eliminar ejercicio
            </button>
        </div>
    );
}
