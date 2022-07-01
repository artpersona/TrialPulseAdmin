import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyD5ntqEZWNgjbZRmlwa41uujGv6zV3m5eY",
  authDomain: "trialpulse-22015.firebaseapp.com",
  projectId: "trialpulse-22015",
  storageBucket: "trialpulse-22015.appspot.com",
  messagingSenderId: "483603346235",
  appId: "1:483603346235:web:617a588994a0511529fd1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();
