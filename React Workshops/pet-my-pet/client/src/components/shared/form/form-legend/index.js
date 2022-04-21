import styled from "styled-components";

const StyledFormLegend = styled.legend`
    position: absolute;
    left: -1px;
    top: -21px;
    border: 1px solid #666;
    background: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.1);
    width: 30%;
    padding: 8px 16px;
`;

const FormLegend = ({children}) => {
    return <StyledFormLegend>{children}</StyledFormLegend>
}

export default FormLegend;