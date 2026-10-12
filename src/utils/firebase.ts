import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";

export interface FirebaseWebConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

function isConfigComplete(config: FirebaseWebConfig | undefined): config is FirebaseWebConfig {
  return Boolean(config?.apiKey && config?.authDomain && config?.projectId && config?.appId);
}

export function getFirebaseApp(config: FirebaseWebConfig | undefined): FirebaseApp | null {
  if (typeof window === "undefined" || !isConfigComplete(config)) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(config);
}

export function getFirebaseAuth(config: FirebaseWebConfig | undefined): Auth | null {
  const app = getFirebaseApp(config);
  return app ? getAuth(app) : null;
}

export function getFirebaseFirestore(config: FirebaseWebConfig | undefined): Firestore | null {
  const app = getFirebaseApp(config);
  return app ? getFirestore(app) : null;
}

export function mapFirebaseAuthError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Nesprávný e-mail nebo heslo.";
    case "auth/invalid-email":
      return "Zadejte platnou e-mailovou adresu.";
    case "auth/weak-password":
      return "Heslo je příliš slabé. Zvolte delší a silnější heslo.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Nesprávný e-mail nebo heslo.";
    case "auth/missing-email":
      return "Zadejte e-mailovou adresu pro reset hesla.";
    case "auth/popup-closed-by-user":
      return "Přihlášení přes Google bylo zrušeno.";
    case "auth/cancelled-popup-request":
      return "Přihlášení přes Google bylo přerušeno. Zkuste to znovu.";
    case "auth/popup-blocked":
      return "Prohlížeč zablokoval pop-up. Povolte okna a zkuste to znovu.";
    case "auth/account-exists-with-different-credential":
      return "Nesprávný e-mail nebo heslo.";
    case "auth/too-many-requests":
      return "Příliš mnoho pokusů. Zkuste to prosím později.";
    case "auth/network-request-failed":
      return "Chyba sítě. Zkontrolujte připojení a zkuste to znovu.";
    case "auth/operation-not-allowed":
      return "Tento způsob přihlášení není v projektu povolen.";
    case "auth/email-not-verified":
      return "Nesprávný e-mail nebo heslo.";
    default:
      return "Něco se pokazilo. Zkuste to prosím znovu.";
  }
}
