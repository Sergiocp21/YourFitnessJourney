import { useState } from "react";
import AddDayComponent from "./AddDayComponent";
import { saveRoutine } from "../../../api";
import { RoutineDTO } from "../../../Dtos/RoutinesDTO";

const CreateRoutineComponent = () => {
    const [days, setDays] = useState([]);
    const [dayCounter, setDayCounter] = useState(0);

    const [routineName, setRoutineName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const jwt = window.localStorage.getItem("jwt");

    const addDay = () => {
        const newDay = {
            id: dayCounter,
            name: "",
            exercises: [],
        };

        setDays((prevDays) => [...prevDays, newDay]);
        setDayCounter((prevCounter) => prevCounter + 1);
    };

    const updateDay = (updatedDay) => {
        setDays((prevDays) =>
            prevDays.map((day) => (day.id === updatedDay.id ? updatedDay : day))
        );
    };

    const deleteDay = (idToDelete) => {
        setDays((prevDays) => prevDays.filter((day) => day.id !== idToDelete));
    };

    const handleSaveRoutine = async () => {
        const routine = new RoutineDTO(
            routineName,
            description,
            isPublic,
            days
        );

        try {
            console.log("Authorization Header:", `Bearer ${jwt}`);
            await saveRoutine(routine, jwt);
            console.log(routine);
            alert("Rutina guardada con éxito");
        } catch (error) {
            console.log(routine);
            console.error("Error al guardar rutina:", error);
            alert("Hubo un error al guardar la rutina.");
        }
    };

    const hasAtLeastOneExercise = days.some((day) => day.exercises.length > 0);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-2">Crear Rutina</h2>

            <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Nombre de la rutina"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
            />

            <textarea
                className="w-full p-2 border rounded"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
                <span>Hacer rutina pública</span>
            </label>

            {days.map((day, index) => (
                <AddDayComponent
                    key={day.id}
                    day={day}
                    index={index}
                    updateDay={updateDay}
                    deleteDay={() => deleteDay(day.id)}
                />
            ))}

            <button
                onClick={addDay}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Añadir Día
            </button>

            {hasAtLeastOneExercise && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleSaveRoutine}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
                    >
                        Guardar rutina
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateRoutineComponent;
