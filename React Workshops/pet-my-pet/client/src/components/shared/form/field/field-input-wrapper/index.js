import styled from "styled-components";

const StyledFieldInputWrapper = styled.span`
    display: flex;
    position: relative;
    align-items: center;
`;

const FieldInputWrapper = ({ children }) => {
    return (
        <StyledFieldInputWrapper>
            {children}
        </StyledFieldInputWrapper>
    );
}

export default FieldInputWrapper;