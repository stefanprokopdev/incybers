import Link from "@docusaurus/Link";
import { Redirect } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@site/src/components/Button";
import type { CustomSiteFields } from "@site/src/types/docusaurus-config";
import { getBusinessEmailError } from "@site/src/utils/businessEmail";
import { faSolid } from "@site/src/utils/faIcon";
import { isFullName, normalizeFullName } from "@site/src/utils/learningLogic";
import { getFirebaseAuth, mapFirebaseAuthError, type FirebaseWebConfig } from "@site/src/utils/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type ActionCodeSettings,
  type User,
} from "firebase/auth";
import React, { FormEvent, JSX, useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";

const VOP_GDPR_PATH = "/vop-gdpr/";

type AuthMode = "login" | "register" | "reset";

const PLATFORM_DASHBOARD_PATH = "/kurzy/";

interface AuthFormProps {
  redirectTo?: string;
}

function getVerificationActionCodeSettings(): ActionCodeSettings {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://inycebrs.net";
  return {
    url: `${origin}/`,
    handleCodeInApp: false,
  };
}

export default function AuthForm({ redirectTo = PLATFORM_DASHBOARD_PATH }: AuthFormProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const firebaseConfig = (siteConfig.customFields as CustomSiteFields).firebase as FirebaseWebConfig | undefined;

  const auth = useMemo(() => getFirebaseAuth(firebaseConfig), [firebaseConfig]);
  const isConfigured = Boolean(auth);

  const [mode, setMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (!auth) {
      setAuthReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser?.emailVerified ? nextUser : null);
      setAuthReady(true);
    });

    return unsubscribe;
  }, [auth]);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
    setNeedsVerification(false);
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetMessages();
    setPassword("");
    setShowPassword(false);
    setAcceptedTerms(false);
  };

  const rejectIfNotBusinessEmail = async (address: string | null | undefined): Promise<boolean> => {
    const emailError = getBusinessEmailError(address ?? "");
    if (!emailError) {
      return false;
    }
    if (auth) {
      await signOut(auth);
    }
    setError(emailError);
    return true;
  };

  const handleGoogleSignIn = async () => {
    resetMessages();

    if (!auth) {
      setError("Firebase Auth není nakonfigurován. Doplňte FIREBASE_* proměnné prostředí.");
      return;
    }

    if (mode === "register" && !acceptedTerms) {
      setError("Pro registraci musíte souhlasit s obchodními podmínkami a zásadami GDPR.");
      return;
    }

    setSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const credential = await signInWithPopup(auth, provider);
      if (await rejectIfNotBusinessEmail(credential.user.email)) {
        return;
      }
      if (!credential.user.emailVerified) {
        await signOut(auth);
        setError(mapFirebaseAuthError("auth/email-not-verified"));
      }
    } catch (err) {
      const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
        setError(mapFirebaseAuthError(code));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const sendVerificationAndSignOut = async (firebaseUser: User): Promise<void> => {
    await sendEmailVerification(firebaseUser, getVerificationActionCodeSettings());
    await signOut(auth!);
  };

  const handleResendVerification = async () => {
    resetMessages();

    if (!auth) {
      setError("Firebase Auth není nakonfigurován. Doplňte FIREBASE_* proměnné prostředí.");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Pro znovuodeslání ověřovacího e-mailu vyplňte e-mail i heslo.");
      return;
    }

    const emailError = getBusinessEmailError(trimmedEmail);
    if (emailError) {
      setError(emailError);
      return;
    }

    setSubmitting(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      if (credential.user.emailVerified) {
        await signOut(auth);
        setSuccess("E-mail je už ověřený. Můžete se přihlásit.");
        setMode("login");
        return;
      }

      await sendVerificationAndSignOut(credential.user);
      setNeedsVerification(true);
      setSuccess("Ověřovací e-mail jsme znovu odeslali. Zkontrolujte schránku i spam.");
    } catch (err) {
      const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
      setError(mapFirebaseAuthError(code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetMessages();

    if (!auth) {
      setError("Firebase Auth není nakonfigurován. Doplňte FIREBASE_* proměnné prostředí.");
      return;
    }

    const trimmedEmail = email.trim();
    const emailError = getBusinessEmailError(trimmedEmail);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (mode === "reset") {
      setSubmitting(true);
      try {
        await sendPasswordResetEmail(auth, trimmedEmail);
        setSuccess("Zkontrolujte svůj e-mail (i spam), poslali jsme odkaz pro obnovení hesla.");
      } catch (err) {
        const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
        if (code === "auth/user-not-found") {
          setSuccess("Zkontrolujte svůj e-mail (i spam), poslali jsme odkaz pro obnovení hesla.");
        } else {
          setError(mapFirebaseAuthError(code));
        }
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (!password) {
      setError("Vyplňte e-mail i heslo.");
      return;
    }

    const normalizedFullName = normalizeFullName(fullName);
    if (mode === "register" && !isFullName(normalizedFullName)) {
      setError("Zadejte celé jméno včetně příjmení.");
      return;
    }

    if (mode === "register" && password.length < 12) {
      setError("Heslo musí mít alespoň 12 znaků.");
      return;
    }

    if (mode === "register" && !acceptedTerms) {
      setError("Pro registraci musíte souhlasit s obchodními podmínkami a zásadami GDPR.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        const credential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
        if (await rejectIfNotBusinessEmail(credential.user.email)) {
          return;
        }
        if (!credential.user.emailVerified) {
          try {
            await sendVerificationAndSignOut(credential.user);
          } catch {
            await signOut(auth);
          }
          setNeedsVerification(true);
          setError(mapFirebaseAuthError("auth/email-not-verified"));
          return;
        }
      } else {
        const credential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
        try {
          await updateProfile(credential.user, { displayName: normalizedFullName });
        } catch {
          // Jméno si uživatel může doplnit později při vystavení certifikátu.
        }
        await sendVerificationAndSignOut(credential.user);
        setFullName("");
        setPassword("");
        setShowPassword(false);
        setAcceptedTerms(false);
        setMode("login");
        setNeedsVerification(true);
        setSuccess(
          "Účet jsme vytvořili. Na e-mail jsme poslali ověřovací odkaz (zkontrolujte spam). Po ověření se můžete přihlásit.",
        );
        return;
      }

      setPassword("");
      setShowPassword(false);
    } catch (err) {
      const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
      setError(mapFirebaseAuthError(code));
    } finally {
      setSubmitting(false);
    }
  };

  if (!authReady) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.hint}>Načítám přihlášení…</p>
      </div>
    );
  }

  if (user) {
    return <Redirect to={redirectTo} />;
  }

  const submitLabel =
    mode === "login"
      ? submitting
        ? "Přihlašuji…"
        : "Přihlásit se"
      : mode === "register"
        ? submitting
          ? "Registruji…"
          : "Vytvořit účet"
        : submitting
          ? "Odesílám…"
          : "Odeslat odkaz pro reset";

  return (
    <div className={styles.wrapper}>
      {!isConfigured && (
        <p className={styles.configWarning}>
          Firebase Auth není nakonfigurován. Nastavte proměnné <code>FIREBASE_API_KEY</code>,{" "}
          <code>FIREBASE_AUTH_DOMAIN</code>, <code>FIREBASE_PROJECT_ID</code> a <code>FIREBASE_APP_ID</code>.
        </p>
      )}

      {mode === "reset" && (
        <div className={styles.resetHeader}>
          <h3 className={styles.resetTitle}>Obnovení hesla</h3>
          <p className={styles.hint}>Zadejte e-mail a pošleme vám odkaz pro nastavení nového hesla.</p>
        </div>
      )}

      {mode !== "reset" && (
        <>
          <button
            type="button"
            className={styles.googleButton}
            onClick={handleGoogleSignIn}
            disabled={submitting || !isConfigured}
          >
            <FontAwesomeIcon icon={faGoogle} className={styles.googleIcon} aria-hidden />
            {submitting ? "Přihlašuji…" : "Pokračovat přes Google"}
          </button>
          <div className={styles.divider} role="separator">
            <span>nebo</span>
          </div>
        </>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {mode === "register" && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="auth-full-name">
              Jméno a příjmení
            </label>
            <input
              id="auth-full-name"
              className={styles.input}
              type="text"
              autoComplete="name"
              placeholder="Jan Novák"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={submitting || !isConfigured}
              required
            />
          </div>
        )}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="auth-email">
            Pracovní e-mail
          </label>
          <input
            id="auth-email"
            className={styles.input}
            type="email"
            autoComplete="email"
            placeholder="jan.novak@vase-firma.cz"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={submitting || !isConfigured}
            required
          />
        </div>

        {mode !== "reset" && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="auth-password">
              Heslo
            </label>
            <div className={styles.passwordField}>
              <input
                id="auth-password"
                className={styles.input}
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={submitting || !isConfigured}
                minLength={mode === "register" ? 12 : 6}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((visible) => !visible)}
                disabled={submitting || !isConfigured}
                aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}
                aria-pressed={showPassword}
              >
                <FontAwesomeIcon icon={faSolid(showPassword ? "eye-slash" : "eye")} aria-hidden />
              </button>
            </div>
          </div>
        )}

        {mode === "register" && (
          <div className={styles.checkboxField}>
            <input
              id="auth-terms"
              className={styles.checkbox}
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              disabled={submitting || !isConfigured}
              required
            />
            <label className={styles.checkboxLabel} htmlFor="auth-terms">
              Souhlasím s{" "}
              <Link to={VOP_GDPR_PATH} target="_blank" rel="noopener noreferrer">
                obchodními podmínkami a zásadami GDPR
              </Link>
              .
            </label>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <Button className={styles.submit} type="submit" disabled={submitting || !isConfigured}>
          {submitLabel}
        </Button>

        <div className={styles.links}>
          {needsVerification && mode === "login" && (
            <button
              type="button"
              className={styles.textLink}
              onClick={handleResendVerification}
              disabled={submitting || !isConfigured}
            >
              Znovu odeslat ověřovací e-mail
            </button>
          )}

          {mode === "login" && (
            <>
              <button
                type="button"
                className={styles.textLink}
                onClick={() => switchMode("reset")}
                disabled={submitting || !isConfigured}
              >
                Zapomenuté heslo?
              </button>
              <button
                type="button"
                className={styles.textLink}
                onClick={() => switchMode("register")}
                disabled={submitting || !isConfigured}
              >
                Ještě nemám účet
              </button>
            </>
          )}

          {mode === "register" && (
            <>
              <button
                type="button"
                className={styles.textLink}
                onClick={() => switchMode("login")}
                disabled={submitting}
              >
                Přihlásit se
              </button>
              <p className={styles.hint}>Heslo musí mít alespoň 12 znaků.</p>
            </>
          )}

          {mode === "reset" && (
            <button type="button" className={styles.textLink} onClick={() => switchMode("login")} disabled={submitting}>
              Přihlásit se
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
