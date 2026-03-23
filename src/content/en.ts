import type { SiteContent } from "@/content/types";

export const en: SiteContent = {
  header: {
    home: "Home",
    demo: "Demo",
    story: "Story",
    characters: "Characters",
    about: "About",
    credits: "Credits",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    goHome: "Go to home",
  },
  footer: {
    copyright: "© 2026 Myat Ma De May Phuu Ngon.",
    assets: "Some assets used under license.",
  },
  home: {
    quoteLines: [
      "A winter night.",
      "A forgotten promise.",
      "A memory that never faded.",
    ],
  },
  story: {
    title: "Story",
    synopsisLines: [
      "Some promises are buried.",
      "Some names fade into silence.",
      "But are they ever truly lost?",
      "",
      "The Awaited Winter follows Valentina as old memories resurface",
      "and lead her back to the one winter she could never escape.",
    ],
  },
  about: {
    title: "About",
    paragraphs: [
      "The Awaited Winter is an original story written by Myat Ma De May Phuu Ngon, based on a short story written in Burmese that received a winter themed contest award in 2022.",
      "This website reimagines the original work as an interactive narrative by combining creative writing with web technology.",
      "Through this project, I explore how storytelling can be presented in a more immersive form while developing my skills in web development, and UI/UX design.",
    ],
  },
  credits: {
    title: "Credits",
    lines: [
      "Story and Creative Direction",
      "Myat Ma De May Phuu Ngon",
      "",
      "Web Design and Development",
      "Myat Ma De May Phuu Ngon",
      "",
      "Character and CG Artwork",
      "Leonardo AI-assisted, refined by the author",
      "Some artwork created entirely by the author",
      "",
      "Music",
      '"No Copyright Music" by The Mountain',
      '"Sad Piano Lost Love (30 sec)" by WaveMaster',
      '"Shalom Aleichem" by NikitaKondrashev',
      '"Stairs into the Unknown (Dark Piano Music)" by JuliusH',
      '"A Little Dream" by Piano_Music',
      "",
      "All music sourced from Pixabay",
    ],
  },
  characters: {
    title: "Characters",
    more: "[More]",
    roleLabel: "Role:",
    profileLabel: "Profile:",
    previousCharacter: "Previous character",
    nextCharacter: "Next character",
    items: {
      valentina: {
        name: "Valentina Evans",
        role: "Protagonist",
        tagline: "A quiet young woman carrying memories she cannot forget.",
        profile:
          "Living in her small town, Valentina is trying to find comfort in ordinary days, but one winter begins a trigger to remind what she is trying to move on from.",
      },
      alice: {
        name: "Alice",
        role: "Companion",
        tagline: "A small presence with an irreplaceable warmth.",
        profile:
          "A lively white dog who brings light into Valentina’s life, always near in the moments that matter most.",
      },
      noah: {
        name: "Noah",
        role: "???",
        tagline: "A familiar face wrapped in forgotten time.",
        profile:
          "A gentle young man whose presence stirs something in Valentina, as if something important was left resolved.",
      },
    },
  },
  demo: {
    kicker: "Demo",
    welcomeTitle: "Welcome",
    welcomeBody: "Click to progress through the story.",
    beginStory: "Begin Story",
    endKicker: "End of Demo",
    endTitle: "To be continued...",
    endBody: "Thank you for reading.",
    playAgain: "Play Again",
    backToHome: "Back to Home",
    restart: "Restart",
    back: "Back",
    next: "Next",
    end: "End",
    choicePrompt: "What should Valentina do?",
    choiceA: "A: Search frantically in my coat pocket",
    choiceB: "B: Call out for help",
  },
};
