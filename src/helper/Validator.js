export class Validator {
    static emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static numberExpression = /^\d+$/;

    static validateEmail = (email) => {
        if (email) {
            return this.emailExpression.test(email);
        }
        return false;
    }

    static validateNumber = (value) => {
        return this.numberExpression.test(value);
    }
}