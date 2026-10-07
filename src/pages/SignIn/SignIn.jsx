import Brand from '../../components/Brand.jsx'
import ThemeToggle from '../../components/ThemeToggle.jsx'
import AuthVisual from './AuthVisual.jsx'
import './SignIn.css'
import { validateEmail, validatePassword } from '../../utils/validation.js'
import { fakeLogin } from '../../api/auth.js'
import { useState } from 'react'
/**
 * Sign-in page — React version
 * ============================
 * Same features you built in legacy/js/signin.js, rebuilt the React way.
 *
 * The big difference: in React you DON'T grab elements and change them.
 * You keep data in STATE, and the JSX below shows whatever the state says.
 * Change the state → React updates the page for you.
 *
 * The CSS is unchanged, so the same hooks still apply:
 *   .field + "is-invalid"        → red border + error text shows
 *   .field__toggle aria-pressed  → swaps the eye icon
 *   .btn + "is-loading"          → spinner
 *   `hidden` attribute           → hides the caps hint / form alert
 *
 * Work through the TODOs in order. Ask for a lesson whenever a TODO needs
 * something new (useState, useRef, useEffect, import/export…).
 *
 * TODO 1 — Move your helpers into their own files
 *   Bring validateEmail, validatePassword and EMAIL_PATTERN over from the legacy
 *   file into src/utils/validation.js, and fakeLogin + the test account into
 *   src/api/auth.js. Make them usable here.
 *
 * 
 * TODO 2 — Controlled inputs
 *   Keep the email and password in state. The inputs should always show
 *   what's in state, and update it as the user types.
 *
 * TODO 3 — Show / hide password
 *   The eye button toggles visibility. The input type, aria-pressed and
 *   aria-label all follow one piece of state.
 *
 * TODO 4 — Field errors
 *   Keep each field's error message in state. The .field class, the error
 *   text and aria-invalid all come from that state.
 *   (You won't need showFieldError / clearFieldError anymore. Think about why.)
 *
 * TODO 5 — Live validation
 *   Same rules as before: check when the user leaves a field, and re-check
 *   while typing once an error is showing.
 *
 * TODO 6 — Caps Lock warning
 *   Show the hint while typing in the password with Caps Lock on, hide it on leave.
 *
 * TODO 7 — Submit
 *   No page reload, validate both fields, focus the first invalid one.
 *
 * TODO 8 — Loading + result
 *   Spinner and disabled button while waiting, red alert on failure,
 *   log the token on success. Always restore the button.
 *
 * TODO 9 — Remember me
 *   The checkbox is in state. Save / forget the email after a successful
 *   sign-in, and pre-fill both on the first load.
 *
 * TODO 10 — Theme toggle (in components/ThemeToggle.jsx)
 *   Flip between light and dark starting from what the user sees, keep the
 *   aria-label right, remember the choice, and restore it on load.
 */

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  return (
    <main className="auth">
      <AuthVisual />

      <section className="auth__panel">
        <header className="auth__top">
          <Brand className="auth__mobile-brand" />
          <ThemeToggle />
        </header>

        <div className="form-wrap">
          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to your workspace.</p>

          {/* Form-level error (e.g. wrong password) */}
          <div className="form-alert" role="alert" hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4.5M12 16h.01" />
            </svg>
            <span></span>
          </div>

          <form noValidate>
            <div className={`field ${emailErrorMessage && "is-invalid"}`}>
              <label htmlFor="email">Email</label>
              <div className="field__control">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-describedby="email-error"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={emailErrorMessage !== ""}
                />
              </div>
              <p className="field__error" id="email-error" aria-live="polite">{emailErrorMessage}</p>
            </div>

            <div className={`field field--password ${passwordErrorMessage && "is-invalid"}`}>
              <div className="field__row">
                <label htmlFor="password">Password</label>
                <a className="link link--muted" href="#">Forgot password?</a>
              </div>
              <div className="field__control">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-describedby="password-error caps-hint"
                  value={password}
                  onChange={(event)=> setPassword(event.target.value)}
                  aria-invalid={passwordErrorMessage !== ""}
                />
                <button className="field__toggle" onClick={()=>setIsPasswordVisible(!isPasswordVisible)} 
                type="button" aria-label={isPasswordVisible ? "Hide password" : "Show password"} 
                aria-pressed={isPasswordVisible}>
                  <svg className="icon-show" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg className="icon-hide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <path d="m2 2 20 20" />
                  </svg>
                </button>
              </div>
              <p className="field__hint" id="caps-hint" hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4 4 12h4v6h8v-6h4z" />
                </svg>
                Caps Lock is on
              </p>
              <p className="field__error" id="password-error" aria-live="polite">{passwordErrorMessage}</p>
            </div>

            <label className="check">
              <input type="checkbox" name="remember" />
              <span className="check__box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              Remember me
            </label>

            <button className="btn btn--primary" type="submit">
              <span className="btn__label">
                Sign in
                <svg className="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="btn__spinner" aria-hidden="true" />
            </button>
          </form>

          <div className="divider">or</div>

          <button className="btn btn--ghost" type="button">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
            </svg>
            Continue with Google
          </button>

          <p className="switch">
            New to Universal Scraper? <a className="link" href="#">Create an account</a>
          </p>
        </div>

        <footer className="auth__footer">
          <span>© 2026 Universal Scraper</span>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </footer>
      </section>
    </main>
  )
}
