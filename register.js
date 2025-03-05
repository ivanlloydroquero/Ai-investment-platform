document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

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
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        // Username Validation
        if (username.value.trim().length < 3) {
            showError(username, "Username must be at least 3 characters");
            isValid = false;
        } else {
            hideError(username);
        }

        // Email Validation
        if (!validateEmail(email.value)) {
            showError(email, "Enter a valid email address");
            isValid = false;
        } else {
            hideError(email);
        }

        // Phone Validation
        if (!validatePhone(phone.value)) {
            showError(phone, "Enter a valid phone number");
            isValid = false;
        } else {
            hideError(phone);
        }

        // Password Validation
        if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters");
            isValid = false;
        } else {
            hideError(password);
        }

        // Confirm Password Validation
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "Passwords do not match");
            isValid = false;
        } else {
            hideError(confirmPassword);
        }

        // IF VALID, SHOW SUCCESS MESSAGE
        if (isValid) {
            alert("Registration Successful!");
            form.reset();
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

    // PHONE NUMBER VALIDATION FUNCTION
    function validatePhone(phone) {
        const re = /^[0-9]{10,11}$/;
        return re.test(phone);
    }
});