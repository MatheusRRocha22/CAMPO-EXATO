import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCrpcsNQv05lzbuzuJ4jHCZJj-Ibmf6HKQ",
  authDomain: "campo-exato.firebaseapp.com",
  projectId: "campo-exato",
  storageBucket: "campo-exato.firebasestorage.app",
  messagingSenderId: "996465101612",
  appId: "1:996465101612:web:5124f8a22c70b1d0187a89",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
