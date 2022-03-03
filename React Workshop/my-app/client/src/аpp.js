import React from "react";

import Navigation from "./components/navigation";
import Aside from "./components/aside";
import Main from "./components/main";

import styles from "./аpp.module.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.container}>
                <Navigation />
                <Aside />
                <Main />
            </div>
        );
    };
}