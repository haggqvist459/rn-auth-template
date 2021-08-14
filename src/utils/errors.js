//convert the error codes into message
// incompleted
const errorMessages = (error) => {
        switch (error) {
                case 'signIn-auth/wrong-password':
                        return 'Sorry, your password or email is incorrect. Please try again';
                case 'signIn-auth/invalid-email':
                        return 'Sorry, your password or email is incorrect. Please try again';
                case 'signIn-auth/user-not-found':
                        return 'Sorry, your password or email is incorrect. Please try again';
                case 'auth/email-already-in-use':
                        return 'The email you tried to use is already used by someone else. Please try again with another email address.';
                case 'auth/invalid-email':
                        return 'The email you tried to use is invalid, check your entry again.';
                default:
                        return "Error code unspecified, don't know what went wrong.. Please try again differently.";
        }
}

export default errorMessages;
