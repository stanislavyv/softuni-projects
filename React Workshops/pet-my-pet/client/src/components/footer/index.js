import styled from "styled-components";

const StyledFooter = styled.footer`
    margin-top: auto;
    text-align: center;
    background: #234465;

    & p {
        padding: 16px 0;
        font-weight: bold;
        margin: 0;
        color: white;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <p>@PetMyPet</p>
        </StyledFooter>
    );
}

export default Footer;
