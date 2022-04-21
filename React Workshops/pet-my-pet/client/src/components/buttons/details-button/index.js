import styled from "styled-components";
import StyledLink from "../../shared/link";

const StyledDetails = styled(StyledLink)`
    padding: 9px 16px;
    && {
        margin-right: 7px;
    }
`;

const DetailsButton = ({ id }) => {
    return <StyledDetails to={`/pets/${id}`}>Details</StyledDetails>;
}

export default DetailsButton;