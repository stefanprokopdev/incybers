import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";

export default function Card(props: {
  textHighlighted?: string;
  text: React.ReactNode;
  textHighlighted2?: string;
  description: React.ReactNode;
  col?: string;
}) {
  const col = props.col ?? "col--4";
  return (
    <section className={clsx(["col", col, styles.boxRounded, styles.bgWhite])}>
      <section className={"text--center"}>
        <h2 className={clsx(["margin-top--md"])}>
          <span className={styles.textHighlighted}>{props.textHighlighted}</span> {props.text}
          <span className={styles.textHighlighted}> {props.textHighlighted2}</span>
        </h2>
      </section>
      <p>{props.description}</p>
    </section>
  );
}

export function ImageCard(props: {
  textHighlighted?: string;
  text: string;
  textHighlighted2?: string;
  description?: string;
  col?: string;
  image: string;
  link?: string;
  clsnm?: string;
}) {
  const col = props.col ?? "col--4";
  const clsnm = props.clsnm ?? "";
  return (
    <section className={clsx(["col", col, clsnm, styles.boxRounded, styles.bgWhite, styles.imageCard])}>
      <section className={"text--center"}>
        <h2 className={clsx(["margin-top--md margin-bottom--lg"])}>
          <span className={styles.textHighlighted}>{props.textHighlighted}</span> {props.text}
          <span className={styles.textHighlighted}> {props.textHighlighted2}</span>
        </h2>
      </section>
      {props.description && <p>{props.description}</p>}
      <section className={styles.imageWrapper}>
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <img src={props.image} alt={props.text} width={250} height={400} />
        </a>
      </section>
    </section>
  );
}
