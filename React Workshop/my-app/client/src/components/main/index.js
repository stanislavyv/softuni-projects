import React from 'react';
import Posts from '../posts';

import styles from "./index.module.css";

class Main extends React.Component {
    render() { 
        return ( 
        <main className={styles.main}>
            <h1 className={styles["main-heading"]}>Sooooooooooooome Heading</h1>
            <Posts />
        </main> );
    }
}
 
export default Main;