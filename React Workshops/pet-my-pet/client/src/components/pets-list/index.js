import styled from "styled-components";

const StyledPetsList = styled.ul`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: stretch;
    margin: 20px;
`;

const PetsList = ({children}) => {
    return <StyledPetsList>{children}</StyledPetsList>;
}

export default PetsList;