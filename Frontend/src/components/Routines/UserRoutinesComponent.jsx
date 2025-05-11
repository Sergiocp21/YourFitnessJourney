import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import RoutineList from './RoutineListComponent';
import { getUserRoutines, deleteRoutine, setRoutineAsActive } from "../../api";

const UserRoutinesComponent = ({ goBack, setView, setEditingRoutine }) => {


    const [routines, setRoutines] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        getUserRoutines(jwt).then(response => {
            if (Array.isArray(response)) {
                setRoutines(response);
            }
            else {
                setRoutines([]);
            }

        });
    }, []);

    function handleDeleteRoutine(routine) {
        const jwt = localStorage.getItem('jwt');
        deleteRoutine(routine.routineId, jwt)
            .then(() => {
                setRoutines((prevRoutines) => {
                    const updatedRoutines = prevRoutines.filter((r) => r.routineId !== routine.routineId);
                    return [...updatedRoutines];
                });
            })
            .catch((error) => {
                console.error("Error deleting routine:", error);
                alert("No se pudo borrar la rutina. Inténtalo de nuevo.");
            });
    }

    function handleUseRoutine(routine) {
        const jwt = localStorage.getItem('jwt');
        setRoutineAsActive(routine.routineId, jwt).then(() => {
            setRoutines((prevRoutines) => prevRoutines.filter((r) => r.routineId !== routine.routineId));
            navigate("/calendar");
        });
    }

    function handleEditRoutine(routine) {
        setEditingRoutine(routine);
        setView("edit");
    }


    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tus rutinas</h2>
            <RoutineList routines={routines} type="user" onDelete={(routine) => handleDeleteRoutine(routine)} onUse={(routine) => handleUseRoutine(routine)} onEdit={(routine) => handleEditRoutine(routine)} />
            <button className="btn mt-4" onClick={goBack}>Volver al menú</button>
        </div>
    );

}
export default UserRoutinesComponent;