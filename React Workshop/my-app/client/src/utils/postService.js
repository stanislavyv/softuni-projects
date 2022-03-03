import apiService from "./apiService";

const postService = () => {
    const getAllPosts = () => {
        return apiService.get('posts')
            .then(res => res.json());
    };

    return { getAllPosts };
}

export default postService();