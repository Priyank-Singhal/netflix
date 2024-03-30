// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJL6J_RX7uTN8N8zN2Wy5x2e1inPBpvnk",
  authDomain: "netflixgpt-4b612.firebaseapp.com",
  projectId: "netflixgpt-4b612",
  storageBucket: "netflixgpt-4b612.appspot.com",
  messagingSenderId: "390679562344",
  appId: "1:390679562344:web:6a234f1fb0377c980b13dd",
  measurementId: "G-812EZWVH8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();