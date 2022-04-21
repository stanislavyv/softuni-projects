import styled from "styled-components";

import StyledLink from "../../../../shared/link";

const StyledSecondBarAnon = styled.section`
    & li {
        margin: 0 4px;
    }
`;

const NavbarSecondBarAnon = () => {
    return (
        <StyledSecondBarAnon>
            <ul>
                <li>
                    <StyledLink to="/register">
                        <i className="fas fa-user-plus"></i>
                        Register
                    </StyledLink>
                </li>
                <li>
                    <StyledLink to="/login">
                        <i className="fas fa-sign-in-alt"></i>
                        Login
                    </StyledLink>
                </li>
            </ul>
        </StyledSecondBarAnon>
    );
}

export default NavbarSecondBarAnon;