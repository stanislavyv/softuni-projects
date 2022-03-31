import { useEffect, useState } from "react";

const Button = ({text, onClickHandler}) => {
    const [buttonText, setButtonText] = useState(text);
    
    useEffect(() => {
        setButtonText(text);
    }, [text]);

    return (
        <button className="button" onClick={onClickHandler}>
            <i className="fas fa-heart"></i> {buttonText}
        </button>
    );
}

export default Button;