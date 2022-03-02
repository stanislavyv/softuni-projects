import React from "react";
import Link from "../link";

class Navigation extends React.Component {
    render() {
        return <nav>
            <ul>
                <Link key="1" title="Going to 1"/>
                <Link key="2" title="Going to 2"/>
                <Link key="3" title="Going to 3"/>
                <Link key="4" title="Going to 4"/>
                <Link key="5" title="Going to 5"/>
                <Link key="6" title="Going to 6"/>
                <Link key="7" title="Going to 7"/>
                <Link key="8" title="Going to 8"/>
                <Link key="9" title="Going to 9"/>
                <Link key="10" title="Going to 10"/>
                <Link key="11" title="Going to 11"/>
            </ul>
        </nav>
    }
}

export default Navigation;