// Example: check if user is "logged in"
const username = localStorage.getItem("username");

const authLinks = document.getElementById("auth-links");
const userInfo = document.getElementById("user-info");
const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logout-btn");
const imageMoonPNG = "https://purepng.com/public/uploads/large/purepng.com-moonnaturelightnightmoon-961524672147abmbw.png"; // Dark mode icon
const imageSunPNG = "https://cdn-icons-png.flaticon.com/512/169/169367.png"; // Light mode icon

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

// darkmode
const toggleButton = document.getElementById('toggle');
var darkModeThemeChange = document.getElementById('darkmode')

// // Runs immediately before the DOM fully paints
// (function() {
//   const root = document.documentElement;
//   const savedTheme = localStorage.getItem('theme') || 'dark';

//   // Apply saved theme early
//   root.classList.add(savedTheme);
// })();

toggleButton.addEventListener('click', () => {
    const body = document.body;

    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        darkModeThemeChange.src = imageMoonPNG
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        darkModeThemeChange.src = imageSunPNG
    }
})

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        darkModeThemeChange.src = imageSunPNG
    } else {
        darkModeThemeChange.src = imageMoonPNG
    }
})

// document.getElementById()

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