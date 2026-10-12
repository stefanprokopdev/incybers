import React, { JSX } from "react";
import styles from "./index.module.css";

interface AvatarPlaceholderProps {
  name: string;
  className?: string;
}

export default function AvatarPlaceholder({ name, className }: AvatarPlaceholderProps): JSX.Element {
  return (
    <div className={`${styles.avatarPlaceholder} ${className || ""}`}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.avatarSvg}
        aria-label={`Avatar placeholder pro ${name}`}
      >
        <ellipse cx="50" cy="32" rx="20" ry="22" fill="currentColor" opacity="0.2" />
        <path
          d="M 25 52
             Q 25 48 30 48
             L 35 48
             Q 40 48 45 50
             Q 50 52 55 50
             Q 60 48 65 48
             L 70 48
             Q 75 48 75 52
             L 75 95
             Q 75 98 72 98
             L 28 98
             Q 25 98 25 95
             Z"
          fill="currentColor"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}
