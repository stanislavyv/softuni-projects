// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDix-RnvPnriYX--3B169CK1U9NYOEIMKU",
  authDomain: "pet-my-pet-92382.firebaseapp.com",
  projectId: "pet-my-pet-92382",
  storageBucket: "pet-my-pet-92382.appspot.com",
  messagingSenderId: "238265228389",
  appId: "1:238265228389:web:807684290da5bca47e7a8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;