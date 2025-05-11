import { useEffect, useState } from 'react';
import RoutineList from './RoutineListComponent';
import { getPublicRoutines, copyRoutine } from '../../api';
export default function GlobalRoutinesComponent({ goBack, setView }) {

    const [routines, setRoutines] = useState([]);

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        getPublicRoutines(jwt).then(response => {
            if (Array.isArray(response)) {
                setRoutines(response);
            } else {
                setRoutines([]);
            }
        });
    }, []);


    const handleCopyRoutine = async (routine) => {
        await copyRoutine(routine, jwt);
        setView("my");
    }


    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Rutinas públicas</h2>

            <RoutineList routines={routines} type="public" onAdd={(routine) => handleCopyRoutine(routine)} />
            <button className="btn mt-4" onClick={goBack}>Volver al menú</button>
        </div>
    );
}