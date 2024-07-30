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
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
const storage = getStorage();
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

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          isVerified: true,
          isFormSubmitted: false,
        });
      }
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        isVerified: false,
        isFormSubmitted: false,
      });
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
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists()) {
        await signOut(auth);
        throw new Error("auth/operation-not-allowed");
      }
      if (userDoc.data().isVerified === false) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          isVerified: true,
          isFormSubmitted: false,
        });
      }
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    }
  };

  const resetPassword = async (email) => {
    try {
      const userSnapshot = await getDocs(collection(db, "users"));
      const userData = userSnapshot.docs
        .map((doc) => doc.data())
        .find((user) => user.email === email);
      if (!userData) {
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

  const saveFormResponse = async (userId, formResponse) => {
    const responseRef = doc(
      db,
      `users/${userId}/formresponse`,
      `${new Date().toISOString()}`,
    );
    await setDoc(responseRef, formResponse);
  };

  const markFormAsSubmitted = async (userId) => {
    const userRef = doc(db, `users/${userId}`);
    await updateDoc(userRef, {
      isFormSubmitted: true,
    });
  };

  const uploadFile = async (file) => {
    const fileRef = ref(storage, `uploads/${user.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
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
        saveFormResponse,
        markFormAsSubmitted,
        uploadFile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
