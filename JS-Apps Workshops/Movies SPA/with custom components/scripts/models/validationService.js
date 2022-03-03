const validator = (() => {
    const registerData = function ({ email, password, repeatPassword }) {
        if (!email || !password || !repeatPassword) {
            throw new Error('You must fill all fields!')
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long!');
        }
        if (password != repeatPassword) {
            throw new Error('Passwords don\'t match!');
        }
    };

    const loginData = function ({ email, password }) {
        if (!email || !password) {
            throw new Error('You must fill all fields!')
        }
    };

    const movieData = function ({ title, description, imageUrl }) {
        if (!title || !description || !imageUrl) {
            return false;
        }
        return true;
    };

    return {
        registerData,
        loginData,
        movieData
    }
})();

export default validator;