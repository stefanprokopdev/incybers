import Link from "@docusaurus/Link";
import { getNextRegistrationEvent } from "@site/src/utils/events";
import clsx from "clsx";
import React, { JSX, useMemo } from "react";
import styles from "./index.module.css";

function formatEventDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
  });
}

export default function EventAnnouncementBar(): JSX.Element | null {
  const event = useMemo(() => getNextRegistrationEvent(), []);

  if (!event) {
    return null;
  }

  const formattedDate = formatEventDate(event.date);
  const eventUrl = `/eventy/${event.id}/`;

  return (
    <Link to={eventUrl} className={clsx(styles.bar)} aria-label={`${event.title} – rezervujte si místo`}>
      <span className={styles.inner}>
        <span className={styles.date}>{formattedDate}</span>
        <span className={styles.separator} aria-hidden>
          ·
        </span>
        {event.badgeLabel && <span className={styles.badge}>{event.badgeLabel}</span>}
        <span className={styles.title}>{event.title}</span>
        <span className={styles.cta}>
          Rezervujte si místo zdarma{" "}
          <span className={styles.ctaArrow} aria-hidden>
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
