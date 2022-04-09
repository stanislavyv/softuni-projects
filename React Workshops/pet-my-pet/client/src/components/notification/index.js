import useNotificationContext from "../../hooks/useNotificationContext";

import InfoNotification from "./info-notification";
import ErrorNotification from "./error-notification";

const Notification = () => {
  const { notification } = useNotificationContext();

  return (
    <div id="notifications">
      {notification.isActive &&
        (notification.type === "info" ? (
          <InfoNotification message={notification.message} />
        ) : (
          <ErrorNotification message={notification.message} />
        ))}

      <style jsx>{`
        #notifications {
          float: right;
          position: absolute;
          top: 50px;
          right: 0;
          text-align: center;
          margin: 1em;
        }
      `}</style>
    </div>
  );
};

export default Notification;
