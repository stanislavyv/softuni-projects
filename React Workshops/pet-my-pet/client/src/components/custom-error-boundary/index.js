import { Component } from "react";
import styled from "styled-components";

const StyledErrorBoundary = styled.section`
    width: 300px;
    margin: 0 auto;
    text-align: center;
`;

export default class CustomErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // returns new state
        return {
            hasError: true,
        };
    }

    componentDidCatch(error) {
        console.log(`Error from error boundary: ${error}`);
    }

    render() {
        if (this.state.hasError) {
            return (
                <StyledErrorBoundary>
                    <h2>Error!</h2>
                    <p>There was a problem with your request, please try again later.</p>
                </StyledErrorBoundary>
            );
        }

        return this.props.children;
    }
}
