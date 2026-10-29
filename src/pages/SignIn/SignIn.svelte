<script>
  import Brand from '../../lib/components/Brand.svelte'
  import ThemeToggle from '../../lib/components/ThemeToggle.svelte'
  import AuthVisual from './AuthVisual.svelte'
  import './SignIn.css'

  import { validateEmail, validatePassword } from '../../lib/validation';
  import { login } from '../../lib/api/auth';

  
  const savedEmail = localStorage.getItem("email");
  let email = $state(savedEmail === null ? "" : savedEmail);
  let password = $state("");
  let isPasswordVisible = $state(false);
  let emailError = $state("");
  let passwordError = $state("");
  let formError = $state("");
  let isCapsLockOn = $state(false);
  let emailInput;
  let passwordInput;
  let isLoading = $state(false);
  let rememberMe = $state(savedEmail !== null);

  function checkEmail(){
    emailError = validateEmail(email);
  }

  function checkPassword(){
    passwordError = validatePassword(password);
  }

  async function handleSubmit(event){
    event.preventDefault();
    checkEmail();
    checkPassword();
    if(emailError.length > 0){
      emailInput.focus();
      return;
    } else if(passwordError.length > 0){
      passwordInput.focus();
      return;
    }

    formError = "";
    isLoading = true;

    try {
      const result = await login(email, password);
      if (!result.access_token) {
        throw new Error("Login response did not include an access token");
      }
      localStorage.setItem("accessToken", result.access_token);
      if(rememberMe){
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
      window.location.href = "/scraper";

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
      <h1>Welcome back</h1>
      <p class="subtitle">Sign in to your workspace.</p>

      <!-- Form-level error (e.g. wrong password) -->
      <div class="form-alert" role="alert" hidden={!formError}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4.5M12 16h.01" />
        </svg>
        <span>{formError}</span>
      </div>

      <form novalidate onsubmit={handleSubmit}>
        <div class="field" class:is-invalid={emailError.length > 0}>
          <label for="email">Email</label>
          <div class="field__control">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@company.com"
              aria-describedby="email-error"
              bind:value={email}
              aria-invalid={emailError.length > 0}
              onblur={checkEmail}
              oninput={()=>{
                if(emailError.length > 0){
                  checkEmail();
                }
              }}
              bind:this={emailInput}
            />
          </div>
          <p class="field__error" id="email-error" aria-live="polite">{emailError}</p>
        </div>

        <div class="field field--password" 
             class:is-invalid={passwordError.length > 0}>
          <div class="field__row">
            <label for="password">Password</label>
            <a class="link link--muted" href="/forgot-password">Forgot password?</a>
          </div>
          <div class="field__control">
            <input
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              autocomplete="current-password"
              placeholder="••••••••"
              aria-describedby="password-error caps-hint"
              bind:value={password}
              aria-invalid={passwordError.length > 0}
              onblur={()=>{
                isCapsLockOn = false;
                checkPassword();
                }}
              oninput={()=>{
                if(passwordError.length > 0){
                  checkPassword();
                }
              }}
              onkeyup={(event)=>{
                isCapsLockOn = event.getModifierState("CapsLock");
              }}
              bind:this={passwordInput}
            />
            <button 
            class="field__toggle" 
            type="button" 
            aria-label={`${isPasswordVisible ? "Hide" : "Show"} password`} 
            aria-pressed={isPasswordVisible} 
            onclick={()=>isPasswordVisible = !isPasswordVisible}>
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
          <p class="field__hint" id="caps-hint" hidden={!isCapsLockOn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 4 4 12h4v6h8v-6h4z" />
            </svg>
            Caps Lock is on
          </p>
          <p class="field__error" id="password-error" aria-live="polite">{passwordError}</p>
        </div>

        <label class="check">
          <input bind:checked={rememberMe} type="checkbox" name="remember" />
          <span class="check__box">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          Remember me
        </label>

        <button class="btn btn--primary" class:is-loading={isLoading} type="submit" disabled={isLoading}>
          <span class="btn__label">
            Sign in
            <svg class="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <span class="btn__spinner" aria-hidden="true"></span>
        </button>
      </form>

      <div class="divider">or</div>

      <button class="btn btn--ghost" type="button">
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
        </svg>
        Continue with Google
      </button>

      <p class="switch">
        New to Universal Scraper? <a class="link" href="/signup">Create an account</a>
      </p>
    </div>

    <footer class="auth__footer">
      <span>© 2026 Universal Scraper</span>
      <a href="/terms">Terms</a>
      <a href="/privacy">Privacy</a>
    </footer>
  </section>
</main>
