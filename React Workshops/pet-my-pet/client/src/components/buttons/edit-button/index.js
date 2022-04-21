import styled from "styled-components";
import StyledLink from "../../shared/link";

const StyledEdit = styled(StyledLink)`
    padding: 9px 16px;
    && {
        margin-right: 7px;
    }
`;

const EditButton = ({ id }) => {
    return <StyledEdit to={`/pets/edit/${id}`}>Edit</StyledEdit>;
}

export default EditButton;