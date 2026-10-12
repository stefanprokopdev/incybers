import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolid, type IconName } from '@site/src/utils/faIcon';
import React from 'react';
import styles from './index.module.css';

export interface ArticleAnnotationProps {
  icon: IconName;
  highlightedText: string;
  title: string;
  introText: React.ReactNode;
  description: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  showButton?: boolean;
  showDescription?: boolean;
}

export default function ArticleAnnotation({
  icon,
  highlightedText,
  title,
  introText,
  description,
  buttonText,
  buttonLink,
  onClose,
  showCloseButton = false,
  showButton = true,
  showDescription = true,
}: ArticleAnnotationProps): React.JSX.Element {
  return (
    <div className={styles.annotationCard}>
      <div className={styles.annotationBackgroundIcon}>
        <FontAwesomeIcon icon={faSolid(icon)} size="6x" />
      </div>
      <div className={styles.annotationContent}>
        <h3 className={styles.annotationTitle}>
          <span className={styles.annotationTextHighlighted}>{highlightedText}</span> {title}
        </h3>
        <div className={styles.annotationDescription}>
          {introText}
          {showDescription && description}
        </div>
        {showButton && (
          <div className={styles.annotationButtonWrapper}>
            <Link className={styles.annotationButton} to={buttonLink}>
              {buttonText}
            </Link>
          </div>
        )}
      </div>
      {showCloseButton && onClose && (
        <button 
          className={styles.annotationCloseButton}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Zavřít anotaci"
        >
          ×
        </button>
      )}
    </div>
  );
}
