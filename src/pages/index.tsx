import AuthForm from "@site/src/components/AuthForm";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { JSX } from "react";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const title = "Přihlášení";
  const description = "Přihlášení do výukové platformy Outcybers – kurzy, kapitoly a kvízy.";

  return (
    <Layout
      noFooter
      noEventBar
      title={title}
      description={description}
      wrapperClassName={clsx(styles.loginLayout, "layout-login")}
    >
      <main className={styles.loginMain}>
        <div className={styles.loginBlock}>
          <h1 className={styles.loginTitle}>Přihlásit se do výukové platformy</h1>
          <AuthForm />
        </div>
      </main>
    </Layout>
  );
}
