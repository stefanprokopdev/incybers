import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";

export default (props: { link: string; className?: string }) => {
  return <iframe loading={"lazy"} className={clsx(styles.iframe, props.className)} src={props.link}></iframe>;
};
