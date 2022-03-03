import React from "react";
import Link from "../link";

import styles from "./index.module.css"
import srcImage from "../images/white-origami-bird.png"

class Navigation extends React.Component {
    render() {
        return <nav className={styles.navigation}>
            <img src={srcImage} alt=""></img>
            <ul className={styles["navigation-list"]}>
                <Link type="navigation" title="Going to 1"/>
                <Link type="navigation" title="Going to 2"/>
                <Link type="navigation" title="Going to 3"/>
                <Link type="navigation" title="Going to 4"/>
                <Link type="navigation" title="Going to 5"/>
                <Link type="navigation" title="Going to 6"/>
                <Link type="navigation" title="Going to 7"/>
                <Link type="navigation" title="Going to 8"/>
                <Link type="navigation" title="Going to 9"/>
                <Link type="navigation" title="Going to 10"/>
                <Link type="navigation" title="Going to 11"/>
            </ul>
        </nav>
    }
}

export default Navigation;