import React from 'react';

import image from "../images/blue-origami-bird.png";
import styles from "./index.module.css";

const Post = ( {author, description} ) => {
    return (
        <article className={styles.post}>
            <img src={image} alt=""></img>
            <p className={styles['post-description']}>{description}</p>

            <div className={styles['post-author-container']}>
                <span className={styles['post-author']}>
                    <small>Author:</small>
                    {author}
                </span>
            </div>
        </article>
    );
};

export default Post;