import { useState } from "react";
import UserRoutinesComponent from "./UserRoutinesComponent";
import PredefinedRoutinesComponent from "./PredefinedRoutinesComponent";
import PublicRoutinesComponent from "./PublicRoutinesComponent";
import CreateRoutineComponent from "./CreateOrEditRoutine/CreateRoutineComponent";
function HomeRoutines() {

    const [view, setView] = useState('menu');
    const [editingRoutine, setEditingRoutine] = useState(null);


    const goBack = () => setView('menu');

    const renderContent = () => {
        switch (view) {
            case 'my':
                return (
                    <UserRoutinesComponent
                        goBack={goBack}
                        setView={setView}
                        setEditingRoutine={setEditingRoutine}
                    />
                );

            case 'predefined':
                return <PredefinedRoutinesComponent goBack={goBack} />;
            case 'public':
                return <PublicRoutinesComponent goBack={goBack} setView={setView} />;
            case 'create':
                return <CreateRoutineComponent goBack={goBack} setView={setView} />;
            case 'edit':
                return <CreateRoutineComponent initialRoutine={editingRoutine} goBack={goBack} setView={setView} />;
            default:
                return (
                    <div className="flex flex-col items-center gap-4 overflow-hidden w-full">
                        <h2 className="text-xl font-bold mb-4">Selecciona una categoría de rutinas</h2>
                        <button className="px-4 py-2 button" onClick={() => setView('my')}>Tus rutinas</button>
                        <button className="px-4 py-2 button" onClick={() => setView('predefined')}>Predefinidas</button>
                        <button className="px-4 py-2 button" onClick={() => setView('public')}>Rutinas públicas</button>
                        <button className="px-4 py-2 button" onClick={() => setView('create')}>Crear rutina</button>
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