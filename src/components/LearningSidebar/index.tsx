import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarPlaceholder from "@site/src/components/AvatarPlaceholder";
import { getCourseByAccessCode } from "@site/src/data/learning/courses";
import { useAuth } from "@site/src/hooks/useAuth";
import { useLearningProfile } from "@site/src/hooks/useLearningProfile";
import { useVisibleCourses } from "@site/src/hooks/useVisibleCourses";
import { faSolid } from "@site/src/utils/faIcon";
import { courseDetailPath, LEARNING_DASHBOARD_PATH, parseCourseIdFromSearch } from "@site/src/utils/learningRoutes";
import clsx from "clsx";
import React, { FormEvent, JSX, useEffect, useId, useRef, useState } from "react";
import styles from "./index.module.css";

library.add(fas);

const COLLAPSED_STORAGE_KEY = "learning-sidebar-collapsed";

interface LearningSidebarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  onDesktopCollapsedChange?: (collapsed: boolean) => void;
}

function isDashboardPath(pathname: string): boolean {
  return pathname === "/kurzy" || pathname === "/kurzy/";
}

export default function LearningSidebar({
  mobileOpen,
  onMobileOpenChange,
  onDesktopCollapsedChange,
}: LearningSidebarProps): JSX.Element {
  const { user, logout } = useAuth();
  const { profile, hasFullAccess, loading: profileLoading, enrollInCourse, clearEnrollError } = useLearningProfile();
  const courses = useVisibleCourses(profile);
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const codeInputId = useId();
  const userMenuId = useId();

  const rail = collapsed && !isNarrow;
  const concealed = rail || (isNarrow && !mobileOpen);
  const activeCourseId = parseCourseIdFromSearch(location.search);
  const dashboardActive = isDashboardPath(location.pathname);

  const email = user?.email ?? "";
  const displayName = user?.displayName?.trim() || email || "Uživatel";
  const showEmail = Boolean(email && email !== displayName);
  const photoUrl = user?.photoURL;

  useEffect(() => {
    try {
      if (window.localStorage.getItem(COLLAPSED_STORAGE_KEY) === "1") {
        setCollapsed(true);
      }
    } catch {
      // Storage can be unavailable; the panel stays open.
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 996px)");
    const sync = () => setIsNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    onDesktopCollapsedChange?.(rail);
  }, [onDesktopCollapsedChange, rail]);

  useEffect(() => {
    if (!userMenuOpen && !mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      setUserMenuOpen(false);
      onMobileOpenChange(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, onMobileOpenChange, userMenuOpen]);

  useEffect(() => {
    if (!userMenuOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!footerRef.current?.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [userMenuOpen]);

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(COLLAPSED_STORAGE_KEY, next ? "1" : "0");
      } catch {
        // Ignore storage failures and still toggle the panel.
      }
      return next;
    });
    setUserMenuOpen(false);
  };

  const handlePanelToggle = () => {
    if (isNarrow) {
      onMobileOpenChange(false);
      setUserMenuOpen(false);
      return;
    }
    toggleCollapsed();
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch {
      setLoggingOut(false);
    }
  };

  const handleEnroll = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    clearEnrollError();

    const course = getCourseByAccessCode(code);
    if (!course) {
      setError("Neplatný kód kurzu.");
      return;
    }

    if (profile?.enrolledCourseIds.includes(course.id)) {
      setMessage(`Kurz „${course.title}“ už máte aktivovaný.`);
      setCode("");
      return;
    }

    setSubmitting(true);
    try {
      await enrollInCourse(course.id);
      setMessage(`Kurz „${course.title}“ byl úspěšně aktivován.`);
      setCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nepodařilo se přidat kurz. Zkuste to znovu.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeMobile = () => onMobileOpenChange(false);

  return (
    <>
      <button
        type="button"
        className={clsx(styles.mobileToggle, mobileOpen && styles.mobileToggleHidden)}
        onClick={() => onMobileOpenChange(true)}
        aria-expanded={mobileOpen}
        aria-controls="learning-sidebar"
      >
        <FontAwesomeIcon icon={faSolid("bars")} aria-hidden />
        Menu
      </button>

      {rail && (
        <button
          type="button"
          className={styles.desktopOpen}
          onClick={toggleCollapsed}
          aria-controls="learning-sidebar"
          aria-expanded={false}
        >
          <FontAwesomeIcon icon={faSolid("bars")} aria-hidden />
          Menu
        </button>
      )}

      {mobileOpen && (
        <button type="button" className={styles.backdrop} aria-label="Zavřít panel" onClick={closeMobile} />
      )}

      <aside
        id="learning-sidebar"
        className={clsx(styles.sidebar, rail && styles.sidebarHidden, mobileOpen && styles.sidebarMobileOpen)}
        aria-label="Navigace výukové platformy"
        aria-hidden={concealed || undefined}
        inert={concealed}
      >
        <div className={styles.header}>
          {!rail && (
            <Link
              className={styles.logoLink}
              to={LEARNING_DASHBOARD_PATH}
              aria-label="Outcybers – úvodní stránka kurzů"
              title="Úvodní stránka kurzů"
              onClick={closeMobile}
            >
              <img src="/img/logo.svg" alt="Outcybers" className={styles.logo} width={148} height={32} />
            </Link>
          )}
          <button
            type="button"
            className={styles.collapseButton}
            onClick={handlePanelToggle}
            aria-expanded={!rail && (!isNarrow || mobileOpen)}
            aria-label={isNarrow ? "Zavřít panel" : rail ? "Otevřít panel" : "Skrýt panel"}
            title={isNarrow ? "Zavřít panel" : rail ? "Otevřít panel" : "Skrýt panel"}
          >
            <FontAwesomeIcon icon={faSolid(isNarrow || !rail ? "angles-left" : "angles-right")} aria-hidden />
          </button>
        </div>

        <div className={styles.body}>
          <nav className={styles.nav} aria-label="Kurzy">
            <Link
              className={clsx(styles.navLink, dashboardActive && styles.navLinkActive)}
              to={LEARNING_DASHBOARD_PATH}
              aria-current={dashboardActive ? "page" : undefined}
              title="Moje kurzy"
              onClick={closeMobile}
            >
              <FontAwesomeIcon icon={faSolid("graduation-cap")} className={styles.navIcon} aria-hidden />
              {!rail && <span className={styles.navLabel}>Moje kurzy</span>}
            </Link>

            {!rail && (
              <ul className={styles.courseList}>
                {profileLoading && <li className={styles.courseHint}>Načítám kurzy…</li>}
                {!profileLoading && courses.length === 0 && (
                  <li className={styles.courseHint}>Zatím nemáte přiřazený kurz.</li>
                )}
                {!profileLoading &&
                  courses.map((course) => {
                    const active = activeCourseId === course.id;
                    return (
                      <li key={course.id}>
                        <Link
                          className={clsx(styles.courseLink, active && styles.courseLinkActive)}
                          to={courseDetailPath(course.id)}
                          aria-current={active ? "page" : undefined}
                          title={course.title}
                          onClick={closeMobile}
                        >
                          <FontAwesomeIcon icon={faSolid("book-open")} className={styles.navIcon} aria-hidden />
                          <span className={styles.navLabel}>{course.title}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}
          </nav>

          {/* Role full_access vidí všechny kurzy, kód kurzu nepotřebuje. */}
          {!rail && !profileLoading && !hasFullAccess && (
            <section className={styles.enroll} aria-label="Přidat kurz kódem">
              <h2 className={styles.enrollTitle}>Kód kurzu</h2>
              <p className={styles.enrollHint}>Aktivujte kurz zadáním kódu.</p>
              <form className={styles.enrollForm} onSubmit={(event) => void handleEnroll(event)}>
                <label className={styles.visuallyHidden} htmlFor={codeInputId}>
                  Kód kurzu
                </label>
                <input
                  id={codeInputId}
                  className={styles.enrollInput}
                  type="text"
                  placeholder="Např. TEST2026"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  disabled={submitting}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="submit"
                  className="button button--primary button--sm"
                  disabled={submitting || !code.trim()}
                >
                  {submitting ? "Přidávám…" : "Přiřadit kurz"}
                </button>
              </form>
              {error && (
                <p className={styles.feedbackError} role="alert">
                  {error}
                </p>
              )}
              {message && (
                <p className={styles.feedbackSuccess} role="status">
                  {message}
                </p>
              )}
            </section>
          )}
        </div>

        <div className={styles.footer} ref={footerRef}>
          {userMenuOpen && (
            <div id={userMenuId} className={styles.userMenu} role="menu">
              <button
                type="button"
                className={styles.logoutButton}
                role="menuitem"
                onClick={() => void handleLogout()}
                disabled={loggingOut}
              >
                <FontAwesomeIcon icon={faSolid("right-from-bracket")} aria-hidden />
                {loggingOut ? "Odhlašuji…" : "Odhlásit se"}
              </button>
            </div>
          )}

          <button
            type="button"
            className={clsx(styles.userTrigger, userMenuOpen && styles.userTriggerOpen)}
            onClick={() => setUserMenuOpen((open) => !open)}
            aria-expanded={userMenuOpen}
            aria-controls={userMenuId}
            title={displayName}
          >
            {photoUrl ? (
              <img src={photoUrl} alt="" className={styles.avatar} referrerPolicy="no-referrer" />
            ) : (
              <AvatarPlaceholder name={displayName} className={styles.avatar} />
            )}
            {!rail && (
              <>
                <span className={styles.userMeta}>
                  <span className={styles.userName}>{displayName}</span>
                  {showEmail && <span className={styles.userEmail}>{email}</span>}
                </span>
                <FontAwesomeIcon
                  icon={faSolid(userMenuOpen ? "chevron-down" : "chevron-up")}
                  className={styles.userChevron}
                  aria-hidden
                />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
