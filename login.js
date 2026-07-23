// login.js

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value;

    const savedEmail = localStorage.getItem("email");

    if(email === ""){
        alert("Please enter your email address.");
        return;
    }

    if(password === ""){
        alert("Please enter your password.");
        return;
    }

    if(savedEmail === null){
        alert("No account found. Please register first.");
        window.location.href = "register.html";
        return;
    }

    if(email !== savedEmail){
        alert("Email not found.");
        return;
    }

    alert("✅ Login Successful!");

    window.location.href = "dashboard.html";

});
