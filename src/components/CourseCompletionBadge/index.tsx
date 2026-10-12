import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolid } from "@site/src/utils/faIcon";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./index.module.css";

interface CourseCompletionBadgeProps {
  large?: boolean;
  className?: string;
}

export default function CourseCompletionBadge({ large, className }: CourseCompletionBadgeProps): JSX.Element {
  return (
    <span className={clsx(styles.badge, large && styles.large, className)}>
      <FontAwesomeIcon icon={faSolid("certificate")} className={styles.icon} aria-hidden />
      Kurz dokončen
    </span>
  );
}
