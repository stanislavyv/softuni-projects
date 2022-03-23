const InputError = ({ message }) => {
    return (
        <span>
            <span className="error">{message}</span>
            <style>{`
                    .error {
                        color: red;
                        font-weight: bold;
                        font-size: 14px;
                    }
                `}
            </style>
        </span>
    );
}

export default InputError;