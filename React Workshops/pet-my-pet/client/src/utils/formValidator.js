export const isDescriptionValid = (value) => {
    return value.length >= 10;
};

export const isPetNameValid = (value) => {
    return value.length >= 2;
};

export const isPasswordValid = (value) => {
    return value.length >= 6;
};

export const isEmailValid = (value) => {
    return value.length > 10;
};