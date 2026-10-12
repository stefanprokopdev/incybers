import Link from "@docusaurus/Link";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { JSX } from "react";
import styles from "./index.module.css";

export interface BreadcrumbItem {
  label: string;
  to?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  transparentOnHero?: boolean;
}

export default function Breadcrumbs({ items, className, transparentOnHero }: BreadcrumbsProps): JSX.Element {
  return (
    <nav
      className={`${styles.breadcrumbs} ${transparentOnHero ? styles.breadcrumbsOnHero : ""} ${className || ""}`}
      aria-label="Breadcrumb"
    >
      <div className="container">
        <ol className={styles.breadcrumbsList}>
          <li>
            <Link to="/" aria-label="Domů">
              <FontAwesomeIcon icon={faHome} className={styles.homeIcon} />
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index}>
                {isLast ? (
                  <span aria-current="page" className={styles.breadcrumbCurrent}>
                    {item.label}
                  </span>
                ) : item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
