export default function (type, message) {
    if (type == 'success') {
        showInfo(message);
    } else {
        showError(message);
    }
};

const showInfo = function (message) {
    const infoBox = document.querySelector('#successBox');
    infoBox.textContent = message;
    infoBox.parentElement.classList.remove('hide');
    setTimeout(() => infoBox.parentElement.classList.add('hide'), 3000);
};

const showError = function (message) {
    const errorBox = document.querySelector('#errorBox');
    errorBox.textContent = message;
    errorBox.parentElement.classList.remove('hide');
    setTimeout(() => errorBox.parentElement.classList.add('hide'), 3000);
};