import styled from 'styled-components';
import LogoutButton from '../../../../buttons/logout-button';

const StyledNavbarSecondBarLogged = styled.div`
    & li {
        margin: 4px;
    }
`;

const NavbarSecondBarLogged = ({ username }) => {
    return (
        <StyledNavbarSecondBarLogged>
            <ul>
                <li>Welcome, {username}!</li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </StyledNavbarSecondBarLogged>
    );
}

export default NavbarSecondBarLogged;