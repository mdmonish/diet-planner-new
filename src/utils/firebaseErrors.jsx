export const getFirebaseErrorMessage = (code) => {
  const errorMessages = {
    "auth/email-already-in-use":
      "This email is already in use. Please login instead.",
    "auth/weak-password":
      "The password is too weak. Please use at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/operation-not-allowed": "Please verify your email before logging in.",
    "auth/wrong-password": "The password is incorrect.",
    "auth/invalid-email": "The email address is invalid.",
    "auth/network-request-failed": "Network error. Please try again.",
    default: "An unexpected error occurred. Please try again.",
  };

  return errorMessages[code] || errorMessages.default;
};
