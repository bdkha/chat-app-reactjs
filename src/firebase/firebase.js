// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDp7hoLLRgTN97575mn2IicsWjNXQ0zep8",
    authDomain: "chat-web-15143.firebaseapp.com",
    projectId: "chat-web-15143",
    storageBucket: "chat-web-15143.appspot.com",
    messagingSenderId: "306925361629",
    appId: "1:306925361629:web:e198b9b1887f644476fe34",
    measurementId: "G-7JTQCNKB2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };
