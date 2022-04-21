import styled from "styled-components";

import { useNotificationContext } from "../../contexts/NotificationContext";

import InfoNotification from "./info-notification";
import ErrorNotification from "./error-notification";

const StyledNotifications = styled.div`
    position: fixed;
    top: 50px;
    right: 0;

    & div {
        padding: 14px 32px;
        border-radius: 10px;
        font-size: 24px;
    }

    & .notification-info {
        background: rgb(255 245 1 / 83%);
        color: #ff3c00;
    }

    & .notification-danger {
        background: #ff1300e3;
        color: rgb(255 242 1)
    }
`;

const Notification = () => {
    const { notification } = useNotificationContext();

    return (
        <StyledNotifications>
            {notification.isActive &&
                (notification.type === "info" ? (
                    <InfoNotification message={notification.message} />
                ) : (
                    <ErrorNotification message={notification.message} />
                ))}
        </StyledNotifications>
    );
};

export default Notification;
