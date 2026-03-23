"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "@/styles/header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, content } = useLanguage();

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link
          href="/"
          aria-label={content.header.goHome}
          className={styles.logoLink}
        >
          <Image
            src="/images/home/Logo.png"
            alt="The Awaited Winter"
            width={2048}
            height={1028}
            priority
            className={styles.logoImage}
          />
        </Link>
      </div>

      <div className={styles.rightSide}>
        <nav className={styles.nav}>
          <Link href="/" className={isActive("/") ? styles.activeLink : ""}>
            {content.header.home}
          </Link>

          <Link
            href="/demo"
            className={isActive("/demo") ? styles.activeLink : ""}
          >
            {content.header.demo}
          </Link>

          <Link
            href="/story"
            className={isActive("/story") ? styles.activeLink : ""}
          >
            {content.header.story}
          </Link>

          <Link
            href="/characters"
            className={isActive("/characters") ? styles.activeLink : ""}
          >
            {content.header.characters}
          </Link>

          <Link
            href="/about"
            className={isActive("/about") ? styles.activeLink : ""}
          >
            {content.header.about}
          </Link>

          <Link
            href="/credits"
            className={isActive("/credits") ? styles.activeLink : ""}
          >
            {content.header.credits}
          </Link>

          <div className={styles.langSwitch}>
            <button
              type="button"
              className={`${styles.langButton} ${language === "en" ? styles.langActive : ""}`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <span className={styles.langDivider}>/</span>
            <button
              type="button"
              className={`${styles.langButton} ${language === "jp" ? styles.langActive : ""}`}
              onClick={() => setLanguage("jp")}
            >
              JP
            </button>
          </div>
        </nav>

        <div className={styles.mobileActions}>
          <div className={styles.langSwitch}>
            <button
              type="button"
              className={`${styles.langButton} ${language === "en" ? styles.langActive : ""}`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <span className={styles.langDivider}>/</span>
            <button
              type="button"
              className={`${styles.langButton} ${language === "jp" ? styles.langActive : ""}`}
              onClick={() => setLanguage("jp")}
            >
              JP
            </button>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={
              menuOpen ? content.header.closeMenu : content.header.openMenu
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={styles.menuIcon}
              fill="none"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="#cfe3ff"
                strokeWidth="2"
              />
              <rect
                x="7"
                y="7"
                width="10"
                height="2"
                rx="1"
                stroke="#cfe3ff"
                strokeWidth="1.8"
              />
              <rect
                x="7"
                y="11"
                width="10"
                height="2"
                rx="1"
                stroke="#cfe3ff"
                strokeWidth="1.8"
              />
              <rect
                x="7"
                y="15"
                width="10"
                height="2"
                rx="1"
                stroke="#cfe3ff"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <nav className={styles.mobileNav}>
          <Link href="/" className={isActive("/") ? styles.activeLink : ""}>
            {content.header.home}
          </Link>

          <Link
            href="/demo"
            className={isActive("/demo") ? styles.activeLink : ""}
          >
            {content.header.demo}
          </Link>

          <Link
            href="/story"
            className={isActive("/story") ? styles.activeLink : ""}
          >
            {content.header.story}
          </Link>

          <Link
            href="/characters"
            className={isActive("/characters") ? styles.activeLink : ""}
          >
            {content.header.characters}
          </Link>

          <Link
            href="/about"
            className={isActive("/about") ? styles.activeLink : ""}
          >
            {content.header.about}
          </Link>

          <Link
            href="/credits"
            className={isActive("/credits") ? styles.activeLink : ""}
          >
            {content.header.credits}
          </Link>
        </nav>
      </div>
    </header>
  );
}
