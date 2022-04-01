import { Component } from "react";

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
                <section className="custom-error">
                    <h2>Error!</h2>
                    <p>There was a problem with your request, please try again later.</p>
                </section>
            );
        }

        return this.props.children;
    }
}
