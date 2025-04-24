import { useState } from "react";
import UserRoutinesComponent from "./UserRoutinesComponent";
import PredefinedRoutinesComponent from "./PredefinedRoutinesComponent";
import GlobalRoutinesComponent from "./GlobalRoutinesComponent";
import CreateRoutineComponent from "./CreateOrEditRoutine/CreateRoutineComponent";
function HomeRoutines() {

    const [view, setView] = useState('menu');

    const goBack = () => setView('menu');

    const renderContent = () => {
        switch (view) {
            case 'my':
                return <UserRoutinesComponent goBack={goBack} />;
            case 'predefined':
                return <PredefinedRoutinesComponent goBack={goBack} />;
            case 'users':
                return <GlobalRoutinesComponent goBack={goBack} />;
            case 'create':
                return <CreateRoutineComponent goBack={goBack} />;
            default:
                return (
                    <div className="flex flex-col items-center gap-4 overflow-hidden w-full">
                        <h2 className="text-xl font-bold mb-4">Selecciona una categoría de rutinas</h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => setView('my')}>Tus rutinas</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => setView('predefined')}>Predefinidas</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => setView('users')}>De otros usuarios</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => setView('create')}>Crear rutina</button>
                    </div>
                );
        }
    };

    return (
        <div className="p-4">
            {renderContent()}
        </div>
    );

}

export default HomeRoutines;