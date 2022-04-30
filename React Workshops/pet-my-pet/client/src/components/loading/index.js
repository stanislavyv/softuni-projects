import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const StyledLoading = styled.div`
    position: absolute;
    backdrop-filter: blur(7px);
    width: 100vw;
    height: 2500px;
`;

const Loading = () => {
    const { loading } = useAuth();
    
    return (
        <>
            {loading ? <StyledLoading /> : null}
        </>
    );
}

export default Loading;