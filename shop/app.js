// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

//Call elements
const createUserForm = document.getElementById("createUserForm");
const loginForm = document.getElementById("loginForm");

//Button
createUserForm.addEventListener("submit", ev =>{
  ev.preventDefault();
  const name = createUserForm.name.value;
  const email = createUserForm.email.value;
  const password = createUserForm.password.value;
  createUser(name, email, password);
});

 async function createUser(name, email, password) {ç
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);

    if (e.code = "auth/weak-password") {
      alert("Tu contraseña debe tener más de 6 caracteres"); 
    }

    if (e.code = "auth/email-already-in-use") {
      alert("Este correo ya está en uso");
    }
  }
 }

 loginForm.addEventListener("sumbit", ev =>{
   ev.preventDefault();
   const email = loginForm.email.value;
   const password = loginForm.password.value;
   login(email, password);

 });

 function login(email, password) {
   try {
     await signInWithEmailAndPassword(auth, email, password);
   } catch (e) {
    console.log(e);
     alert("Contraseña o correo inválida");
   }
 }


 