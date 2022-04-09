const ErrorNotification = ({ message }) => {
    return (
        <div id="errorBox" className="notification">
            <span>Error: {message}</span>

            <style jsx>{`
                .notification {
                    font-size: 1.5em;
                    color: #ffffff;
                    text-align: right;
                }

                .notification>span {
                    display: inline-block;
                    padding:  0.5em 2em 0.5em 2em;
                    border-radius: 10px;
                }

                #errorBox>span {
                    background: #F50;
                }
            `}
            </style>
        </div>
    );
};

export default ErrorNotification;
