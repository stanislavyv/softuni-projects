import React, { useState, useEffect, useMemo } from "react";

const NotificationContext = React.createContext({});

export const NotificationCtxProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: "",
    isActive: false,
    type: ""
  });

  useEffect(() => {
      if (notification.isActive) {
          const timer = setTimeout(() => {
              setNotification(oldState => ({...oldState, isActive: false}))
            }, 3000);

          return () => clearTimeout(timer);
      }
  }, [notification.isActive]);

  const changeNotification = (newState) => {
    setNotification((oldState) => ({ ...oldState, ...newState }));
  };

  const value = useMemo(
    () => ({
      notification,
      changeNotification
    }),
    [notification]
  );

  return <NotificationContext.Provider value={value} children={children} />;
};

export default NotificationContext;
