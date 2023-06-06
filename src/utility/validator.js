const validator = (email, password) => {
    if (!email || !password) {
        return ("Please fill Required  fields");

    }

    if (password.length < 6) {
        return ("Password must be at least 6 characters");

    }

    if (password.length > 20) {
        return ("Password must be less than 20 characters");

    }

    if (password.search(/[a-z]/i) < 0) {
        return ("Password must contain at least one letter.");

    }

    if (password.search(/[0-9]/) < 0) {
        return ("Password must contain at least one digit.");

    }

    if (password.search(/[!@#$%^&*]/) < 0) {
        return ("Password must contain at least one special character.");

    }

    if (email.search(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        return ("Please enter a valid email address");

    }

    return null;
};

export default validator;