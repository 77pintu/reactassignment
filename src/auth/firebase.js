import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
//   getAuth,
  signInWithPopup,
//   signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBUzt_J6QKa05rXQ788RXpoUnUHqyEpR7M",
    authDomain: "authlogin-8b504.firebaseapp.com",
    projectId: "authlogin-8b504",
    storageBucket: "authlogin-8b504.appspot.com",
    messagingSenderId: "254161879102",
    appId: "1:254161879102:web:cad9e3f5781a8f61bf516f"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  export const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const usersDetailsStatus = res.user;
      await addDoc(collection(db, "users"), {
        uid: usersDetailsStatus.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  export const logout = () => {
    signOut(auth);
  };
