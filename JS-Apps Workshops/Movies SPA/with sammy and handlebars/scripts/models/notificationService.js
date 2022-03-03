const notificationService = (() => {
    const showInfo = function (message) {
        const infoBox = $('#successBox');
        infoBox.text(message);
        infoBox.parent().show();
        setTimeout(() => infoBox.parent().fadeOut(), 3000);
    }

    const showError = function (message) {
        const errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.parent().show();
        setTimeout(() => errorBox.parent().fadeOut(), 3000);
    }

    return {
        showInfo,
        showError
    };
})()

export default notificationService;