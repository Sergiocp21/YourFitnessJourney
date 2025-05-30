import { useEffect } from "react";
import RoutineDaySelector from "./RoutineDaySelector";

const RoutineDaySelectorModal = ({ onSelect, onClose }) => {
    // Bloquear el scroll de fondo
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]"
            onClick={onClose} // Permitir cerrar haciendo click fuera
        >
            <div
                className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6 relative"
                onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-lg font-bold"
                >
                    ✕
                </button>
                <h3 className="text-xl font-bold mb-4 text-center">Cambiar día de entrenamiento</h3>
                <RoutineDaySelector onSelect={onSelect} onCancel={onClose} />
            </div>
        </div>
    );
};

export default RoutineDaySelectorModal;
