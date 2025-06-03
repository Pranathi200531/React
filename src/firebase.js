import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { firebaseConfig } from "./firebase";  // Removed incorrect import
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBQTHoKOQ2a4kIY4r-tjt1t4TRrFlJwRQ4",
    authDomain: "website-16b02.firebaseapp.com",
    databaseURL: "https://website-16b02-default-rtdb.firebaseio.com",
    projectId: "website-16b02",
    storageBucket: "website-16b02.firebasestorage.app",
    messagingSenderId: "67452117174",
    appId: "1:67452117174:web:d6625c9110f983e54a0617",
    measurementId: "G-7E5054G6SS"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const adminDb = getFirestore(app);
const userDb = getFirestore(app);

// Initialize Firebase Auth
const userAuth = getAuth(app);
const auth = getAuth(app);
const database = getDatabase(app);


export { adminDb, userDb, userAuth, auth, database };
