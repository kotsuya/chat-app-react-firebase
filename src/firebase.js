import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwLg9gOOMqWpH7Lxzzc_C3Af8V-HNBAQs",
  authDomain: "chat-app-react-firebase-566ec.firebaseapp.com",
  projectId: "chat-app-react-firebase-566ec",
  storageBucket: "chat-app-react-firebase-566ec.appspot.com",
  messagingSenderId: "164587804154",
  appId: "1:164587804154:web:4a94f93b5585407ea74043"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();