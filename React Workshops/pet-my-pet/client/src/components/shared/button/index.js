import styled from "styled-components";

const StyledButton = styled.button`
    display: block;
    padding: 10px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    background: cadetblue;
    color: rgb(255, 255, 255);
    border: none;
    font-size: 16px;

    &:hover {
        background: rgb(248, 215, 107);
        color: rgb(0, 0, 0);
        font-weight: bold;
    }
`;

const Button = ({ children, onClickHandler, type }) => {
    return (
        <StyledButton onClick={onClickHandler} type={type}>
            {children}
        </StyledButton>
    );
}

export default Button;