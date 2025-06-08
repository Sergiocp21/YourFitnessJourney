import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserExercises } from "../../api";

function ExerciseSelectorComponent() {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercises = async () => {
            const token = localStorage.getItem("jwt");
            const response = await getUserExercises(token);
            setExercises(response);
        };

        fetchExercises();
    }, []);

    return (
        <div className="p-6 text-white flex flex-col max-h-[70vh]">
            <h1 className="text-3xl font-bold mb-4">Tus Ejercicios</h1>
            <ul className="space-y-2 overflow-y-auto max-h-1/2 pt-6">
                {exercises.map((exercise) => (
                    <li
                        key={exercise.id}
                        className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition"
                        onClick={() => navigate(`/statistics/${exercise.id}`)}
                    >
                        {exercise.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ExerciseSelectorComponent;