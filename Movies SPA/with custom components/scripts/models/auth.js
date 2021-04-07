import notify from "./notificationService.js";
import validator from "./validationService.js";

const authService = (() => {
    const auth = firebase.auth();

    const saveSession = function (userData) {
        const loggedIn = !!userData.user.uid;
        localStorage.setItem('loggedIn', loggedIn);
        const userId = userData.user.uid;
        localStorage.setItem('userId', userId);
        const email = userData.user.email;
        localStorage.setItem('email', email);
    };

    const clearInput = function () {
        document
            .querySelectorAll('input')
            .forEach(el => el.value = '');
    };

    const register = async function (userData) {
        const { email, password } = userData;

        try {
            validator.registerData(userData);

            const res = await auth.createUserWithEmailAndPassword(email, password);
            saveSession(res);

            notify('success', 'Successful registration!');
            return true;
        } catch (e) {
            notify('error', `Registration unsuccessful - ${e.message}`);
            clearInput();
            return false;
        }
    };

    const login = async function (userData) {
        const { email, password } = userData;

        try {
            validator.loginData(userData);

            const res = await auth.signInWithEmailAndPassword(email, password);
            saveSession(res);

            notify('success', 'Logged in successfully!');
            return true;
        } catch (e) {
            notify('error', `There was a problem with login - ${e.message}`);
            clearInput();
            return false;
        }
    };

    const logout = async function () {
        try {
            await auth.signOut();
            localStorage.clear();

            notify('success', 'Logged out successfully!');
            return true;
        } catch (e) {
            notify('error', `There was a problem with logout - ${e.message}`);
            return false;
        }
    };

    const getUserData = function () {
        return {
            loggedIn: localStorage.getItem('loggedIn'),
            id: localStorage.getItem('userId'),
            email: localStorage.getItem('email')
        };
    };

    return {
        register,
        login,
        logout,
        getUserData
    };
})();

export default authService;