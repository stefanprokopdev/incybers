import { Redirect } from "@docusaurus/router";
import { useAuth } from "@site/src/hooks/useAuth";
import React, { JSX, ReactNode } from "react";
import styles from "./index.module.css";

interface RequireAuthProps {
  children: ReactNode;
  /** Where to send unauthenticated visitors. Default: login page (/). */
  redirectTo?: string;
}

/**
 * Client-side gate: waits for Firebase Auth, then either renders children
 * or redirects to the login page. Content stays hidden while the session loads.
 */
export default function RequireAuth({ children, redirectTo = "/" }: RequireAuthProps): JSX.Element {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        Ověřuji přihlášení…
      </div>
    );
  }

  if (!user) {
    return <Redirect to={redirectTo} />;
  }

  return <>{children}</>;
}
