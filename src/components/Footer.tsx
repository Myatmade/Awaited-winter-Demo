"use client";

import styles from "@/styles/footer.module.css";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { content } = useLanguage();

  return (
    <footer className={styles.footer}>
      {[
        <span className={styles.footerLine} key="copyright">
          {content.footer.copyright}
        </span>,
        <span className={styles.footerLine} key="assets">
          {content.footer.assets}
        </span>,
      ]}
    </footer>
  );
}
