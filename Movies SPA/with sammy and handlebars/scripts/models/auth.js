import notificationService from "./notificationService.js";

const authService = (() => {
    const auth = firebase.auth();

    const saveSession = function (userData) {
        const loggedIn = !!userData.user.uid;
        localStorage.setItem('loggedIn', loggedIn);
        const userId = userData.user.uid;
        localStorage.setItem('userId', userId);
        const email = userData.user.email;
        localStorage.setItem('email', email);
    }

    const register = async function (userData) {
        const { email, password, repeatPassword } = userData;

        try {
            if (!email || !password || !repeatPassword) {
                throw new Error('You must fill all fields!')
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long!');
            }
            if (password != repeatPassword) {
                throw new Error('Passwords don\'t match!');
            }

            const res = await auth.createUserWithEmailAndPassword(email, password);
            saveSession(res);

            notificationService.showInfo('Successful registration!');
            return true;
        } catch (e) {
            notificationService.showError(`Registration unsuccessful - ${e.message}`);
            return false;
        }
    }

    const login = async function (userData) {
        const { email, password } = userData;

        try {
            if (!email || !password) {
                throw new Error('You must fill all fields!')
            }

            const res = await auth.signInWithEmailAndPassword(email, password);
            saveSession(res);

            notificationService.showInfo('Logged in successfully!');
            return true;
        } catch (e) {
            notificationService.showError(`There was a problem with login - ${e.message}`);
            return false;
        }
    }

    const logout = async function () {
        try {
            await auth.signOut();
            localStorage.clear();

            notificationService.showInfo('Logged out successfully!');
            return true;
        } catch (e) {
            notificationService.showError(`There was a problem with logout - ${e.message}`);
            return false;
        }
    }

    return {
        register,
        login,
        logout
    };
})()

export default authService;