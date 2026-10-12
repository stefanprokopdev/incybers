import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumbs, { BreadcrumbItem } from "@site/src/components/Breadcrumbs";
import Button from "@site/src/components/Button";
import HeroEventRegistration from "@site/src/components/HeroEventRegistration";
import HeroImageWithFrame from "@site/src/components/HeroImageWithFrame";
import HeroBackgroundSvg from "@site/src/components/HeroSection/HeroBackgroundSvg";
import { faSolid, type IconName } from "@site/src/utils/faIcon";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./index.module.css";

library.add(fas);

export interface HeroSectionProps {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  subtitle2?: string | JSX.Element;
  buttonText?: string;
  buttonLink?: string;
  buttonText2?: string;
  buttonLink2?: string;
  buttonVariant?: "primary" | "warning";
  iconName?: IconName;
  showAdditionalText?: boolean;
  additionalText?: string | JSX.Element;
  listItems?: (string | React.ReactNode)[];
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  heroImageWithFrame?: boolean;
  /** Custom content for the right column (e.g. auth form). Takes precedence over image / event registration. */
  rightContent?: React.ReactNode;
  showTerminal?: boolean;
  terminalTitle?: string;
  showTrafficWall?: boolean;
  showSocAnimation?: boolean;
  showZtnaMockup?: boolean;
  showCodeReviewMockup?: boolean;
  breadcrumbItems?: BreadcrumbItem[];
  isHomeHero?: boolean;
  topContent?: React.ReactNode;
  compact?: boolean;
  showPartners?: boolean;
  showEventRegistration?: boolean;
  colLeft?: number;
  colRight?: number;
}

export default function HeroSection({
  title,
  subtitle,
  subtitle2,
  buttonText,
  buttonLink = "#poptavka",
  buttonText2,
  buttonLink2,
  buttonVariant = "primary",
  iconName = "list-check",
  showAdditionalText = false,
  additionalText,
  listItems,
  children,
  imageSrc,
  imageAlt,
  heroImageWithFrame = false,
  rightContent,
  showTerminal = false,
  showTrafficWall = false,
  showSocAnimation = false,
  showZtnaMockup = false,
  showCodeReviewMockup = false,
  breadcrumbItems,
  isHomeHero: isHomeHeroProp = true,
  topContent,
  compact = false,
  showPartners = false,
  showEventRegistration = false,
  colLeft = 6,
  colRight = 6,
}: HeroSectionProps): JSX.Element {
  const isHomeHero = isHomeHeroProp;
  const resolvedTopContent =
    breadcrumbItems && breadcrumbItems.length > 0 ? (
      <Breadcrumbs items={breadcrumbItems} transparentOnHero />
    ) : (
      topContent
    );

  const showRightColumn = showTerminal || showTrafficWall || showSocAnimation || showZtnaMockup || showCodeReviewMockup;
  const showContentRightColumn = Boolean(rightContent) || Boolean(imageSrc) || showEventRegistration;
  return (
    <header
      className={clsx(
        styles.heroBannerModern,
        isHomeHero && styles.heroBannerModernHome,
        compact && styles.heroBannerModernCompact,
      )}
      data-hero
      {...(isHomeHero && { "data-home-hero": "" })}
    >
      {isHomeHero && <HeroBackgroundSvg />}
      <div className={clsx(styles.floatingParticle)}></div>
      <div className={clsx(styles.floatingParticle)}></div>
      <div className={clsx(styles.floatingParticle)}></div>
      <div className={clsx(styles.floatingParticle)}></div>
      <div className={clsx(styles.floatingParticle)}></div>
      <div className={clsx("container", styles.heroBannerContainer)}>
        {isHomeHero && resolvedTopContent && (
          <div className={styles.heroTopContent} style={{ position: "relative", zIndex: 10 }}>
            {resolvedTopContent}
          </div>
        )}
        {!imageSrc && !showRightColumn && !showContentRightColumn && iconName && (
          <div className={styles.backgroundIcon}>
            <FontAwesomeIcon icon={faSolid(iconName)} size="6x" />
          </div>
        )}
        {showTerminal || showTrafficWall || showSocAnimation || showZtnaMockup || showCodeReviewMockup ? (
          <div className="row" style={{ position: "relative", zIndex: 10, alignItems: "center" }}>
            <div className={clsx(`col col--${colLeft}`)} {...(subtitle ? { "data-has-subtitle": "true" } : {})}>
              <h1 className={clsx(["hero__title", "mb-6", "text--left"])}>{title}</h1>
              {subtitle && (
                <div className={clsx(["hero__subtitle", "text--left", subtitle2 ? "mb-4" : ""])}>{subtitle}</div>
              )}
              {subtitle2 && <div className={clsx(["hero__subtitle", "text--left", "mt-4", "mb-0"])}>{subtitle2}</div>}
              {listItems && listItems.length > 0 && (
                <ul className={clsx("hero__subtitle", "text--left", styles.heroList)}>
                  {listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              {showAdditionalText && additionalText && (
                <div className={clsx("relative", styles.additionalText)} style={{ zIndex: 10 }}>
                  <div className={clsx("text-left mb-8 text-lg md:text-base sm:text-[0.95rem] leading-7")}>
                    {additionalText}
                  </div>
                </div>
              )}
              {children}
              {(buttonText || buttonText2) && (
                <section
                  className={clsx(
                    styles.heroButtons,
                    styles.heroButtonsLeft,
                    "margin-bottom--lg",
                    "margin-top--lg",
                    "relative",
                  )}
                  style={{ zIndex: 10 }}
                >
                  {buttonText && (
                    <Button to={buttonLink} variant={buttonVariant === "warning" ? "primary" : buttonVariant} size="lg">
                      {buttonText}
                    </Button>
                  )}
                  {buttonText2 && (
                    <Button to={buttonLink2 || "#sluzby"} variant="outline" size="lg">
                      {buttonText2}
                    </Button>
                  )}
                </section>
              )}
            </div>
          </div>
        ) : showContentRightColumn ? (
          <div className="row" style={{ position: "relative", zIndex: 10, alignItems: "center" }}>
            <div
              className={clsx(`col col--${colLeft}`, colLeft)}
              {...(subtitle ? { "data-has-subtitle": "true" } : {})}
            >
              <h1 className={clsx(["hero__title", "mb-6", "text--left"])}>{title}</h1>
              {subtitle && (
                <div className={clsx(["hero__subtitle", "text--left", subtitle2 ? "mb-4" : ""])}>{subtitle}</div>
              )}
              {subtitle2 && <div className={clsx(["hero__subtitle", "text--left", "mt-4", "mb-0"])}>{subtitle2}</div>}
              {listItems && listItems.length > 0 && (
                <ul className={clsx("hero__subtitle", "text--left", styles.heroList)}>
                  {listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              {showAdditionalText && additionalText && (
                <div className={clsx("relative", styles.additionalText)} style={{ zIndex: 10 }}>
                  <div className={clsx("text-left mb-8 text-lg md:text-base sm:text-[0.95rem] leading-7")}>
                    {additionalText}
                  </div>
                </div>
              )}
              {children}
              {(buttonText || buttonText2) && (
                <section
                  className={clsx(
                    styles.heroButtons,
                    styles.heroButtonsLeft,
                    "margin-bottom--lg",
                    "margin-top--lg",
                    "relative",
                  )}
                  style={{ zIndex: 10 }}
                >
                  {buttonText && (
                    <Button to={buttonLink} variant={buttonVariant === "warning" ? "primary" : buttonVariant} size="lg">
                      {buttonText}
                    </Button>
                  )}
                  {buttonText2 && (
                    <Button to={buttonLink2 || "#sluzby"} variant="outline" size="lg">
                      {buttonText2}
                    </Button>
                  )}
                </section>
              )}
            </div>
            <div className={clsx(`col col--${colRight}`)}>
              {rightContent ? (
                rightContent
              ) : showEventRegistration ? (
                <HeroEventRegistration
                  fallback={
                    imageSrc ? (
                      <HeroImageWithFrame imageSrc={imageSrc} imageAlt={imageAlt} withFrame={heroImageWithFrame} />
                    ) : undefined
                  }
                />
              ) : (
                imageSrc && (
                  <HeroImageWithFrame imageSrc={imageSrc} imageAlt={imageAlt} withFrame={heroImageWithFrame} />
                )
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-[900px] mx-auto text-center relative" style={{ zIndex: 10 }}>
            <h1 className={clsx(["hero__title", "mb-6"])}>{title}</h1>
            {subtitle && <div className={clsx(["hero__subtitle", "mx-auto", subtitle2 ? "mb-4" : ""])}>{subtitle}</div>}
            {subtitle2 && <div className={clsx(["hero__subtitle", "mx-auto", "mt-4"])}>{subtitle2}</div>}
            {listItems && listItems.length > 0 && (
              <ul
                className={clsx("hero__subtitle", "mx-auto", styles.heroList)}
                style={{ display: "inline-block", textAlign: "left" }}
              >
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            {showAdditionalText && additionalText && (
              <div className={clsx("relative", styles.additionalText)} style={{ zIndex: 10 }}>
                <div
                  className={clsx(
                    "text-center mb-8 text-lg md:text-base sm:text-[0.95rem] leading-7 max-w-[800px] mx-auto",
                  )}
                >
                  {additionalText}
                </div>
              </div>
            )}
            {children}
            {(buttonText || buttonText2) && (
              <div className={clsx(styles.heroButtons, "mt-6", "relative")} style={{ zIndex: 10 }}>
                {buttonText && (
                  <Button to={buttonLink} variant={buttonVariant === "warning" ? "primary" : buttonVariant} size="lg">
                    {buttonText}
                  </Button>
                )}
                {buttonText2 && (
                  <Button to={buttonLink2 || "#sluzby"} variant="outline" size="lg">
                    {buttonText2}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
        {showPartners && <div className="container margin-top--lg"></div>}
      </div>
    </header>
  );
}
