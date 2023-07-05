// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPZy8gm_4wVW4JlX7SNJX7aM-JtSvjulU",
  authDomain: "chat-f585f.firebaseapp.com",
  projectId: "chat-f585f",
  storageBucket: "chat-f585f.appspot.com",
  messagingSenderId: "631767237394",
  appId: "1:631767237394:web:45e740c104f7632e2d69cb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
