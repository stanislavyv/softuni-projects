import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: white;
        text-decoration: none;
        display: inline-block;
        font-weight: bold;
    }

    ul {
        padding-left: 0;
        margin: 0;
    }

    li {
        list-style-type: none;
    }

    .fa-heart {
        color: red;
        margin-right: 2px;
    }

    h1 {
        text-align: center;
    }

    h3 {
        margin-bottom: 0;
    }

    textarea {
        resize: none;
        outline: none;
    }
`;

export default GlobalStyles;