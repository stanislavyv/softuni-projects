import React from 'react';
import Link from '../link';

import styles from './index.module.css';
import image from '../images/blue-origami-bird-flipped.png'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-list-container']}>
                <ul className={styles['footer-list']}>
                    <Link type="footer" title="Going to 1" />
                    <Link type="footer" title="Going to 2" />
                    <Link type="footer" title="Going to 3" />
                    <Link type="footer" title="Going to 4" />
                    <Link type="footer" title="Going to 5" />
                    <Link type="footer" title="Going to 6" />
                    <Link type="footer" title="Going to 7" />
                    <Link type="footer" title="Going to 8" />
                    <Link type="footer" title="Going to 9" />
                    <Link type="footer" title="Going to 10" />
                    <Link type="footer" title="Going to 11" />
                </ul>
                <p className={styles['footer-copy']}>Software University &copy; 2022</p>
            </div>
            <div className={styles['post-img-container']}>
                <img src={image} alt="" className={styles['post-img']}></img>
            </div>
        </footer>
    );
}

export default Footer;