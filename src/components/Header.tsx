"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" aria-label="Go to home" className={styles.logoLink}>
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

      <nav className={styles.nav}>
        <Link href="/" className={isActive("/") ? styles.activeLink : ""}>
          Home
        </Link>

        <Link
          href="/demo"
          className={isActive("/demo") ? styles.activeLink : ""}
        >
          Demo
        </Link>

        <Link
          href="/story"
          className={isActive("/story") ? styles.activeLink : ""}
        >
          Story
        </Link>

        <Link
          href="/characters"
          className={isActive("/characters") ? styles.activeLink : ""}
        >
          Characters
        </Link>

        <Link
          href="/about"
          className={isActive("/about") ? styles.activeLink : ""}
        >
          About
        </Link>

        <span className={styles.lang}>EN / JP</span>
      </nav>
    </header>
  );
}
