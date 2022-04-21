import styled from "styled-components";

const StyledPetInfo = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding-bottom: 16px;

    & button, & a {
        margin: 0 2px;
    }
`;

const PetInfo = ({ children }) => {
    return <StyledPetInfo>{children}</StyledPetInfo>;
}

export default PetInfo;