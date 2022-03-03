const apiService = () => {
    const baseUrl = "http://localhost:5000";
    
    const get = (path) =>  {
        return fetch(`${baseUrl}/${path}`);
    }

    return { get };
};

export default apiService();