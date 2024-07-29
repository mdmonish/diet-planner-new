const firebaseErrorMessages = {
  "auth/email-already-in-use": "This email is already in use.",
  "auth/invalid-email": "Incorrect email/password.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect email/password.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/operation-not-allowed": "Please verify your email before logging in.",
};

export const getFirebaseErrorMessage = (errorCode) => {
  return firebaseErrorMessages[errorCode] || "An unknown error occurred.";
};
