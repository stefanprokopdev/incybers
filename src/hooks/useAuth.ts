import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { CustomSiteFields } from "@site/src/types/docusaurus-config";
import { type FirebaseWebConfig, getFirebaseAuth } from "@site/src/utils/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface AuthState {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  logout: () => Promise<void>;
}

/**
 * Subscribes to the Firebase Auth session for the learning platform.
 * Only e-mail-verified users are treated as signed in.
 * `loading` stays true until the first `onAuthStateChanged` callback (client-only).
 */
export function useAuth(): AuthState {
  const { siteConfig } = useDocusaurusContext();
  const firebaseConfig = (siteConfig.customFields as CustomSiteFields).firebase as FirebaseWebConfig | undefined;

  const auth = useMemo(() => getFirebaseAuth(firebaseConfig), [firebaseConfig]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      if (nextUser && !nextUser.emailVerified) {
        setUser(null);
        setLoading(false);
        void signOut(auth);
        return;
      }

      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const logout = useCallback(async () => {
    if (!auth) {
      return;
    }
    await signOut(auth);
  }, [auth]);

  return {
    user,
    loading,
    isConfigured: Boolean(auth),
    logout,
  };
}
