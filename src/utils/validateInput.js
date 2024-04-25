const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/;
    return regex.test(email) && email.trim().length > 0;
};

const validatePassword = (password) => {
    return password.length >= 8 && password.trim().length > 0;
};

const validatePhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const regex = /^[0-9]{10}$/;
    return regex.test(cleanedPhoneNumber);
};

export { validateEmail, validatePassword, validatePhoneNumber };