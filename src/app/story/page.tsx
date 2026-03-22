import styles from "./story.module.css";

export default function StoryPage() {
  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.shield}>
          <h1 className={styles.title}>Story</h1>

          <p className={styles.synopsis}>
            Winter returns to the same town every year.
            <br />
            Some memories fade with time.
            <br />
            Others remain — quietly waiting beneath the surface.
            <br />
            <br />
            A forgotten promise.
            <br />
            A name that lingers.
            <br />
            A night that was never meant to end the way it did.
            <br />
            <br />
            The Awaited Winter is a story about separation, time, and the
            fragile hope that certain encounters are not meant to be final.
          </p>
        </div>
      </section>
    </div>
  );
}
