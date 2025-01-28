import { Helper } from './Helper';

// Validator class provides methods to validate different types of input.

export class Validator {
    // Regular expression to validate email addresses.
    static emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regular expression to validate names with allowed special characters.
    static nameExpression = /^[a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/;
    // Regular expression to validate numerical values.
    static numberExpression = /^\d+$/;

    // Check for at least 8 characters, one uppercase letter, one number, and one special character
    static passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Message to be shown for invalid username input.
    static userNameMsg = 'Username must be between 3 and 20 characters long and can only contain letters, numbers, underscores, dots, and hyphens.';

    // Validate if the provided email matches the email regular expression.
    static validateEmail = (email) => {
        if (email) {
            return this.emailExpression.test(email);
        }
        return false;
    };

    // Validate if the provided password matches the password regular expression.
    static validatePassword = (password) => {
        if (password) {
          return this.passwordRegex.test(password);
        }
        return false;
    };

    // Validate if the provided name matches the name regular expression.
    static validateName = (name) => {
        if (name) {
            return this.nameExpression.test(name);
        }
        return false;
    };

    // Validate if the provided mobile number matches the number regular expression.
    static validateMobileNumber = (mobile) => {
        return this.numberExpression.test(mobile);
    };

    // Check if the length of the mobile number is exactly 10 characters.
    static validateMobileNumberLength = (mobile)=> {
        return String(mobile)?.length === 10;
    };

    // Validate if the provided value matches the number regular expression for zip codes.
    static validateZipCode = (value) => {
        return this.numberExpression.test(value);
    };

    // Check if the length of the zip code is exactly 5 characters.
    static validateZipCodeLength = (value) => {
        return value?.length === 5;
    };

    // Validate if the provided username meets the required format and constraints.
    static validateUserName = (username) => {
        const regex = /^[a-zA-Z0-9._!@#$%^&*()-+=]{3,20}$/;
        const dots = /^[.]+$/;

        if (regex?.test(username)) {
            if (dots?.test(username)) {
                Helper.showAlertMessage(this.userNameMsg);
                return false;
            }
            return true;
        }
        Helper.showAlertMessage(this.userNameMsg);
        return false;
    };

    // Check if the provided URL starts with 'http'.
    static isValidURL(url) {
        return String(url).startsWith('http');
        //const regex = /^(https?:\/\/)?([\w\d\-_]+\.)+[\w]{2,}(\/[\w\d\-_\.~+/?#=&]*)*$/;
        //return regex.test(url);
    }
}
