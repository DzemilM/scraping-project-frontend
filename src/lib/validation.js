// Validation rules for the sign-in form.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
    const trimmedVal = value.trim();

    if (trimmedVal.length === 0) {
        return "Email is required";
    } else if (!EMAIL_PATTERN.test(trimmedVal)) {
        return "Invalid email";
    } else {
        return "";
    }
}

export function validatePassword(value) {
    if (value.length === 0) {
        return "Password is required";
    } else if (value.length < 8) {
        return "Password needs to have at least 8 characters";
    } else {
        return "";
    }
}
