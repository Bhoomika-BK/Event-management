// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBY4ti9KaI_UjhHD3gQtdid4bpwEGO-a0s",
  authDomain: "event-management-9a012.firebaseapp.com",
  projectId: "event-management-9a012",
  storageBucket: "event-management-9a012.appspot.com",
  messagingSenderId: "92574878430",
  appId: "1:92574878430:web:1764a246fc9cf4109cd04f",
  measurementId: "G-B5DBRR4TLH",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
