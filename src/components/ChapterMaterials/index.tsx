import type { ChapterMaterialBlock } from "@site/src/data/learning/types";
import clsx from "clsx";
import React, { JSX, useState } from "react";
import styles from "./index.module.css";

interface ChapterMaterialsProps {
  materials: ChapterMaterialBlock[];
}

export default function ChapterMaterials({ materials }: ChapterMaterialsProps): JSX.Element | null {
  const [activeIndex, setActiveIndex] = useState(0);

  if (materials.length === 0) {
    return null;
  }

  const safeIndex = Math.min(activeIndex, materials.length - 1);
  const active = materials[safeIndex];

  return (
    <section className={styles.section} aria-label="Výukové materiály">
      {materials.length > 1 && (
        <div className={styles.nav} role="tablist" aria-label="Materiály kapitoly">
          {materials.map((material, index) => (
            <button
              key={material.id}
              type="button"
              role="tab"
              aria-selected={index === safeIndex}
              className={clsx(styles.navButton, index === safeIndex && styles.navButtonActive)}
              onClick={() => setActiveIndex(index)}
            >
              {material.title}
            </button>
          ))}
        </div>
      )}

      <h3 className={styles.blockTitle}>{active.title}</h3>

      {active.kind === "text" ? (
        <div className={styles.textContent}>{active.content}</div>
      ) : (
        <>
          <div className={styles.videoWrapper}>
            <iframe
              src={active.embedUrl}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {active.description && <p className={styles.videoDescription}>{active.description}</p>}
        </>
      )}
    </section>
  );
}
