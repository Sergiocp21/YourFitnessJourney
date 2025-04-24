import { useState, useEffect, useRef } from "react";
import { getExercisesByMuscleGroup, getMuscleGroups } from "../../../api";

const ExerciseSelector = ({ onSelect }) => {
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [sets, setSets] = useState("");

    const scrollRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await getMuscleGroups();
                setMuscleGroups(response.data);
            } catch (error) {
                console.error("Error al obtener grupos musculares", error);
            }
        };
        fetchGroups();
    }, []);

    useEffect(() => {
        const fetchExercises = async () => {
            if (!selectedGroup) return;
            try {
                const response = await getExercisesByMuscleGroup(selectedGroup);
                setExercises(response.data);
            } catch (error) {
                console.error("Error al obtener ejercicios", error);
            }
        };
        fetchExercises();
    }, [selectedGroup]);

    useEffect(() => {
        const scrollEl = scrollRef.current;
        if (!scrollEl) return;

        updateScrollButtons();
        scrollEl.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);

        return () => {
            scrollEl.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [muscleGroups]);

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const handleAddExercise = () => {
        if (selectedExercise && sets && !isNaN(sets) && parseInt(sets) > 0) {
            // Añadir ejercicio con el número de sets
            onSelect({ ...selectedExercise, sets: parseInt(sets) });
            setSelectedExercise(null);
            setSets("");  // Limpiar el campo de sets después de añadir el ejercicio
        } else {
            // Opcional: Mostrar un mensaje si no es válido
            alert("Por favor, ingrese un número válido de sets.");
        }
    };



    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col items-center gap-4 max-w-screen overflow-hidden">
            <div className="relative w-full flex items-center">
                {/* Flecha izquierda */}
                {canScrollLeft && (
                    <button
                        onClick={scrollLeft}
                        className="z-10 p-2 rounded-full shadow-md cursor-pointer bg-white/80 hover:bg-white"
                    >
                        ◀
                    </button>
                )}

                {/* Scroll horizontal */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-2 w-full scroll-smooth scrollbar-hide justify-start"
                >
                    {muscleGroups.map((group) => (
                        <div
                            key={group}
                            onClick={() => setSelectedGroup(group)}
                            className={`whitespace-nowrap cursor-pointer py-2 px-4 border rounded ${selectedGroup === group
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                                }`}
                        >
                            {group}
                        </div>
                    ))}
                </div>

                {/* Flecha derecha */}
                {canScrollRight && (
                    <button
                        onClick={scrollRight}
                        className="z-10 p-2 rounded-full shadow-md cursor-pointer bg-white/80 hover:bg-white"
                    >
                        ▶
                    </button>
                )}
            </div>

            {selectedGroup && (
                <div className="mt-4 w-full flex flex-wrap gap-2">
                    {exercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            onClick={() => handleExerciseClick(exercise)}
                            className="cursor-pointer py-2 px-4 border rounded hover:bg-gray-300"
                        >
                            {exercise.name}
                        </div>
                    ))}
                </div>
            )}

            {selectedExercise && (
                <div className="mt-4 bg-gray-700 p-4 rounded w-full">
                    <h3 className="text-xl font-semibold">{selectedExercise.name}</h3>
                    <p className="mt-2"><strong>Descripción:</strong> {selectedExercise.description}</p>

                    {selectedExercise.image && (
                        <img
                            src={selectedExercise.image}
                            alt={selectedExercise.name}
                            className="mt-2 w-full h-auto"
                        />
                    )}

                    <div className="mt-4">
                        <label className="block text-white mb-1" htmlFor="sets">Número de sets:</label>
                        <input
                            type="number"
                            id="sets"
                            min="1"
                            className="w-full px-3 py-2 rounded bg-white text-black"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleAddExercise}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded w-full hover:bg-green-700"
                    >
                        Añadir ejercicio
                    </button>
                </div>
            )}

        </div>
    );
};

export default ExerciseSelector;
