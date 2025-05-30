import { useEffect, useState, useCallback } from "react";

const NotificationToast = ({
    message,
    onClose,
    onConfirm,
    requiresConfirmation = false,
    type
}) => {
    const [progress, setProgress] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const startClosing = useCallback((shouldConfirm = false) => {
        setIsClosing(true);

        setTimeout(() => {
            if (shouldConfirm && onConfirm) {
                onConfirm();
            }
            onClose();
        }, 300);
    }, [onClose, onConfirm]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    startClosing(true); // ✅ confirmamos al cerrar
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        setIntervalId(interval);

        return () => clearInterval(interval);
    }, [startClosing]);

    const handleCancel = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        startClosing(false);
    };

    return (
        <div
            className={`w-80 sm:w-96 md:w-[28rem] 
    p-4 mb-4 text-white rounded-lg shadow-lg border-l-4 
    
    ${isClosing ? "animate-fade-out-up" : "animate-fade-in-down"}
    ${type === "success" ? "bg-gradient-to-b from-green-600 via-gray-900 to-black border-black" : type === "error" ? "border-red-800 bg-red-600" : "border-yellow-500 bg-yellow-600"}`}
        >
            {/* Mensaje + Botón cerrar + Botón cancelar (cuando se requiere) */}
            <div className="flex flex-wrap items-center justify-between w-full gap-2">
                <p className="font-semibold flex-1 min-w-0 break-words">{message}</p>

                {requiresConfirmation && (
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                )}

                {!requiresConfirmation && (
                    <button
                        onClick={() => {
                            if (intervalId) clearInterval(intervalId);
                            startClosing(false);
                        }}
                        className="text-white font-bold hover:text-gray-200 self-start"
                    >
                        ×
                    </button>
                )}

            </div>

            {/* Progress bar */}
            <div className="w-full h-1 mt-2 bg-white/30 rounded overflow-hidden">
                <div
                    className="h-full bg-white"
                    style={{ width: `${progress}%`, transition: "width 30ms linear" }}
                />
            </div>
        </div>
    );
};

export default NotificationToast;
