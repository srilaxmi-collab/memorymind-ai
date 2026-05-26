import { app } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const auth = getAuth(app);

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Helper to get values safely
const getCredentials = () => ({
  email: document.getElementById("email")?.value,
  password: document.getElementById("password")?.value
});

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const { email, password } = getCredentials();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signup Successful");
        console.log(userCredential.user);
      })
      .catch((error) => alert(error.message));
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const { email, password } = getCredentials();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login Successful");
        console.log(userCredential.user);
      })
      .catch((error) => alert(error.message));
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => alert("Logged Out"))
      .catch((error) => alert(error.message));
  });
}