import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "kiralik-sevgili",
  appId: "1:347319227483:web:a18c5cf4604280b2071b7e",
  storageBucket: "kiralik-sevgili.firebasestorage.app",
  apiKey: "AIzaSyChM5V1Y9Rd80fSk4cm2LKRg5mpXEMMaKE",
  authDomain: "kiralik-sevgili.firebaseapp.com",
  messagingSenderId: "347319227483",
  measurementId: "G-EF95QEVZF6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
