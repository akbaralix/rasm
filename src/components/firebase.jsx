// src/components/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBLwDDAlTJN22q7xPK_HqwvnL7gh6qUKYw",
  authDomain: "rasm-ee482.firebaseapp.com",
  projectId: "rasm-ee482",
  storageBucket: "rasm-ee482.firebasestorage.app",
  messagingSenderId: "471975921168",
  appId: "1:471975921168:web:50ca36a7fa103239af6c95",
  measurementId: "G-R046V5QGDE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
