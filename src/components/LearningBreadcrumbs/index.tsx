import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolid } from "@site/src/utils/faIcon";
import { LEARNING_DASHBOARD_PATH } from "@site/src/utils/learningRoutes";
import React, { JSX } from "react";
import styles from "./index.module.css";

export interface LearningBreadcrumbItem {
  label: string;
  /** Položka bez `to` je aktuální stránka (nelze na ni kliknout). */
  to?: string;
}

interface LearningBreadcrumbsProps {
  /** Položky za kořenem „Moje kurzy“, který se přidává automaticky. */
  items?: LearningBreadcrumbItem[];
}

export default function LearningBreadcrumbs({ items = [] }: LearningBreadcrumbsProps): JSX.Element {
  const trail: LearningBreadcrumbItem[] = [{ label: "Moje kurzy", to: LEARNING_DASHBOARD_PATH }, ...items];

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {trail.map((item, index) => (
          <li key={`${item.label}-${index}`} className={styles.item}>
            {index > 0 && <FontAwesomeIcon icon={faSolid("chevron-right")} className={styles.separator} aria-hidden />}
            {item.to ? (
              <Link className={styles.link} to={item.to} title={item.label}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current} aria-current="page" title={item.label}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
