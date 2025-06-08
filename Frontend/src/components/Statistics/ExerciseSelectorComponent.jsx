import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserExercises } from "../../api";
import { useNotification } from "../Notifications/useNotification";

function ExerciseSelectorComponent() {
    const { notify } = useNotification();
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await getUserExercises(token);
                setExercises(response);
            } catch (error) {
                console.error("Error al obtener los ejercicios:", error);
                notify("Error al cargar los ejercicios. Inténtalo de nuevo más tarde.", "error");
            } finally {
                setIsLoading(false); // Marcar como cargado
            }
        };

        fetchExercises();
    }, [notify]);

    // Notificar si no hay ejercicios después de que se actualice el estado
    useEffect(() => {
        if (!isLoading && exercises.length === 0) {
            notify(
                "Aún no tienes ningún ejercicio realizado, vuelve aquí cuando completes algún entrenamiento",
                "warning"
            );
        }
    }, [exercises, isLoading, notify]);

    return (
        <div className="p-6 text-white flex flex-col max-h-[70vh]">
            <h1 className="text-3xl font-bold mb-4">Tus Ejercicios</h1>
            <ul className="space-y-2 overflow-y-auto max-h-1/2 pt-6">
                {exercises.length > 0 && (
                    <>
                        {exercises.map((exercise) => (
                            <li
                                key={exercise.id}
                                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition"
                                onClick={() => navigate(`/statistics/${exercise.id}`)}
                            >
                                {exercise.name}
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
}

export default ExerciseSelectorComponent;