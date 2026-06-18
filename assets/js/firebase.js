// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnBSOnzoYVcd2ElqiNRuMfjrHCyOfozJA",
  authDomain: "dumbs-a44d4.firebaseapp.com",
  projectId: "dumbs-a44d4",
  storageBucket: "dumbs-a44d4.firebasestorage.app",
  messagingSenderId: "513606341460",
  appId: "1:513606341460:web:08d7a5da49eecdad6b6ec1",
  measurementId: "G-8ES63KLZQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);