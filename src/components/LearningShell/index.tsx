import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LearningSidebar from "@site/src/components/LearningSidebar";
import { faSolid } from "@site/src/utils/faIcon";
import clsx from "clsx";
import React, { JSX, useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";

interface LearningShellProps {
  children: React.ReactNode;
  backTo?: string;
  backLabel?: string;
  wide?: boolean;
  /** Nastavte, pokud je stránka vykreslena bez hlavní lišty (Layout `noHeader`). */
  noNavbar?: boolean;
}

export default function LearningShell({
  children,
  backTo,
  backLabel,
  wide = false,
  noNavbar = false,
}: LearningShellProps): JSX.Element {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const handleDesktopCollapsedChange = useCallback((collapsed: boolean) => {
    setDesktopCollapsed(collapsed);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  return (
    <div className={clsx(styles.shell, noNavbar && styles.shellNoNavbar)}>
      <LearningSidebar
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
        onDesktopCollapsedChange={handleDesktopCollapsedChange}
      />
      <main className={clsx(styles.content, desktopCollapsed && styles.contentCollapsed)}>
        <div className={clsx(styles.inner, wide && styles.innerWide)}>
          {backTo && backLabel && (
            <Link className={styles.backLink} to={backTo}>
              <FontAwesomeIcon icon={faSolid("arrow-left")} aria-hidden />
              {backLabel}
            </Link>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
