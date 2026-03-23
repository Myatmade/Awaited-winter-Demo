"use client";

import { Fragment } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./story.module.css";

export default function StoryPage() {
  const { content } = useLanguage();

  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.shield}>
          <h1 className={styles.title}>{content.story.title}</h1>

          <p className={styles.synopsis}>
            {content.story.synopsisLines.map((line, index) => (
              <Fragment key={`${line.slice(0, 16)}-${index}`}>
                {line}
                {index < content.story.synopsisLines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
