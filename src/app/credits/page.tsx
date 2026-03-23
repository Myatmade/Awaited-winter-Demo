"use client";

import { Fragment } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./credits.module.css";

export default function CreditsPage() {
  const { content } = useLanguage();

  return (
    <div className={styles.creditsPage}>
      <section className={styles.creditsPanel}>
        <div className={styles.creditsCard}>
          <h1 className={styles.creditsTitle}>{content.credits.title}</h1>

          <p className={styles.creditsText}>
            {content.credits.lines.map((line, index) => (
              <Fragment key={`${line.slice(0, 24)}-${index}`}>
                {line}
                {index < content.credits.lines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
