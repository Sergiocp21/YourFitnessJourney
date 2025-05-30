import { useEffect, useState } from "react";
import { getActiveRoutineDays } from "../../api";

const RoutineDaySelector = ({ onSelect, onCancel }) => {
    const token = localStorage.getItem("jwt");
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDays = async () => {
            try {
                const data = await getActiveRoutineDays(token);
                setDays(data);
            } catch (err) {
                console.error("Error cargando los días de la rutina activa:", err);
                setError("No se pudieron cargar los días.");
            } finally {
                setLoading(false);
            }
        };
        fetchDays();
    }, [token]);

    if (loading) return <p className="text-center">Cargando días...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    if (!Array.isArray(days) || days.length === 0) {
        return <p className="text-center">No hay días disponibles.</p>;
    }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-center">Selecciona un día</h2>

            {days.map((day) => (
                <div
                    key={day.id}
                    className="p-3 bg-gray-800 text-white rounded shadow"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Día {day.order}: {day.name}</p>
                            <ul className="list-disc ml-5 mt-2">
                                {Array.isArray(day.exercises) && day.exercises.map((ex, i) => (
                                    <li key={i}>{ex.name} - {ex.sets} series</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => onSelect(day.order)}
                            className="ml-4 px-3 py-1 bg-red-800 hover:bg-blue-700 rounded cursor-pointer"
                        >
                            Hacer entrenamiento
                        </button>
                    </div>
                </div>
            ))}

            <div className="text-center">
                <button onClick={onCancel} className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white">
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default RoutineDaySelector;
