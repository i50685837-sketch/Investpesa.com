// register.js

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const fullName = document.querySelector('input[type="text"]').value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const phone = document.querySelector('input[type="tel"]').value.trim();

    const password = document.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;

    if(fullName === ""){
        alert("Please enter your full name.");
        return;
    }

    if(email === ""){
        alert("Please enter your email address.");
        return;
    }

    if(phone === ""){
        alert("Please enter your phone number.");
        return;
    }

    if(password.length < 6){
        alert("Password must be at least 6 characters.");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    // Save user information (demo only)
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);

    alert("🎉 Registration Successful!");

    // Redirect to login page
    window.location.href = "login.html";

});
