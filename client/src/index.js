// Example: check if user is "logged in"
const username = localStorage.getItem("username");

const authLinks = document.getElementById("auth-links");
const userInfo = document.getElementById("user-info");
const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logout-btn");

if (username) {
    // User is logged in
    authLinks.style.display = "none";
    userInfo.style.display = "block";
    welcome.textContent = `Welcome, ${username}!`;
} else {
    // Not logged in
    authLinks.style.display = "block";
    userInfo.style.display = "none";
}

// Logout button clears the login info
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    location.reload(); // reload to update UI
});



// authi
function toggleVisibility() {
    const passInput  = document.getElementById('authi-pass');
    if (passInput.type === "text") {
        passInput.type = "password";
    } else {
        passInput.type = "text";
    }
}

document.getElementById("toggle-pass").addEventListener("click", function() {
    const passInput  = document.getElementById('authi-pass');
    const icon = this;

    if (passInput.type === "password") {
        passInput.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
        icon.style.opacity = "1";
    } else {
        passInput.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
        icon.style.opacity = "0.6";
    }
});