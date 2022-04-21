import styled from "styled-components";

const StyledAuthFieldInputWrapper = styled.span`
    display: flex;
    position: relative;
    align-items: center;

    && input {
        background: transparent;
        border: none;
        z-index: 2;
        order: 2;
    }

    & .fas {
        z-index: 2;
        position: relative;
        padding: 0 0 0 0.8rem;
        font-size: 0.9em;
        order: 1;
    }

    & .actions {
        display: block;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 6px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }

    & input:focus + .actions, 
    & input:focus + .fas + .actions {
        border-color: #090;
    }

    & input:focus + .fas {
        color: #090;
    }
`;

const AuthFieldInputWrapper = ({ children }) => {
    return (
        <StyledAuthFieldInputWrapper>
            {children}
            <span className="actions"></span>
        </StyledAuthFieldInputWrapper>
    );
}

export default AuthFieldInputWrapper;