import { useState, useEffect } from "react";
import AddDayComponent from "./AddDayComponent";
import { saveRoutine, updateRoutine } from "../../../api";
import { RoutineDTO } from "../../../Dtos/RoutinesDTO";

const CreateRoutineComponent = ({ goBack, initialRoutine, setView }) => {

    const [days, setDays] = useState(initialRoutine?.days || []);

    const [routineName, setRoutineName] = useState(initialRoutine?.name || "");
    const [description, setDescription] = useState(initialRoutine?.description || "");
    const [isPublic, setIsPublic] = useState(initialRoutine?.isPublic || false);


    useEffect(() => {
        if (initialRoutine) {
            const loadedDays = initialRoutine.days.map((day) => ({
                ...day,
                id: crypto.randomUUID(), // ID local único
            }));
            setDays(loadedDays);
            setRoutineName(initialRoutine.name);
            setDescription(initialRoutine.description);
            setIsPublic(initialRoutine.isPublic);
        }
    }, [initialRoutine]);


    const jwt = window.localStorage.getItem("jwt");

    const addDay = () => {
        const newDay = {
            id: crypto.randomUUID(),
            name: "",
            exercises: [],
        };

        setDays((prevDays) => [...prevDays, newDay]);
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
            initialRoutine?.routineId || 0,
            routineName,
            description,
            isPublic,
            days
        );

        try {
            if (initialRoutine) {
                console.log(routine);
                await updateRoutine(routine, jwt);
                alert("Rutina actualizada con éxito");
                setView("my");
            } else {
                await saveRoutine(routine, jwt);
                alert("Rutina guardada con éxito");
                setView("my");
            }
        } catch (error) {
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
            <button className="btn mt-4 float-right" onClick={goBack}>Volver al menú</button>
        </div>
    );
};

export default CreateRoutineComponent;
