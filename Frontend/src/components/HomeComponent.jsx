import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getUserNameAndTodayRoutineName } from "../api";

function HomeComponent() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [todayRoutineName, setTodayRoutineName] = useState("");
    const jwt = window.localStorage.getItem("jwt"); // Retrieve the JWT token

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Pass the JWT token to the API call
                const response = await getUserNameAndTodayRoutineName(jwt);
                const { userName, todayRoutineName } = response.data;

                setUserName(userName);
                setTodayRoutineName(todayRoutineName);
            } catch (error) {
                console.error("Error al obtener datos del usuario y rutina de hoy:", error);
            }
        };

        fetchData();
    }, [jwt]); // Add jwt as a dependency to ensure it is used correctly

    function goToRoutines() {
        navigate("/routines");
    }

    function goToTodayRoutine() {
        navigate("/todayRoutine");
    }

    function goToStatistics() {
        navigate("/statistics");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Bienvenido {userName}</h1>
            <h2 className={`text-xl font-bold mb-12 text-center ${todayRoutineName ? "text-gray-500" : "text-gray-500"}`}>
                {todayRoutineName ? `Tu entrenamiento de hoy es ${todayRoutineName}` : "Aún no tienes una rutina activa. Crea una o copia una pública, actívala y comienza tu entrenamiento"}
            </h2>
            <div className="relative w-full max-w-md">
                {/* Upper buttons */}
                <div className="flex justify-between mb-8">
                    <button className="px-4 py-2 w-40 button" onClick={goToRoutines}>
                        <span>Rutinas</span>
                    </button>
                    <button className="px-4 py-2 w-40 button" onClick={goToStatistics}>
                        <span>Estadísticas</span>
                    </button>
                </div>
                {/* Lower buttons */}
                <div className="flex justify-center">
                    <button className="px-4 py-2 w-40 button" onClick={goToTodayRoutine}>
                        <span>Entrenamiento de hoy</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;