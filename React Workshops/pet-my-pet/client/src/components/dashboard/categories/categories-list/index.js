import styled from "styled-components";

const StyledCategoriesList = styled.ul`
    display: flex;

    & li {
        margin: 0 8px;
    }
`;

const CategoriesList = ({ children }) => {
    return <StyledCategoriesList>{children}</StyledCategoriesList>;
}

export default CategoriesList;