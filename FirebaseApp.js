import firebaseConfig from "./config/firebase-keys";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const user = await createUserWithEmailAndPassword(auth, email, password);
  createUserDocumentFromAuth(user);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (
  uid
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", uid);

  // console.log(`user:${userDocRef.user.email}`);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    

    try {
      await setDoc(userDocRef, {
        
        email,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  return userDocRef;
};