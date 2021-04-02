const validator = (() => {
    const registerData = function (userData) {
        const { email, password, repeatPassword } = userData;
        let isValid = true;

        if (!email || !password || !repeatPassword) {
            isValid = false;
        }

        if (password != repeatPassword) {
            isValid = false;
        }

        if (password.length < 6) {
            isValid = false;
        }

        return isValid;
    }

    const loginData = function (userData) {
        const { email, password } = userData;
        let isValid = true;

        if (!email || !password) {
            isValid = false;
        }

        return isValid;
    };

    const shoeData = function (data) {
        const { name, price, imageUrl, description, brand } = data;

        let isValid = true;

        if (!name ||
            !price ||
            !imageUrl ||
            !description ||
            !brand) { return false; }

        return isValid;
    };

    return {
        registerData,
        loginData,
        shoeData
    };
})();

export default validator;