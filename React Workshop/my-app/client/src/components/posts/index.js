import React from 'react';


import styles from "./index.module.css";
import postService from '../../utils/postService';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    
    async componentDidMount() {
        let res = await postService.getAllPosts();
        this.setState(res);
    }

    // const renderPosts = () => {
    //     return this.state.posts
    //         .map(p => {
    //             <
    //         })
    // }
    
    render() { 
        return (
            <section className={styles.posts}>
                hi
            </section>
        );
    }
}
 
export default Posts;
