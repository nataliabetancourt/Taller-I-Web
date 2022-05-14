import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

async function login(auth, email, password) {
    try {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        alert(`Welcome, usuario ${user.email}`);
    } catch (e) {
        alert("Invalid email or password");
    }
}

async function createUser(auth, {email, password}) {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (e) {
        if (e.code === "auth/weak-password") {
            alert("Your password must have more than 6 characters");
        }

        if(e.code === "auth/email-already-in-use") {
            alert("The email is already in use");
        }
    }
}

async function addUserToDatabase(db, userId, userInfo = {}) {
    try {
        await setDoc(doc(db, "users", userId), userInfo)
    } catch (e) {
        console.log(e);
    }
}

export {
    login, 
    createUser, 
    addUserToDatabase
}