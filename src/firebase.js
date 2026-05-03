import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDGnXf6DpcPRSIXw9DPvNe_2jYcFw9OU4",
  authDomain: "smartclinicadmin.firebaseapp.com",
  projectId: "smartclinicadmin",
  storageBucket: "smartclinicadmin.firebasestorage.app",
  messagingSenderId: "205880973763",
  appId: "1:205880973763:web:2a9aa898fd60b6d4c10576"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);