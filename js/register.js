import { db, auth} from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { login, createUser, addUserToDatabase } from "./functions/auth";
import { getMyLocalBag } from "./utils";
import { createFirebaseBag, getFirebaseBag } from "./functions/bag";

//Call HTML elements
//Login form
const loginForm = document.getElementById("login");
const signupBtn = document.getElementById("signupBtn");
//Sign up form
const signupForm = document.getElementById("signup");
const loginBtn = document.getElementById("loginBtn");

let bag = [];

//Submit button on login form
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  //Get information from inputs
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  login(auth, email, password);

  //Send to home page
  //window.location.href = "../html/index.html";
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
signupForm.addEventListener("submit", async (e) =>{
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
  await addUserToDatabase(db, newUser.uid, userInfo);
  
  alert("Welcome back!");

})

//Open login form
loginBtn.addEventListener("click", e =>{
  //Hide sign up form and button
  signupForm.classList.remove('signup--show');
  loginBtn.classList.add('registration__registration--hide');

  //Show login form and button
  loginForm.classList.remove('login--hide');
  signupBtn.classList.remove('registration__registration--hide');
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    //Get local storage bag
    bag = getMyLocalBag();
    //Add to firestore
    await createFirebaseBag(db, user.uid, bag);

    //Send to home page
    window.location.href = "./index.html";
  } 
});
