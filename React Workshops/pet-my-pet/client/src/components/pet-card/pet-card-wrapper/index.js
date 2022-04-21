import styled from "styled-components";

const StyledWrapper = styled.section.attrs(props => ({
    size: props.otherDetails ? "420px" : "330px"
}))`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 15px;
    max-width: ${props => props.size};
    width: 100%;
    max-height: 585px;
    box-shadow: 0px 0px 12px 0 #b3b3b3;
    border-radius: 8px;

    & .pet-name {
        margin: 15px 10px 0 10px;
    }

    & .pet-category, & .pet-owner {
        margin: 9px 10px 0 10px;
    }
    
    & .pet-counter {
        margin: 9px;
    }
    
    & .pet-description {
        padding: 15px 10px;
        overflow: hidden;
        margin: 10px;
        flex-grow: 1;
    }

    & p + button {
        margin: 7px 0 15px 0;
    }

    & .bold-span {
        font-weight: bold;
    }
`;

const PetCardWrapper = ({as, children, otherDetails}) => {
    return (
        <StyledWrapper as={as ?? ''} otherDetails={otherDetails}>
            {children}
        </StyledWrapper>
    );
}

export default PetCardWrapper;