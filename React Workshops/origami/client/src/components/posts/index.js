import React from 'react';
import Post from "../post";

import styles from "./index.module.css";
import postService from '../../utils/postService';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    
    async componentDidMount() {
        let res = await postService.getAllPosts();
        this.setState( {posts: res} );
    }

    renderPosts = () => {
        return this.state.posts
            .map(p => {
                return <Post key={p.id} content={p.content} author={p.author} />
            });
    }
    
    render() { 
        return (
            <section className={styles.posts}>
                {this.renderPosts()}
            </section>
        );
    }
}
 
export default Posts;
