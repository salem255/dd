import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnBSOnzoYVcd2ElqiNRuMfjrHCyOfozJA",
  authDomain: "dumbs-a44d4.firebaseapp.com",
  projectId: "dumbs-a44d4",
  storageBucket: "dumbs-a44d4.firebasestorage.app",
  messagingSenderId: "513606341460",
  appId: "1:513606341460:web:08d7a5da49eecdad6b6ec1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
