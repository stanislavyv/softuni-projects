import styled from 'styled-components';

const StyledForm = styled.form`
    margin: 80px auto;
    max-width: 500px;
`;

const Form = ({ children, onSubmitHandler }) => {
    return (
        <StyledForm onSubmit={onSubmitHandler}>
            {children}
        </StyledForm>
    );
};

export default Form;