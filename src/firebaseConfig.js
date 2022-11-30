import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9PlLK4jp29m2ebSXQS2hYK-DFDUH2eSE",
  authDomain: "emp-registration-fdc1f.firebaseapp.com",
  projectId: "emp-registration-fdc1f",
  storageBucket: "emp-registration-fdc1f.appspot.com",
  messagingSenderId: "558690014229",
  appId: "1:558690014229:web:1a65977369d16bb4d22a1c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
