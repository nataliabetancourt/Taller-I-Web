// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { login, createUser, addUserToDatabase } from "./functions/auth";

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

//Call HTML elements
//Login form
const loginForm = document.getElementById("login");
const signupBtn = document.getElementById("signupBtn");
//Sign up form
const signupForm = document.getElementById("signup");
const loginBtn = document.getElementById("loginBtn");

//Submit button on login form
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  //Get information from inputs
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  login(auth, email, password);
});

//Open sign up form
signupBtn.addEventListener("click", e =>{
  //Hide login form and button
  loginForm.classList.add('login--hide');
  signupBtn.classList.add('registration__registration--hide');

  //Show sign up form and button
  signupForm.classList.add('signup--show');
  loginBtn.classList.remove('registration__registration--hide');
})

//Submit button on sign up form
signupForm.addEventListener("submit", e =>{
  e.preventDefault();

  //Information from inputs
  const name = signupForm.name.value;
  const lastname = signupForm.lastname.value;
  const cell = signupForm.cell.value;
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  const userInfo = {
    name,
    lastname,
    cell,
    email, 
    password, 
    isAdmin: false
  }

  //Create user and add to authentication
  const newUser = await createUser(auth, userInfo);
  //Add additional user info to database
  //await addUserToDatabase(db, newUser.uid, userInfo);
  
  alert(`Welcome, ${name}`);
})

//Open login form
loginBtn.addEventListener("click", e =>{
  //Hide sign up form and button
  signupForm.classList.remove('signup--show');
  loginBtn.classList.add('registration__registration--hide');

  //Show login form and button
  loginForm.classList.remove('login--hide');
  signupBtn.classList.remove('registration__registration--hide');
})


