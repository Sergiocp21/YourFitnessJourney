import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { getTodayExercises, updateWorkoutProgress, getActiveRoutineDays, changeActiveDay } from "../../api";
import RoutineDaySelectorModal from "./RoutineDaySelectorModal";
import { RoutineDayDTO } from "../../Dtos/RoutineDayDTO";
import { useNotification } from '../Notifications/useNotification';
import { saveExerciseDataToStorage, getExerciseDataFromStorage, clearExerciseDataFromStorage, getNextExerciseIndexFromStorage } from "../../utils/exerciseStorage";

const STORAGE_EXPIRATION_HOURS = 2;

export default function TrainingComponent() {

    const { notify } = useNotification();
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");

    const [todayExercises, setTodayExercises] = useState(null);
    const [actualExerciseIndex, setActualExerciseIndex] = useState(0);
    const [exerciseData, setExerciseData] = useState(() => getExerciseDataFromStorage()?.exercises || {});
    const [showSelector, setShowSelector] = useState(false);

    const fetchToday = useCallback(async () => {
        const exercises = await getTodayExercises(token);
        setTodayExercises(exercises);
        const initialData = {};
        exercises.exercises.forEach((ex) => {
            initialData[ex.exerciseId] = {
                reps: "",
                weight: "",
                notes: ex.notes || "",
                exerciseId: ex.exerciseId,
            };
        });
        setExerciseData(initialData);

        const nextIndex = getNextExerciseIndexFromStorage();
        if (nextIndex >= 0 && nextIndex < exercises.exercises.length) {
            setActualExerciseIndex(nextIndex);
        } else {
            setActualExerciseIndex(0);
        }
    }, [token]);

    useEffect(() => {
        fetchToday();
    }, [fetchToday]);

    const handleInputChange = (field, value) => {
        setExerciseData((prev) => ({
            ...prev,
            [actualExercise.exerciseId]: {
                ...prev[actualExercise.exerciseId],
                [field]: value,
            },
        }));
    };

    const handleNextExercise = () => {
        const currentData = exerciseData[actualExercise.exerciseId];

        const hasReps = currentData?.reps !== "" && currentData?.reps !== undefined;
        const hasWeight = currentData?.weight !== "" && currentData?.weight !== undefined;

        if ((hasReps && !hasWeight) || (!hasReps && hasWeight)) {
            // Si uno de los dos inputs tiene datos y el otro no, mostrar error
            notify("Por favor, rellena tanto las repeticiones como el peso antes de continuar al siguiente ejercicio o déjalo vacío si hoy no has podido realizarlo.", "error");
            return;
        }

        if (actualExerciseIndex < todayExercises.exercises.length - 1) {
            setExerciseData((prev) => {
                const updatedData = {
                    ...prev,
                    [actualExercise.exerciseId]: {
                        reps: prev[actualExercise.exerciseId]?.reps || "",
                        weight: prev[actualExercise.exerciseId]?.weight || "",
                        notes: prev[actualExercise.exerciseId]?.notes || actualExercise.notes || "",
                        exerciseId: actualExercise.exerciseId, // Aseguramos que el exerciseId se incluya
                    },
                };

                let routineDayDTO = getExerciseDataFromStorage() || new RoutineDayDTO(todayExercises.order, todayExercises.name, []);
                if (!Array.isArray(routineDayDTO.exercises)) {
                    routineDayDTO.exercises = [];
                }

                routineDayDTO.exercises.push(updatedData[actualExercise.exerciseId]);

                saveExerciseDataToStorage(routineDayDTO);

                const nextExerciseId = todayExercises.exercises[actualExerciseIndex + 1]?.exerciseId; // Corregimos el índice para avanzar correctamente
                updatedData[nextExerciseId] = {
                    reps: "",
                    weight: "",
                    notes: "",
                    exerciseId: nextExerciseId, // Añadimos el exerciseId al siguiente ejercicio
                };

                return updatedData;
            });

            setActualExerciseIndex((prev) => prev + 1); // Incrementamos correctamente el índice
        }
    };

    const handleFinishWorkout = async () => {
        try {
            const routineDayDTO = getExerciseDataFromStorage();
            if (!routineDayDTO) {
                notify("No hay datos para enviar al backend.", "error");
                return;
            }

            const currentData = exerciseData[actualExercise.exerciseId];

            const hasReps = currentData?.reps !== "" && currentData?.reps !== undefined;
            const hasWeight = currentData?.weight !== "" && currentData?.weight !== undefined;

            if (!hasReps && !hasWeight) {
                if (actualExerciseIndex === 0) {
                    // Si es el primer ejercicio y ambos campos están vacíos, no permitir terminar
                    notify("No puedes terminar el entrenamiento sin rellenar al menos un dato del primer ejercicio.", "error");
                    return;
                } else {
                    // Si no es el primer ejercicio, no incluir este ejercicio en el envío
                    notify("Ejercicio actual no será incluido porque no tiene datos.", "warning");
                }
            } else if (!hasReps || !hasWeight) {
                // Si falta uno de los dos campos, mostrar error
                notify("Por favor, rellena tanto las repeticiones como el peso usado antes de terminar o déjalos vacíos si no has realizado el ejercicio.", "error");
                return;
            } else {
                // Si ambos campos están rellenos, añadir el ejercicio actual al array
                console.log(currentData);
                routineDayDTO.exercises.push(currentData);
            }

            console.log("Datos enviados: ", routineDayDTO);
            await updateWorkoutProgress(routineDayDTO, token);
            notify("Entrenamiento guardado correctamente", "success");

            clearExerciseDataFromStorage();
            navigate("/home");
        } catch (error) {
            console.error("Error al guardar entrenamiento:", error);
            notify("Error al guardar entrenamiento", "error");
        }
    };


    const handleChangeDayClick = async () => {
        try {
            const response = await getActiveRoutineDays(token);
            console.log(response);
            setShowSelector(true);
        } catch (error) {
            console.error("Error al obtener rutina activa:", error);
        }
    };

    const handleSelectDay = async (dayOrder) => {
        try {
            await changeActiveDay(dayOrder, token);
            setShowSelector(false);
            clearExerciseDataFromStorage();
            await fetchToday();
        } catch (error) {
            console.error("Error al cambiar de día:", error);
        }
    };

    const actualExercise = todayExercises?.exercises[actualExerciseIndex];
    console.log(todayExercises);
    return (
        <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">Tu entrenamiento de hoy</h2>

            {todayExercises?.name && (
                <div className="font-extrabold">
                    <p>Día {todayExercises.order}: {todayExercises.name}</p>
                </div>
            )}

            {actualExercise ? (
                <div key={actualExercise.exerciseId}>
                    <h3 className="font-semibold">Ejercicio: {actualExercise.name}</h3>
                    <p>{actualExercise.sets} series</p>

                    <div className="space-y-8 vertical-center">
                        <div className="mt-4 space-y-2">
                            <p className="text-2xl">Repeticiones</p>
                            <input
                                type="number"
                                className="border rounded p-2 w-1/2 text-center"
                                min="1"
                                placeholder={actualExercise.reps ? "Última vez: " + actualExercise.reps : "Primera vez"}
                                value={exerciseData[actualExercise.exerciseId]?.reps || ""}
                                onChange={(e) =>
                                    handleInputChange("reps", e.target.value === "" ? "" : parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl">Peso</p>
                            <input
                                type="number"
                                className="border rounded p-2 w-1/2 text-center"
                                min="1"
                                step="any"
                                placeholder={actualExercise.weight ? "Última vez: " + actualExercise.weight + "kg" : "Primera vez"}
                                value={exerciseData[actualExercise.exerciseId]?.weight || ""}
                                onChange={(e) =>
                                    handleInputChange("weight", e.target.value === "" ? "" : parseFloat(e.target.value))
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl">Notas</p>
                            <textarea
                                className="border rounded p-2 w-3/4"
                                rows="3"
                                placeholder="Aún no tienes notas en este ejercicio..."
                                value={exerciseData[actualExercise.exerciseId]?.notes ?? actualExercise.notes ?? ""}
                                onChange={(e) =>
                                    handleInputChange("notes", e.target.value)
                                }
                            />
                        </div>

                        <div className="flex justify-center items-center mt-8">
                            {actualExerciseIndex > 0 && (
                                <button
                                    className="px-6 py-1 rounded bg-gradient-to-r from-blue-950 via-gray-600 to-red-800"
                                    onClick={handleFinishWorkout}
                                >
                                    Terminar entrenamiento
                                </button>
                            )}
                            {actualExerciseIndex < todayExercises.exercises.length - 1 && (
                                <button
                                    className={`px-8 py-1 rounded bg-gradient-to-r from-red-800 via-gray-600 to-blue-950 ${actualExerciseIndex > 0 ? 'ml-6' : ''}`}
                                    onClick={handleNextExercise}
                                >
                                    Siguiente ejercicio
                                </button>
                            )}
                        </div>
                        {actualExerciseIndex === 0 && (
                            <button
                                className="bg-gradient-to-t from-blue-950 via-gray-600 to-red-800 px-4 py-1 rounded"
                                onClick={handleChangeDayClick}
                            >
                                Cambiar día de rutina
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>No hay ejercicios para hoy</p>
            )}

            {showSelector && (
                <RoutineDaySelectorModal
                    onSelect={handleSelectDay}
                    onCancel={() => setShowSelector(false)}
                />
            )}
        </div>
    );
}
