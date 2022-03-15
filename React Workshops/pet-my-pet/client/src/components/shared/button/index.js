const Button = ({text, onClickHandler}) => {
    return (
        <a href="#"
            ><button className="button" onClick={onClickHandler}>
                <i className="fas fa-heart"></i> {text}
            </button></a
        >
    );
}

export default Button;