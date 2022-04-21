const ErrorNotification = ({ message }) => {
    return (
        <div className="notification-danger">
            <span>Error: {message}</span>
        </div>
    );
};

export default ErrorNotification;
