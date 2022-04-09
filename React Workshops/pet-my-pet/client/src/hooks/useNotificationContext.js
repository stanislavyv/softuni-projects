import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const useNotificationContext = () => {
  const notificationContext = useContext(NotificationContext);

  return notificationContext;
};

export default useNotificationContext;
