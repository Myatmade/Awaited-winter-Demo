import Image from "next/image";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.shield}>
          <h1 className={styles.title}>About</h1>

          <p className={styles.body}>
            The Awaited Winter is an original story written by Myat Ma De May
            Phuu Ngon, based on a short story that received an award in 2022.
            <br />
            <br />
            This website reimagines the original work as an interactive
            narrative, combining creative writing with web technology.
            <br />
            <br />
            Through this project, I aim to explore new ways of storytelling and
            to present my work in a more immersive form.
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
