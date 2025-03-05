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