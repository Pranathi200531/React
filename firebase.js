import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./src/firebaseConfig";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const adminDb = getFirestore(app);
const userDb = getFirestore(app);

// Initialize Firebase Auth
const userAuth = getAuth(app);

export { adminDb, userDb, userAuth };
