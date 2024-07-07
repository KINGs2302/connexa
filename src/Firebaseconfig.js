// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Firebaseconfig.js
//import { getAuth } from '/node_modules/.vite/deps/firebase_auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7WC8ZDayXAglaT_pZuqqfEDVRE9CNxVQ",
  authDomain: "linkedin-clone-react-2ff88.firebaseapp.com",
  projectId: "linkedin-clone-react-2ff88",
  storageBucket: "linkedin-clone-react-2ff88.appspot.com",
  messagingSenderId: "603905674506",
  appId: "1:603905674506:web:817bbe6f83222256bbfef3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };;


