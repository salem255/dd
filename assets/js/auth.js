import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const btn =
document.getElementById("loginBtn");

btn.addEventListener("click", async () => {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try {

await signInWithEmailAndPassword(
auth,
email,
password
);

window.location =
"dashboard.html";

}
catch(err){

alert("بيانات الدخول غير صحيحة");

}

});