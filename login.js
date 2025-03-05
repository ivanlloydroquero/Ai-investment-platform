document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password");

    // SHOW/HIDE PASSWORD
    togglePassword.addEventListener("click", function () {
        if (password.type === "password") {
            password.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            password.type = "password";
            togglePassword.textContent = "👁️";
        }
    });

    // FORM VALIDATION
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        // Email Validation
        if (!validateEmail(email.value)) {
            showError(email, "Enter a valid email address");
            isValid = false;
        } else {
            hideError(email);
        }

        // Password Validation
        if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters");
            isValid = false;
        } else {
            hideError(password);
        }

        // IF VALID, SHOW SUCCESS MESSAGE
        if (isValid) {
            alert("Login Successful!");
            loginForm.reset();
        }
    });

    // ERROR HANDLING FUNCTIONS
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    function hideError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = "none";
    }

    // EMAIL VALIDATION FUNCTION
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    const email = document.getElementById("email");

    // FORM VALIDATION
    forgotPasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        // Email Validation
        if (!validateEmail(email.value)) {
            showError(email, "Enter a valid email address");
            isValid = false;
        } else {
            hideError(email);
        }

        // IF VALID, SHOW SUCCESS MESSAGE
        if (isValid) {
            alert("A password reset link has been sent to your email!");
            forgotPasswordForm.reset();
        }
    });

    // ERROR HANDLING FUNCTIONS
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    function hideError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = "none";
    }

    // EMAIL VALIDATION FUNCTION
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});