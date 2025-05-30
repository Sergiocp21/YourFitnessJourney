import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import RoutineList from './RoutineListComponent';
import { getUserRoutines, deleteRoutine, setRoutineAsActive } from "../../api";
import { useNotification } from '../Notifications/useNotification';
import { clearExerciseDataFromStorage } from '../../utils/exerciseStorage';

const UserRoutinesComponent = ({ goBack, setView, setEditingRoutine }) => {

    const { notify } = useNotification();
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
        notify("Borrando rutina...", "success", {
            requiresConfirmation: true,
            onConfirm: () => {
                deleteRoutine(routine.routineId, jwt)
                    .then(() => {
                        setRoutines((prevRoutines) => {
                            const updatedRoutines = prevRoutines.filter((r) => r.routineId !== routine.routineId);
                            return [...updatedRoutines];
                        });
                        notify("Rutina eliminada con éxito", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting routine:", error);
                        notify("No se pudo borrar la rutina. Inténtalo de nuevo.", "error");
                    });
            }
        });
    }

    function handleUseRoutine(routine) {
        const jwt = localStorage.getItem('jwt');
        notify("Cambiando rutina activa...", "success", {
            requiresConfirmation: true,
            onConfirm: () => {
                setRoutineAsActive(routine.routineId, jwt)
                    .then(() => {
                        clearExerciseDataFromStorage(); //Removes the exercise data of today training 
                        notify("Has cambiado tu rutina activa", "success");
                        navigate("/todayRoutine");
                    })
                    .catch((error) => {
                        console.error("Error setting routine as active:", error);
                        notify("No se pudo activar la rutina. Inténtalo de nuevo.", "error");
                    });
            }
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