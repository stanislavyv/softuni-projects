import React from 'react';
import Link from "../link";

import styles from "./index.module.css"

const Aside = () => {
        return ( 
            <aside className={styles.aside}>
                <ul>
                    <Link type="aside" title="Going to 1"></Link>
                    <Link type="aside" title="Going to 2"></Link>
                    <Link type="aside" title="Going to 3"></Link>
                    <Link type="aside" title="Going to 4"></Link>
                    <Link type="aside" title="Going to 5"></Link>
                    <Link type="aside" title="Going to 6"></Link>
                    <Link type="aside" title="Going to 7"></Link>
                    <Link type="aside" title="Going to 8"></Link>
                    <Link type="aside" title="Going to 9"></Link>
                    <Link type="aside" title="Going to 10"></Link>
                    <Link type="aside" title="Going to 11"></Link>
                </ul>
            </aside>
         );
}
 
export default Aside;
