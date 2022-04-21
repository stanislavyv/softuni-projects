import styled from "styled-components";

const StyledFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    border: 1px solid #666;
    background: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.1);
    padding: 40px 32px 16px 32px;
    position: relative;

    & button {
        margin-top: 8px;
        align-self: center;
    }
`;

const Fieldset = ({ children }) => {
    return <StyledFieldset>{children}</StyledFieldset>;
}

export default Fieldset;