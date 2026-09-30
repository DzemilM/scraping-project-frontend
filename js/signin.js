/**
 * Sign-in page logic
 * ==================
 * The HTML + CSS already react to these "hooks" — you only change classes,
 * attributes and text from JS. You shouldn't need to touch the CSS.
 *
 *   Element                          What to do with it
 *   -------------------------------  ---------------------------------------------------
 *   #signin-form                     the form
 *   #email, #password                the inputs
 *   .field  (input's wrapper)        add/remove class "is-invalid" → red border + error shows
 *   #email-error, #password-error    put the error message text in here
 *   #toggle-password                 aria-pressed="true" swaps the eye icon
 *   #caps-hint                       add/remove the `hidden` attribute
 *   #form-alert                      add/remove `hidden` → form-level error box
 *   #form-alert-message              the text inside that box
 *   #submit-btn                      class "is-loading" → spinner  (also disable it)
 *   #remember                        the "Remember me" checkbox
 *   #theme-toggle                    theme button (top-right)
 *   <html> data-theme="light|dark"   forces that theme; no attribute = follow the system
 *                                    (the sun/moon icon swaps by itself via CSS)
 *
 * Work through the TODOs in order. After each one, reload the page and check it
 * works before moving on. Ask for a hint whenever you're stuck.
 */


// TODO 1 — Grab the elements
// Get a reference to every element you'll need from the table above.
const signInForm = document.getElementById("signin-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const togglePassword = document.getElementById("toggle-password");
const capsHint = document.getElementById("caps-hint");
const formAlert = document.getElementById("form-alert");
const formAlertMessage = document.getElementById("form-alert-message");
const submitButton = document.getElementById("submit-btn");
const rememberCheckbox = document.getElementById("remember");
const themeToggle = document.getElementById("theme-toggle");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO 2 — Show / hide password
// Clicking the eye button switches the password between hidden and visible.
// Keep aria-pressed and aria-label in sync with the current state.
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.ariaPressed = "true";
        togglePassword.ariaLabel = "Hide password";
    } else {
        passwordInput.type = "password";
        togglePassword.ariaPressed = "false";
        togglePassword.ariaLabel = "Show password";
    }
});


// TODO 3 — Validation rules
// Write validateEmail(value) and validatePassword(value).
// Each returns an error message string, or "" if the value is fine.
//   Email:    required, and must look like an email
//   Password: required, at least 8 characters
function validateEmail(value) {
    const trimmedVal = value.trim();

    if (trimmedVal.length === 0) {
        return "Email is required";
    } else if (!EMAIL_PATTERN.test(trimmedVal)) {
        return "Invalid email";
    } else {
        return "";
    }
}

function validatePassword(value) {
    if (value.length === 0) {
        return "Password is required";
    } else if (value.length < 8) {
        return "Password needs to have at least 8 characters";
    } else {
        return "";
    }
}

// TODO 4 — Show / clear a field error
// Write showFieldError(input, message) and clearFieldError(input).
// They update the input's .field wrapper, its error <p>, and aria-invalid on the input.
function showFieldError(input, message) {
    const field = input.closest(".field");
    field.classList.add("is-invalid");
    const textP = field.querySelector(".field__error");
    textP.textContent = message;
    input.ariaInvalid = "true";
}

function clearFieldError(input) {
    const field = input.closest(".field");
    field.classList.remove("is-invalid");
    const textP = field.querySelector(".field__error");
    textP.textContent = "";
    input.ariaInvalid = "false";
}

// TODO 5 — Validate as the user interacts
// Check a field when the user leaves it (not on every keystroke).
// But once a field is showing an error, re-check it while they type,
// so the error disappears the moment it's fixed.
function checkEmail() {
    const message = validateEmail(emailInput.value);
    if (message === "") {
        clearFieldError(emailInput);
    }
    else {
        showFieldError(emailInput, message);
    }
}

emailInput.addEventListener("blur", () => {
    checkEmail();
})

emailInput.addEventListener("input", () => {
    const field = emailInput.closest(".field");

    if (field.classList.contains("is-invalid")) {
        checkEmail();
    }
})

function checkPassword() {
    const message = validatePassword(passwordInput.value);
    if (message === "") {
        clearFieldError(passwordInput);
    }
    else {
        showFieldError(passwordInput, message);
    }
}

passwordInput.addEventListener("blur", () => {
    checkPassword();
    capsHint.hidden = true;
})

passwordInput.addEventListener("input", () => {
    const field = passwordInput.closest(".field");

    if (field.classList.contains("is-invalid")) {
        checkPassword();
    }
})


// TODO 6 — Caps Lock warning
// While typing in the password field, show #caps-hint only when Caps Lock is on.
passwordInput.addEventListener("keyup", (event) => {
    if (event.getModifierState("CapsLock")) {
        capsHint.hidden = false;
    } else {
        capsHint.hidden = true;
    }
})


// TODO 7 — Fake backend
// The real API isn't ready yet. Write fakeLogin(email, password) that returns a Promise.
// After ~1 second it should:
//   - resolve with an object containing a token, for ONE test account you hard-code
//   - reject with an Error("Invalid email or password") for anything else



// TODO 8 — Submit
// On submit: stop the page from reloading and validate both fields.
// If anything is invalid, focus the first invalid field and stop there.
// Otherwise hide any old #form-alert and go on to TODO 9.



// TODO 9 — Loading state + "API" call
// Put the button into its loading state, call fakeLogin, and ALWAYS restore
// the button afterwards, whether it succeeded or failed.
//   Failure → show the error message in #form-alert
//   Success → console.log the token for now (redirect comes later)



// TODO 10 — Remember me
// On a successful sign-in with "Remember me" checked, save the email so it's
// pre-filled next time the page loads. If it's unchecked, forget any saved email.
// (Make the page pre-fill the field on load too.)



// TODO 11 — (later, when the backend is ready) Real request
// Replace fakeLogin with a real POST to your friend's login endpoint.
// Agree with them first on: the URL, the request body, the success response,
// and the error response format.
// Handle: server unreachable, non-2xx status, and the error message they send back.



// TODO 12 — Light / dark mode toggle
// Clicking #theme-toggle switches between light and dark.
//   - The first click must switch AWAY from whatever the user currently sees,
//     even if that theme came from their system setting.
//   - Remember the choice, so the page opens in that theme next time.
//   - Keep the button's aria-label accurate ("Switch to dark mode" / "Switch to light mode").
// Bonus: on reload you may see a quick flash of the wrong theme. Figure out why,
// and how to prevent it.
