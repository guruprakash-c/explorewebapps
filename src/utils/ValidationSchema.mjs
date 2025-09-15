export const UserValidationSchema = {
    userName: {
        in:['body'],
        isLength: {
            options: {
                min: 3,
                max: 10,
            },
            errorMessage: "Username must be 3-10 characters"
        },
        notEmpty: {
            errorMessage: "Username is required!"
        },
        isString: {
            errorMessage: "Username must be a string!"
        }
    },
    displayName: {
        in:['body'],
        notEmpty: true
    }
};