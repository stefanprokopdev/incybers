import {
  formatCountdown,
  getCountdownParts,
  getNextRegistrationEvent,
  type WebinarEvent,
} from "@site/src/utils/events";
import React, { JSX, useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";

interface HeroEventRegistrationProps {
  fallback?: React.ReactNode;
  lumaHeight?: string;
}

function useCountdown(targetDateIso: string): string {
  const [label, setLabel] = useState(() => {
    const parts = getCountdownParts(targetDateIso);
    return parts ? formatCountdown(parts) : "Právě začíná";
  });

  useEffect(() => {
    const updateCountdown = (): void => {
      const parts = getCountdownParts(targetDateIso);
      setLabel(parts ? formatCountdown(parts) : "Právě začíná");
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(intervalId);
  }, [targetDateIso]);

  return label;
}

function EventRegistrationPanel({ event, lumaHeight }: { event: WebinarEvent; lumaHeight: string }): JSX.Element {
  const countdownLabel = useCountdown(event.date);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.countdownBlock} aria-live="polite">
          Další event za <span className={styles.countdownValue}>{countdownLabel}</span>
        </div>
      </div>

      {event.lumaUrl && (
        <div className={styles.registrationForm}>
          <img src={event.previewUrl} alt={event.title} className={styles.eventImage} />
          <a href={`/eventy/${event.id}/#registrace`} className="margin-top--md button button--primary">
            Registrovat se zdarma
          </a>
        </div>
      )}
    </div>
  );
}

export default function HeroEventRegistration({
  fallback = null,
  lumaHeight = "340pt",
}: HeroEventRegistrationProps): JSX.Element | null {
  const event = useMemo(() => getNextRegistrationEvent({ requireLumaUrl: true }), []);

  if (!event) {
    return fallback ? <>{fallback}</> : null;
  }

  return <EventRegistrationPanel event={event} lumaHeight={lumaHeight} />;
}
