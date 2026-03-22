"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./characters.module.css";

type Character = {
  id: "valentina" | "alice" | "noah";
  name: string;
  role: string;
  tagline: string;
  profile: string;
  portraitSrc?: string;
};

export default function CharactersPage() {
  const characters = useMemo<Character[]>(
    () => [
      {
        id: "valentina",
        name: "Valentina Evans",
        role: "Protagonist",
        tagline: "A quiet girl carrying memories she cannot forget.",
        profile:
          "A thoughtful young woman living in a small town. She finds comfort in simple moments, even as fragments of the past surface in unexpected ways.",
        portraitSrc: "/images/demo/characters/Valentina_normal.png",
      },
      {
        id: "alice",
        name: "Alice",
        role: "Companion",
        tagline: "A small presence with an irreplaceable warmth.",
        profile:
          "A lively white dog who brings light into Valentina’s daily life. Her gentle loyalty forms an unspoken bond that words cannot express.",
        portraitSrc: "/images/demo/characters/Alice_normal.png",
      },
      {
        id: "noah",
        name: "Noah",
        role: "???",
        tagline: "A familiar face wrapped in forgotten time.",
        profile:
          "A gentle young man who appears briefly in Valentina’s memories. His presence evokes emotions that even she struggles to understand.",
        portraitSrc: "/images/demo/characters/Noah_normal.png",
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const active = characters[activeIndex];

  function goPrev() {
    setActiveIndex((i) => (i - 1 + characters.length) % characters.length);
  }

  function goNext() {
    setActiveIndex((i) => (i + 1) % characters.length);
  }

  function openFromCard(id: Character["id"]) {
    const idx = characters.findIndex((c) => c.id === id);
    if (idx >= 0) setActiveIndex(idx);

    const el = document.getElementById("character-detail");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={styles.page}>
      <section className={styles.topPanel}>
        <h1 className={styles.title}>Characters</h1>

        <div className={styles.cardRow}>
          {characters.map((c) => (
            <article key={c.id} className={styles.card}>
              <div className={styles.cardPortrait}>
                {c.portraitSrc ? (
                  <div
                    className={`${styles.cardPortraitInner} ${
                      c.id === "valentina"
                        ? styles.valentinaThumb
                        : c.id === "alice"
                          ? styles.aliceThumb
                          : styles.noahThumb
                    }`}
                  >
                    <Image
                      src={c.portraitSrc}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.cardPortraitImg}
                    />
                  </div>
                ) : (
                  <div className={styles.cardPortraitFallback} />
                )}
              </div>

              <div className={styles.cardText}>
                <div className={styles.cardName}>{c.name}</div>
                <div className={styles.cardRole}>{c.role}</div>

                <button
                  className={styles.moreBtn}
                  onClick={() => openFromCard(c.id)}
                  type="button"
                >
                  [More]
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="character-detail" className={styles.bottomPanel}>
        <div className={styles.viewer}>
          <button
            className={styles.arrowBtn}
            onClick={goPrev}
            type="button"
            aria-label="Previous character"
          >
            ‹
          </button>

          <div className={styles.portraitStage}>
            {active.portraitSrc ? (
              <div className={styles.portraitFigure}>
                <Image
                  src={active.portraitSrc}
                  alt={active.name}
                  fill
                  sizes="(max-width: 880px) 240px, 270px"
                  className={styles.portraitImg}
                  priority
                />
              </div>
            ) : (
              <div className={styles.silhouette} />
            )}
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoName}>{active.name}</div>
            <div className={styles.infoTagline}>{active.tagline}</div>

            <div className={styles.infoMeta}>
              <span className={styles.metaLabel}>Role:</span> {active.role}
            </div>

            <div className={styles.infoMeta}>
              <span className={styles.metaLabel}>Short Profile:</span>{" "}
              {active.profile}
            </div>
          </div>

          <button
            className={styles.arrowBtn}
            onClick={goNext}
            type="button"
            aria-label="Next character"
          >
            ›
          </button>
        </div>
      </section>
    </div>
  );
}
