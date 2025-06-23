// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add your own Firebase configuration from your Firebase project settings
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyDLlMVxX6x8TZMI-4ABj9AUc4fnxVxxZUI",
  authDomain: "yuni-ab6g7.firebaseapp.com",
  projectId: "yuni-ab6g7",
  storageBucket: "yuni-ab6g7.appspot.com",
  messagingSenderId: "910343501592",
  appId: "1:910343501592:web:2a867812149590b061906d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
