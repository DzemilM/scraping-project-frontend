<script>
  import Brand from '../../lib/components/Brand.svelte'
  import ThemeToggle from '../../lib/components/ThemeToggle.svelte'
  import AuthVisual from '../SignIn/AuthVisual.svelte'
  import '../SignIn/SignIn.css'
  import { signup } from '../../lib/api/auth'
  import { validateEmail, validatePassword } from '../../lib/validation'

  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let emailError = $state("");
  let passwordError = $state("");
  let confirmPasswordError = $state("");
  let formError = $state("");
  let isLoading = $state(false);
  let successMessage = $state("");
  let isPasswordVisible = $state(false);
  let isConfirmPasswordVisible = $state(false);

  async function handleSubmit(event) {
    event.preventDefault();

    emailError = "";
    passwordError = "";
    confirmPasswordError = "";
    formError = "";
    successMessage = "";

    emailError = validateEmail(email);
    passwordError = validatePassword(password);
    confirmPasswordError = password === confirmPassword
      ? ""
      : "Passwords do not match";

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    isLoading = true;

    try {
      const result = await signup(email, password);
      if (!result.access_token) {
        throw new Error("Signup response did not include an access token");
      }
      localStorage.setItem("accessToken", result.access_token);
      successMessage = "Account created! Taking you to the scraper…";
      window.setTimeout(() => {
        window.location.href = "/scraper";
      }, 1200);
    } catch (error) {
      formError = error.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<main class="auth">
  <AuthVisual />

  <section class="auth__panel">
    <header class="auth__top">
      <Brand class="auth__mobile-brand" />
      <ThemeToggle />
    </header>

    <div class="form-wrap">
      <h1>Create your account</h1>
      <p class="subtitle">Start building your scraping workspace.</p>

      {#if formError}
        <div class="form-alert" role="alert">
          {formError}
        </div>
      {/if}

      {#if successMessage}
        <div class="form-alert form-alert--success" role="status">
          {successMessage}
        </div>
      {/if}

      <form onsubmit={handleSubmit}>
        <div class="field" class:is-invalid={emailError}>
          <label for="email">Email</label>
          <div class="field__control">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@company.com"
              bind:value={email}
              aria-invalid={emailError.length > 0}
            />
          </div>
          <p class="field__error" aria-live="polite">{emailError}</p>
        </div>

        <div class="field field--password" class:is-invalid={passwordError}>
          <label for="password">Password</label>
          <div class="field__control">
            <input
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              autocomplete="new-password"
              placeholder="At least 8 characters"
              bind:value={password}
              aria-invalid={passwordError.length > 0}
            />
            <button
              class="field__toggle"
              type="button"
              aria-label={`${isPasswordVisible ? "Hide" : "Show"} password`}
              aria-pressed={isPasswordVisible}
              onclick={() => isPasswordVisible = !isPasswordVisible}
            >
              <svg class="icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg class="icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <path d="m2 2 20 20" />
              </svg>
            </button>
          </div>
          <p class="field__error" aria-live="polite">{passwordError}</p>
        </div>

        <div class="field field--password" class:is-invalid={confirmPasswordError}>
          <label for="confirm-password">Confirm password</label>
          <div class="field__control">
            <input
              id="confirm-password"
              name="confirm-password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              autocomplete="new-password"
              placeholder="Repeat your password"
              bind:value={confirmPassword}
              aria-invalid={confirmPasswordError.length > 0}
            />
            <button
              class="field__toggle"
              type="button"
              aria-label={`${isConfirmPasswordVisible ? "Hide" : "Show"} password`}
              aria-pressed={isConfirmPasswordVisible}
              onclick={() => isConfirmPasswordVisible = !isConfirmPasswordVisible}
            >
              <svg class="icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg class="icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <path d="m2 2 20 20" />
              </svg>
            </button>
          </div>
          <p class="field__error" aria-live="polite">{confirmPasswordError}</p>
        </div>

        <button
          class="btn btn--primary"
          class:is-loading={isLoading}
          type="submit"
          disabled={isLoading}
        >
          <span class="btn__label">
            Create account
            <svg class="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <span class="btn__spinner" aria-hidden="true"></span>
        </button>
      </form>

      <p class="switch">
        Already have an account? <a class="link" href="/">Sign in</a>
      </p>
    </div>

    <footer class="auth__footer">
      <span>© 2026 Universal Scraper</span>
      <a href="/terms">Terms</a>
      <a href="/privacy">Privacy</a>
    </footer>
  </section>
</main>
