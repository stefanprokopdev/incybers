import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import { faSolid } from "@site/src/utils/faIcon";
import { formatCpeCredits } from "@site/src/utils/learningLogic";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./index.module.css";

interface CourseInfoBadgesProps {
  course: Pick<LearningCourseDefinition, "estimatedTime" | "cpeCredits">;
  className?: string;
}

/** Badge s časem potřebným ke splnění kurzu a s počtem CPE kreditů. Nevyplněné údaje se nezobrazí. */
export default function CourseInfoBadges({ course, className }: CourseInfoBadgesProps): JSX.Element | null {
  const { estimatedTime, cpeCredits } = course;

  if (!estimatedTime && cpeCredits === undefined) {
    return null;
  }

  return (
    <div className={clsx(styles.badges, className)}>
      {estimatedTime && (
        <span className={styles.badge} title="Čas potřebný ke splnění kurzu">
          <FontAwesomeIcon icon={faSolid("clock")} className={styles.icon} aria-hidden />
          {estimatedTime}
        </span>
      )}
      {cpeCredits !== undefined && (
        <span className={styles.badge} title="Počet CPE kreditů za absolvování kurzu">
          <FontAwesomeIcon icon={faSolid("award")} className={styles.icon} aria-hidden />
          CPE kredity:&nbsp;{formatCpeCredits(cpeCredits)}
        </span>
      )}
    </div>
  );
}
