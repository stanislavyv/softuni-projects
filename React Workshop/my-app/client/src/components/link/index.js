import React from 'react';
import styles from './index.module.css'

const Link = (props) => {
    return (
        <li className={styles[`${props.type}-list-item`]}>
            <a href='#' className={styles[`${props.type}-list-item-link`]}>{props.title}</a>
        </li> );
}
 
export default Link;