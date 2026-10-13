import Button from "@site/src/components/Button";
import { isFullName, normalizeFullName } from "@site/src/utils/learningLogic";
import { updateProfile, type User } from "firebase/auth";
import React, { FormEvent, JSX, useState } from "react";
import styles from "./index.module.css";

interface CertificateNameFormProps {
  user: User;
  onSaved: (fullName: string) => void;
}

/** Vyžádá celé jméno (včetně příjmení) pro certifikát a uloží ho do profilu účtu. */
export default function CertificateNameForm({ user, onSaved }: CertificateNameFormProps): JSX.Element {
  const [name, setName] = useState(normalizeFullName(user.displayName));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullName = normalizeFullName(name);

    if (!isFullName(fullName)) {
      setError("Zadejte celé jméno včetně příjmení.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await updateProfile(user, { displayName: fullName });
      onSaved(fullName);
    } catch {
      setError("Jméno se nepodařilo uložit. Zkuste to prosím znovu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={(event) => void handleSubmit(event)} noValidate>
      <h2 className={styles.title}>Jméno pro certifikát</h2>
      <p className={styles.hint}>
        Na certifikátu musí být uvedené celé jméno včetně příjmení. Zadejte ho prosím tak, jak se má na certifikátu
        zobrazit. Uložíme ho do vašeho profilu.
      </p>
      <label className={styles.label} htmlFor="certificate-full-name">
        Jméno a příjmení
      </label>
      <div className={styles.row}>
        <input
          id="certificate-full-name"
          className={styles.input}
          type="text"
          autoComplete="name"
          placeholder="Jan Novák"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={saving}
          required
        />
        <Button type="submit" disabled={saving}>
          {saving ? "Ukládám…" : "Zobrazit certifikát"}
        </Button>
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
