"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./page.module.css";
import splashImage from "../../public/images/home/Splash.jpg";

export default function HomePage() {
  const { content } = useLanguage();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src={splashImage}
          alt="Splash art"
          priority
          sizes="100vw"
          className={styles.splash}
        />
      </section>

      <section className={styles.textSection}>
        <div className={styles.panel}>
          <div className={styles.shield}>
            <p className={styles.quote}>
              {content.home.quoteLines.map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {index === 0 ? '"' : ""}
                  {line}
                  {index === content.home.quoteLines.length - 1 ? '"' : ""}
                  {index < content.home.quoteLines.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
