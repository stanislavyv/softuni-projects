const InfoNotification = ({ message }) => {
    return (
        <div id="infoBox" className="notification">
            <span>Info: {message}</span>

            <style jsx>{`
                .notification {
                    font-size: 1.5em;
                    color: red;
                    text-align: right;
                }

                .notification>span {
                    display: inline-block;
                    padding:  0.5em 2em 0.5em 2em;
                    border-radius: 10px;
                }

                #infoBox>span {
                    background: #393;
                }
            `}
            </style>
        </div>
    );
};

export default InfoNotification;
