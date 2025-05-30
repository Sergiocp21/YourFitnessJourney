import { useState, useCallback } from "react";
import { NotificationContext } from "./NotificationContext";
import NotificationToast from "./NotificationToast";

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const notify = useCallback((message, type = "success", options = {}) => {
        setNotifications((prev) => [...prev, { id: crypto.randomUUID(), message, type, ...options }]);
    }, []);

    const closeNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2">
                {notifications.map((notification) => (
                    <NotificationToast
                        key={notification.id}
                        message={notification.message}
                        type={notification.type}
                        onClose={() => closeNotification(notification.id)}
                        onConfirm={notification.onConfirm}
                        requiresConfirmation={notification.requiresConfirmation}
                    />
                ))}
            </div>

        </NotificationContext.Provider >
    );
};

export default NotificationProvider;
