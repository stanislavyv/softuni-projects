import React from 'react';

import image from "../images/blue-origami-bird.png";
import styles from "./index.module.css";

const Post = ( {author, content} ) => {
    return (
        <article className={styles.post}>
            <img src={image} alt="" className={styles['post-img']}></img>
            <p className={styles['post-description']}>{content}</p>

            <div className={styles['post-author-container']}>
                <span className={styles['post-author']}>
                    <small>Author: </small>
                    {author}
                </span>
            </div>
        </article>
    );
};

export default Post;