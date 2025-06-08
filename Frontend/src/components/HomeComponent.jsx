import { useNavigate } from "react-router";

function HomeComponent() {
    const navigate = useNavigate();

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
            <h1 className="text-4xl font-bold mb-12">Bienvenido</h1>
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