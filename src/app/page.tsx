import Image from "next/image";
import styles from "./page.module.css";
import splashImage from "../../public/images/home/Splash.jpg";

export default function HomePage() {
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
        <div className={styles.shield}>
          <p className={styles.quote}>
            "A winter night.
            <br />
            A forgotten promise.
            <br />A memory that never faded."
          </p>
        </div>
      </section>
    </div>
  );
}
