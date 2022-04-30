import React, { useState, useEffect, useMemo, useContext } from "react";

const NotificationContext = React.createContext({});
NotificationContext.displayName = 'NotificationContext';

const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        type: "",
        message: "",
        isActive: false,
    });

    useEffect(() => {
        if (notification.isActive) {
            const timer = setTimeout(() => {
                setNotification(oldState => ({ ...oldState, isActive: false }))
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification.isActive]);

    const notify = (type, message) => {
        const newState = {
            type,
            message,
            isActive: true
        };

        setNotification(newState);
    };

    const notifyError = (message) => {
        notify('error', message);
    }

    const notifyInfo = (message) => {
        notify('info', message);
    }

    const value = useMemo(
        () => ({
            notification,
            notifyError,
            notifyInfo
        }),
        [notification]
    );

    return <NotificationContext.Provider value={value} children={children} />;
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;
