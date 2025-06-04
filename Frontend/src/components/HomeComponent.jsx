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
        <div>
            <h1>Bienvenido</h1>
            <div className="grid grid-cols-2 gap-4 pt-72">
                <button className="px-4 py-2 button" onClick={goToTodayRoutine}>
                    <span>Entrenamiento de hoy</span>
                </button>
                <button className="px-4 py-2 button">
                    <span>Calendario</span>
                </button>
                <button className="px-4 py-2 button" onClick={goToRoutines}>
                    <span>Rutinas</span>
                </button>
                <button className="w-full px-4 py-2 button" onClick={goToStatistics}>
                    <span className="relative z-10">Estadísticas</span>
                </button>

            </div>

        </div>
    );
}

export default HomeComponent;