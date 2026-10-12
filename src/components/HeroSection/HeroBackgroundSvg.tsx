import React, { JSX, useMemo } from "react";
import styles from "./index.module.css";

function randomPhase(durationSeconds: number): string {
  return `-${Math.random() * durationSeconds}s`;
}

export default function HeroBackgroundSvg(): JSX.Element {
  const delays = useMemo(
    () => ({
      accentTop: randomPhase(42),
      accentBottom: randomPhase(50),
    }),
    [],
  );

  return (
    <div
      className={styles.heroSvgBackground}
      aria-hidden
      style={
        {
          "--hero-delay-accent-top": delays.accentTop,
          "--hero-delay-accent-bottom": delays.accentBottom,
        } as React.CSSProperties
      }
    >
      <svg
        className={styles.heroSvgBackgroundSvg}
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="heroAccentTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffba00" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#ffba00" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffba00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroAccentBottom" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffba00" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#ffba00" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffba00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroHorizonBand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffba00" stopOpacity="0" />
            <stop offset="45%" stopColor="#ffba00" stopOpacity="0.04" />
            <stop offset="58%" stopColor="#ffba00" stopOpacity="0.1" />
            <stop offset="72%" stopColor="#ffba00" stopOpacity="0.08" />
            <stop offset="88%" stopColor="#ffba00" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffba00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroHorizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffba00" stopOpacity="0" />
            <stop offset="55%" stopColor="#ffba00" stopOpacity="0.06" />
            <stop offset="65%" stopColor="#ffba00" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#ffba00" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffba00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGradient)" />
        <rect width="100%" height="100%" fill="url(#heroHorizonBand)" />
        <ellipse cx="5%" cy="15%" rx="45%" ry="50%" fill="url(#heroAccentTop)" className={styles.heroSvgAccentTop} />
        <ellipse
          cx="95%"
          cy="85%"
          rx="40%"
          ry="45%"
          fill="url(#heroAccentBottom)"
          className={styles.heroSvgAccentBottom}
        />
      </svg>
    </div>
  );
}
