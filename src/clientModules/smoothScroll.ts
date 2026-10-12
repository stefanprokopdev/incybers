import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  const getScrollPosition = (element: HTMLElement): number => {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    return elementPosition - navbarHeight - 20;
  };

  const scrollToElement = (element: HTMLElement) => {
    const targetPosition = getScrollPosition(element);
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  const handleAnchorClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;

    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    if (href.startsWith("#")) {
      const anchorId = href.substring(1);
      const targetElement = document.getElementById(anchorId);

      if (targetElement) {
        e.preventDefault();
        scrollToElement(targetElement);

        if (window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const handleHashNavigation = () => {
    const hash = window.location.hash;
    if (hash) {
      const anchorId = hash.substring(1);
      const targetElement = document.getElementById(anchorId);

      if (targetElement) {
        setTimeout(() => {
          scrollToElement(targetElement);
        }, 100);
      }
    }
  };

  document.addEventListener("click", handleAnchorClick, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleHashNavigation);
  } else {
    setTimeout(handleHashNavigation, 100);
  }

  window.addEventListener("hashchange", () => {
    setTimeout(handleHashNavigation, 100);
  });

  const handleRouteChange = () => {
    setTimeout(handleHashNavigation, 300);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("popstate", handleRouteChange);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      handleRouteChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      handleRouteChange();
    };
  }
}
