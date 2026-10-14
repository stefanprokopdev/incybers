import { useLocation } from "@docusaurus/router";
import LearningBreadcrumbs, { LearningBreadcrumbItem } from "@site/src/components/LearningBreadcrumbs";
import LearningSidebar from "@site/src/components/LearningSidebar";
import clsx from "clsx";
import React, { JSX, useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";

interface LearningShellProps {
  children: React.ReactNode;
  /** Položky breadcrumbs za kořenem „Moje kurzy“. Bez vlastních položek se zobrazí jen kořen. */
  breadcrumbs?: LearningBreadcrumbItem[];
  wide?: boolean;
  /** Nastavte, pokud je stránka vykreslena bez hlavní lišty (Layout `noHeader`). */
  noNavbar?: boolean;
}

export default function LearningShell({
  children,
  breadcrumbs,
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
          {breadcrumbs && <LearningBreadcrumbs items={breadcrumbs} />}
          {children}
        </div>
      </main>
    </div>
  );
}
