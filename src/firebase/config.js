// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyHpeJeGUU8C8-kw7JWHROYLKcDX06mhs",
  authDomain: "mousproj1.firebaseapp.com",
  projectId: "mousproj1",
  storageBucket: "mousproj1.appspot.com",
  messagingSenderId: "137032010507",
  appId: "1:137032010507:web:a46a5e5e8b5d3d4fe4300e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
