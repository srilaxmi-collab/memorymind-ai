import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBaw6QKzIXqd299Fks9RPLI9heQ3Alq0Aw",
  authDomain: "memorymind-ai-7748c.firebaseapp.com",
  projectId: "memorymind-ai-7748c",
  storageBucket: "memorymind-ai-7748c.firebasestorage.app",
  messagingSenderId: "153493663214",
appId: "1:153493663214:web: 54073d4e1788570ca232ff"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const signupBtn = document.getElementById("signupBtn");

const loginBtn = document.getElementById("loginBtn");

const logoutBtn = document.getElementById("logoutBtn");

signupBtn.addEventListener("click", () => {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

      alert("Signup Successful");

      console.log(userCredential.user);

    })

    .catch((error) => {

      alert(error.message);

    });

});

loginBtn.addEventListener("click", () => {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

      alert("Login Successful");

      console.log(userCredential.user);

    })

    .catch((error) => {

      alert(error.message);

    });

});

logoutBtn.addEventListener("click", () => {

  signOut(auth)

    .then(() => {

      alert("Logged Out");

    })

    .catch((error) => {

      alert(error.message);

    });

});