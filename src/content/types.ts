export type Language = "en" | "jp";

type CharacterEntry = {
  name: string;
  role: string;
  tagline: string;
  profile: string;
};

export type SiteContent = {
  header: {
    home: string;
    demo: string;
    story: string;
    characters: string;
    about: string;
    credits: string;
    openMenu: string;
    closeMenu: string;
    goHome: string;
  };
  footer: {
    copyright: string;
    assets: string;
  };
  home: {
    quoteLines: string[];
  };
  story: {
    title: string;
    synopsisLines: string[];
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  credits: {
    title: string;
    lines: string[];
  };
  characters: {
    title: string;
    more: string;
    roleLabel: string;
    profileLabel: string;
    previousCharacter: string;
    nextCharacter: string;
    items: {
      valentina: CharacterEntry;
      alice: CharacterEntry;
      noah: CharacterEntry;
    };
  };
  demo: {
    kicker: string;
    welcomeTitle: string;
    welcomeBody: string;
    beginStory: string;
    endKicker: string;
    endTitle: string;
    endBody: string;
    playAgain: string;
    backToHome: string;
    restart: string;
    back: string;
    next: string;
    end: string;
    choicePrompt: string;
    choiceA: string;
    choiceB: string;
  };
};
