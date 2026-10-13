import clsx from "clsx";
import React, { JSX, ReactNode } from "react";
import styles from "./index.module.css";

interface CourseLongDescriptionProps {
  children: ReactNode;
  className?: string;
}

/** Obal pro dlouhý popis kurzu (odstavce, seznamy, nadpisy) s jednotným stylováním. */
export default function CourseLongDescription({ children, className }: CourseLongDescriptionProps): JSX.Element {
  return <div className={clsx(styles.longDescription, className)}>{children}</div>;
}
