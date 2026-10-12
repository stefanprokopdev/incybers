import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames } from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import EventAnnouncementBar from "@site/src/components/EventAnnouncementBar";
import AnnouncementBar from "@theme/AnnouncementBar";
import ErrorPageContent from "@theme/ErrorPageContent";
import Footer from "@theme/Footer";
import type { Props } from "@theme/Layout";
import LayoutProvider from "@theme/Layout/Provider";
import Navbar from "@theme/Navbar";
import SkipToContent from "@theme/SkipToContent";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./styles.module.css";

export default function Layout(props: Props): JSX.Element {
  const { children, noFooter, wrapperClassName, title, description, noEventBar, noHeader } = props;

  useKeyboardNavigation();

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      {!noEventBar && <EventAnnouncementBar />}

      {!noHeader && <Navbar />}

      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.layout.main.container,
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName,
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>{children}</ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}
