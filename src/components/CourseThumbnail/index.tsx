import useBaseUrl from "@docusaurus/useBaseUrl";
import type { LearningCourseDefinition } from "@site/src/data/learning/types";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./index.module.css";

interface CourseThumbnailProps {
  course: Pick<LearningCourseDefinition, "image">;
  className?: string;
  /** `card` = celá šířka v poměru 1200×630, `banner` = stejně, ale s omezenou výškou na širokých obrazovkách. */
  variant?: "card" | "banner";
}

/** Náhledový obrázek kurzu. Pokud kurz žádný nemá, nevykreslí nic. */
export default function CourseThumbnail({
  course,
  className,
  variant = "card",
}: CourseThumbnailProps): JSX.Element | null {
  const src = useBaseUrl(course.image?.src ?? "");

  if (!course.image) {
    return null;
  }

  return (
    <img
      className={clsx(styles.thumbnail, variant === "banner" && styles.banner, className)}
      src={src}
      alt={course.image.alt}
      width={1200}
      height={630}
      loading="lazy"
    />
  );
}
