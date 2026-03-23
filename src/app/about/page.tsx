"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./about.module.css";

export default function AboutPage() {
  const { content } = useLanguage();

  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.shield}>
          <h1 className={styles.title}>{content.about.title}</h1>

          <p className={styles.body}>
            {content.about.paragraphs.map((paragraph, index) => (
              <Fragment key={`${paragraph.slice(0, 20)}-${index}`}>
                {paragraph}
                {index < content.about.paragraphs.length - 1 ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
              </Fragment>
            ))}
          </p>
          <Image
            src="/images/home/Logo.png"
            alt="The Awaited Winter"
            width={2048}
            height={1028}
            className={styles.bottomLogo}
          />
        </div>
      </section>
    </div>
  );
}
