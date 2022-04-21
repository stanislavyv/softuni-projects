import styled from "styled-components";

import { useAuthContext } from "../../../../contexts/AuthContext";

import { Link } from "react-router-dom";
import StyledLink from "../../../shared/link";

const StyledNavbarFirstBar = styled.div`
    display: flex;
    align-items: center;

    & a {
        margin: 4px;
    }
`;

const NavbarFirstBar = () => {
    const { isLoggedIn } = useAuthContext();
    
    return (
        <StyledNavbarFirstBar>
            <Link to="/pets">Dashboard</Link>
            {isLoggedIn &&
                <>
                    <StyledLink to="/my-pets">My Pets</  StyledLink>
                    <StyledLink to="/pets/create">Add Pet</   StyledLink>
                </>
            }
        </StyledNavbarFirstBar>
    );
}

export default NavbarFirstBar;