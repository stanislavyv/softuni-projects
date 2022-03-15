const Button = ({text, onClickHandler}) => {
    return (
        <button className="button" onClick={onClickHandler}>
            <i className="fas fa-heart"></i> {text}
        </button>
    );
}

export default Button;