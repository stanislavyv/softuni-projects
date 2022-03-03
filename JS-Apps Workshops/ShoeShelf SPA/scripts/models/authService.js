import validator from "./validationService.js"

const authService = (() => {
    const auth = firebase.auth();

    const saveSession = function (data) {
        const email = data.user.email;
        localStorage.setItem('email', email);
        const userId = data.user.uid;
        localStorage.setItem('userId', userId);
    }

    const register = async function (userData) {
        const { email, password } = userData;

        if (!validator.registerData(userData)) { return false; }

        const res = await auth.createUserWithEmailAndPassword(email, password);
        saveSession(res);

        return res;
    };

    const login = async function (userData) {
        const { email, password } = userData;

        try {
            if (!validator.loginData(userData)) { throw new Error(); }

            const res = await auth.signInWithEmailAndPassword(email, password);
            saveSession(res);
            
            return res;
        } catch {
            return false;
        }
    };

    const logout = async function () {
        auth.signOut();
        localStorage.clear();
    };

    const clearInput = function () {
        $('#root').find('input').val('');
    }

    return {
        register,
        login,
        logout,
        clearInput
    };
})();

export default authService;