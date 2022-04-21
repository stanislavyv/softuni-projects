import styled from "styled-components";

const StyledNavbar = styled.nav`
    letter-spacing: 1px;
    background: #234465;
    padding: 13px 16px;
    color: white;
`;

const Navbar = ({ children }) => {
    return <StyledNavbar>{children}</StyledNavbar>;
}

export default Navbar;