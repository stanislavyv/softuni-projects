import styled from "styled-components";

import { useAuth } from "../../../../contexts/AuthContext";

import NavbarSecondBarLogged from "./navbar-second-bar-logged";
import NavbarSecondBarAnon from "./navbar-second-bar-anon";

const StyledNavbarSecondBar = styled.div`
    display: flex;
    align-items: center;
`;

const NavbarSecondBar = () => {
    const { isLoggedIn, username } = useAuth();

    return (
        <StyledNavbarSecondBar>
            {isLoggedIn
                ?
                <NavbarSecondBarLogged username={username} />
                :
                <NavbarSecondBarAnon />
            }
        </StyledNavbarSecondBar>
    );
}

export default NavbarSecondBar;