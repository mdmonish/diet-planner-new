import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getFirebaseErrorMessage } from "./utils/firebaseErrors"; // Import the error mapping function

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBubKtu0lfWzSBt5xwNCArOGjKIxnkbsWc",
  authDomain: "nutrinuma.firebaseapp.com",
  projectId: "nutrinuma",
  storageBucket: "nutrinuma.appspot.com",
  messagingSenderId: "651443585686",
  appId: "1:651443585686:web:ed83f16df3ded392b238b7",
  measurementId: "G-5R6KHGJD2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Create context
const FirebaseContext = createContext();

// Custom hook to use Firebase
export const useFirebase = () => useContext(FirebaseContext);

// Provider component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser?.emailVerified ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const signUpWithEmail = async (email, password) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        throw new Error("auth/email-already-in-use");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      await signOut(auth); // Sign out immediately after creating the user and sending the verification email
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        throw new Error("auth/operation-not-allowed");
      }
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    }
  };

  const resetPassword = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        throw new Error("auth/user-not-found");
      }
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    }
  };

  const logout = () => signOut(auth);

  const fetchCollection = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        resetPassword,
        logout,
        fetchCollection,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
