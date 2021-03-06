// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDceSUOyydDIZvwKKWO189W_HaCHaN1Utw",
    authDomain: "web-charlotte-shop.firebaseapp.com",
    projectId: "web-charlotte-shop",
    storageBucket: "web-charlotte-shop.appspot.com",
    messagingSenderId: "726419666073",
    appId: "1:726419666073:web:f982b8c85cbfc136cf7408"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    auth,
    db,
    storage
}