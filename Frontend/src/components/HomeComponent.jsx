import { useNavigate } from "react-router";
function HomeComponent() {
    const navigate = useNavigate();
    function goToRoutines() {
        navigate("/routines");
    }

    return (
        <div>
            <h1>Home page</h1>
            <div className="flex flex-col items-center gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={goToRoutines}>Rutinas</button>
            </div>
        </div>
    );
}

export default HomeComponent;