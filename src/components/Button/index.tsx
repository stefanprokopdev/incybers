import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { JSX } from "react";

export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  target,
  rel,
}: ButtonProps): JSX.Element {
  const variantClass = variant === "outline" ? "button--outline" : "button--primary";
  const sizeClass = size === "lg" ? "button--lg" : size === "sm" ? "button--sm" : undefined;

  const classes = clsx("button", variantClass, sizeClass, className);

  if (to) {
    return (
      <Link className={classes} to={to} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
