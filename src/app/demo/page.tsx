"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./demo.module.css";

type CharacterId = "valentina" | "noah" | "alice";
type BgId = "god" | "field" | "plaza" | "bedroom";
type MusicId = "god" | "dream" | "tense" | "room" | "none";
type CharacterSlot = "left" | "right" | "roomCenter" | "bigCenter";

type Line = {
  speaker?: string;
  text: string;
  bg?: BgId;
  music?: MusicId;
  show?: CharacterId[];
  hide?: CharacterId[];
  pose?: Partial<Record<CharacterId, string>>;
  slot?: Partial<Record<CharacterId, CharacterSlot>>;
  thought?: boolean;
  narration?: boolean;
};
type Choice = {
  id: string;
  label: string;
  branch: "A" | "B";
};

type Step =
  | {
      type: "line";
      id: string;
      line: Line;
    }
  | {
      type: "choice";
      id: string;
      prompt: string;
      options: Choice[];
    };

const BACKGROUNDS: Record<BgId, string> = {
  god: "/images/demo/bg/God&Flower.jpg",
  field: "/images/demo/bg/FlowerField.jpg",
  plaza: "/images/demo/bg/ChristmasMarket.jpg",
  bedroom: "/images/demo/bg/Bedroom.jpg",
};

const CHARACTER_SPRITES: Record<CharacterId, Record<string, string>> = {
  valentina: {
    neutral: "/images/demo/characters/Valentina_normal.png",
    smile: "/images/demo/characters/Valentina_smile.png",
    hurt: "/images/demo/characters/Valentina_hurt.png",
    angry: "/images/demo/characters/Valentina_angry.png",
  },
  noah: {
    smile: "/images/demo/characters/Noah_smile.png",
    neutral: "/images/demo/characters/Noah_normal.png",
  },
  alice: {
    neutral: "/images/demo/characters/Alice_normal.png",
  },
};

const MUSIC_SRC: Record<Exclude<MusicId, "none">, string> = {
  god: "/audio/flower&god.mp3",
  dream: "/audio/dream.mp3",
  tense: "/audio/danger.mp3",
  room: "/audio/room.mp3",
};

const CHARACTER_LABELS: Record<CharacterId, string> = {
  valentina: "Valentina",
  noah: "Noah",
  alice: "Alice",
};

const DEFAULT_POSES: Record<CharacterId, string> = {
  valentina: "neutral",
  noah: "smile",
  alice: "neutral",
};

const SLOT_CLASS_MAP: Record<CharacterSlot, string> = {
  left: styles.leftCharacter,
  right: styles.rightCharacter,
  roomCenter: styles.roomValentina,
  bigCenter: styles.bigCenterCharacter,
};

const DEFAULT_SLOTS: Record<CharacterId, CharacterSlot> = {
  valentina: "left",
  noah: "right",
  alice: "bigCenter",
};

const baseSteps: Step[] = [
  {
    type: "line",
    id: "g1",
    line: {
      narration: true,
      bg: "god",
      music: "god",
      text: "Many ages ago...",
    },
  },
  {
    type: "line",
    id: "g2",
    line: {
      narration: true,
      text: "God summoned each flower in the world individually, bestowing upon them unique names.",
    },
  },
  {
    type: "line",
    id: "g3",
    line: {
      narration: true,
      text: `"Angel's Trumpet, Witch Hazel, Spider Lily..."`,
    },
  },
  {
    type: "line",
    id: "g4",
    line: {
      narration: true,
      text: "But, God overlooked one tiny flower, inadvertently skipping its turn.",
    },
  },
  {
    type: "line",
    id: "g5",
    line: {
      narration: true,
      text: "The small flower cried out to God.",
    },
  },
  {
    type: "line",
    id: "g6",
    line: {
      narration: true,
      text: `"Please, Your Highness, do not forget me..."`,
    },
  },
  {
    type: "line",
    id: "g7",
    line: {
      narration: true,
      text: "In response, God heard the flower's pleas and blessed it with the name...",
    },
  },
  {
    type: "line",
    id: "g8",
    line: {
      narration: true,
      text: `"Forget-Me-Not."`,
    },
  },
  {
    type: "line",
    id: "g9",
    line: {
      narration: true,
      text: ".......",
    },
  },
  {
    type: "line",
    id: "g10",
    line: {
      narration: true,
      text: ".......",
    },
  },
  {
    type: "line",
    id: "g11",
    line: {
      narration: true,
      bg: "field",
      text: ".......",
    },
  },
  {
    type: "line",
    id: "g12",
    line: {
      narration: true,
      bg: "field",
      music: "god",
      hide: ["valentina", "noah", "alice"],
      text: `"I hope this place is the best place to bury our treasure."`,
    },
  },

  {
    type: "line",
    id: "p1",
    line: {
      bg: "plaza",
      music: "dream",
      narration: true,
      show: ["alice"],
      hide: ["valentina", "noah"],
      pose: { alice: "neutral" },
      slot: { alice: "bigCenter" },
      text: `"Woof! Woof!"`,
    },
  },
  {
    type: "line",
    id: "p2",
    line: {
      narration: true,
      text: "A soft tug travels through the leash in my hand.",
    },
  },
  {
    type: "line",
    id: "p3",
    line: {
      narration: true,
      text: "At its end, a small white dog sits obediently beside me, her tail wagging without pause.",
    },
  },
  {
    type: "line",
    id: "p4",
    line: {
      narration: true,
      text: "Fluffy. Bright-eyed. Alive.",
    },
  },
  {
    type: "line",
    id: "p5",
    line: {
      speaker: "Valentina",
      thought: true,
      show: ["valentina", "alice"],
      hide: ["noah"],
      pose: { valentina: "smile" },
      slot: { valentina: "left", alice: "right" },
      text: "Alice.",
    },
  },
  {
    type: "line",
    id: "p6",
    line: {
      show: ["noah"],
      hide: ["valentina", "alice"],
      pose: { noah: "smile" },
      slot: { noah: "bigCenter" },
      speaker: "Noah",
      text: "For Alice.",
    },
  },
  {
    type: "line",
    id: "p7",
    line: {
      speaker: "Noah",
      text: "A sweet girl like her deserves a little something during this time of the year.",
    },
  },
  {
    type: "line",
    id: "p8",
    line: {
      show: ["noah", "valentina"],
      hide: ["alice"],
      slot: { noah: "right", valentina: "left" },
      narration: true,
      text: "A deep voice breaks through the noise around me.",
    },
  },
  {
    type: "line",
    id: "p9",
    line: {
      narration: true,
      text: "It comes from my left. I turn.",
    },
  },
  {
    type: "line",
    id: "p10",
    line: {
      hide: ["alice", "valentina"],
      slot: { noah: "bigCenter" },
      narration: true,
      text: "A pair of gloved hands reaches out, holding a small red box — no bigger than my palm.",
    },
  },
  {
    type: "line",
    id: "p11",
    line: {
      narration: true,
      text: "Slowly, my gaze follows the hands upward.",
    },
  },
  {
    type: "line",
    id: "p12",
    line: {
      narration: true,
      text: "A teenage boy stands before me.",
    },
  },
  {
    type: "line",
    id: "p13",
    line: {
      narration: true,
      pose: { noah: "neutral" },
      text: "His dark eyes filled with gentle warmth. Skin pale as moonlight. Silver hair cascading like liquid metal beneath the plaza lights.",
    },
  },
  {
    type: "line",
    id: "p14",
    line: {
      narration: true,
      text: "A faint blush colors his cheeks. And when he smiles, it feels… sincere. Disarming.",
    },
  },
  {
    type: "line",
    id: "p15",
    line: {
      narration: true,
      text: "Do I… know him?",
    },
  },
  {
    type: "line",
    id: "p16",
    line: {
      narration: true,
      text: `“Jingle bells, jingle bells, Jingle all the way!”`,
    },
  },
  {
    type: "line",
    id: "p17",
    line: {
      narration: true,
      text: "Under the towering evergreen at the center of the plaza, a group of teenagers gathers. A nun stands before them, baton raised.",
    },
  },
  {
    type: "line",
    id: "p18",
    line: {
      narration: true,
      text: "Lights wrap around the tree like constellations. The choir’s voices rise together — soft, clear, enchanting.",
    },
  },
  {
    type: "line",
    id: "p19",
    line: {
      narration: true,
      text: "The plaza fills. With sound. With warmth. With life.",
    },
  },
  {
    type: "line",
    id: "p20",
    line: {
      narration: true,
      text: "A winter breeze brushes against my skin. Cold. Sharp.",
    },
  },
  {
    type: "line",
    id: "p21",
    line: {
      narration: true,
      text: "Then I remember him. The boy. Still waiting.",
    },
  },
  {
    type: "line",
    id: "p22",
    line: {
      speaker: "Valentina",
      show: ["noah", "valentina"],
      pose: { valentina: "smile" },
      slot: { valentina: "left", noah: "right" },
      text: "She will appreciate this. Thanks.",
    },
  },
  {
    type: "line",
    id: "p23",
    line: {
      narration: true,
      text: "My arm moves before I can think. The box settles into my palm. Light. Warm. Real.",
    },
  },
  {
    type: "line",
    id: "p24",
    line: {
      narration: true,
      text: "For a moment, it feels like watching a memory unfold. A scene I have lived before.",
    },
  },
  {
    type: "line",
    id: "p25",
    line: {
      speaker: "Valentina",
      pose: { valentina: "neutral" },
      thought: true,
      music: "none",
      text: "But… something is wrong.",
    },
  },
  {
    type: "line",
    id: "p26",
    line: {
      speaker: "Valentina",
      thought: true,
      text: "I know him. Not vaguely. Not distantly. I know him well. Too well.",
    },
  },
  {
    type: "line",
    id: "p27",
    line: {
      speaker: "Valentina",
      pose: { valentina: "neutral" },
      show: ["noah", "valentina"],
      slot: { valentina: "left", noah: "right" },
      thought: true,
      music: "none",
      text: "He is —",
    },
  },
  {
    type: "line",
    id: "p28",
    line: {
      music: "tense",
      show: ["valentina"],
      hide: ["noah", "alice"],
      pose: { valentina: "hurt" },
      slot: { valentina: "roomCenter" },
      narration: true,
      text: "Suddenly, my chest tightens.",
    },
  },
  {
    type: "line",
    id: "p29",
    line: {
      speaker: "Valentina",
      text: "*Cough*",
    },
  },
  {
    type: "line",
    id: "p30",
    line: {
      speaker: "Valentina",
      text: "*Cough*",
    },
  },
  {
    type: "line",
    id: "p31",
    line: {
      speaker: "Valentina",
      text: "*Cough Cough*",
    },
  },
  {
    type: "line",
    id: "p32",
    line: {
      narration: true,
      text: "It doesn’t stop. No matter how hard I try. Each breath becomes a struggle. Each inhale feels incomplete.",
    },
  },
  {
    type: "line",
    id: "p33",
    line: {
      narration: true,
      text: "Air slips through my fingers like water. I’m drowning in something invisible.",
    },
  },
  {
    type: "line",
    id: "p34",
    line: {
      narration: true,
      text: "Suffocation wraps around me. What is breathing, anyway?",
    },
  },
  {
    type: "line",
    id: "p35",
    line: {
      narration: true,
      text: "I can’t catch my breath. Not even for a second.",
    },
  },
  {
    type: "line",
    id: "p36",
    line: {
      narration: true,
      text: "My hand dives into my jean pocket.",
    },
  },
  {
    type: "line",
    id: "p37",
    line: {
      narration: true,
      text: ".........",
    },
  },
  {
    type: "line",
    id: "p38",
    line: {
      narration: true,
      text: "No. Nothing. I can’t seem to find the thing.",
    },
  },
  {
    type: "choice",
    id: "choice-main",
    prompt: "What should Valentina do?",
    options: [
      {
        id: "choice-a",
        label: "A: Search frantically in my coat pocket",
        branch: "A",
      },
      {
        id: "choice-b",
        label: "B: Call out for help",
        branch: "B",
      },
    ],
  },
];

const branchA: Step[] = [
  {
    type: "line",
    id: "a1",
    line: {
      narration: true,
      pose: { valentina: "hurt" },
      text: "“No. It isn’t there!”",
    },
  },
  {
    type: "line",
    id: "a2",
    line: {
      narration: true,
      text: "The thing important for me right now is nowhere to be found.",
    },
  },
  {
    type: "line",
    id: "a3",
    line: {
      narration: true,
      text: "My fingers tremble as I shove them into my coat pocket, digging, scraping, desperate.",
    },
  },
  {
    type: "line",
    id: "a4",
    line: {
      narration: true,
      text: "The present nearly slips from my grasp.",
    },
  },
  {
    type: "line",
    id: "a5",
    line: {
      speaker: "Valentina",
      text: "Come on… come on…",
    },
  },
  {
    type: "line",
    id: "a6",
    line: {
      narration: true,
      text: "Air refuses to enter my lungs. My chest tightens like invisible hands are crushing it.",
    },
  },
  {
    type: "line",
    id: "a7",
    line: {
      narration: true,
      text: "I try to inhale through my mouth. No. It isn’t working.",
    },
  },
  {
    type: "line",
    id: "a8",
    line: {
      narration: true,
      text: "My vision flickers. Am I… dying?",
    },
  },
  {
    type: "line",
    id: "a9",
    line: {
      narration: true,
      hide: ["noah", "alice"],
      text: "The lights around me begin to smear into streaks of red and gold.",
    },
  },
  {
    type: "line",
    id: "a10",
    line: {
      narration: true,
      hide: ["noah", "alice"],
      text: "The choir’s singing fades — not because it stopped, but because I can’t hear it anymore.",
    },
  },
];

const branchB: Step[] = [
  {
    type: "line",
    id: "b1",
    line: {
      narration: true,
      pose: { valentina: "hurt" },
      text: "I lift my head, forcing air through my burning throat.",
    },
  },
  {
    type: "line",
    id: "b2",
    line: {
      speaker: "Valentina",
      text: "H-Help…",
    },
  },
  {
    type: "line",
    id: "b3",
    line: {
      narration: true,
      text: "My voice barely leaves my lips.",
    },
  },
  {
    type: "line",
    id: "b4",
    line: {
      narration: true,
      text: "I search my surroundings, hoping someone — anyone — will notice.",
    },
  },
  {
    type: "line",
    id: "b5",
    line: {
      narration: true,
      hide: ["noah", "alice"],
      text: "But the boy in front of me is gone. The fluffy white dog is gone.",
    },
  },
  {
    type: "line",
    id: "b6",
    line: {
      narration: true,
      text: "The choir’s singing falters. Or maybe it’s just growing distant.",
    },
  },
  {
    type: "line",
    id: "b7",
    line: {
      narration: true,
      text: "The crowd blurs into indistinct shadows. The plaza feels larger. Colder. Empty.",
    },
  },
  {
    type: "line",
    id: "b8",
    line: {
      narration: true,
      text: "The Christmas tree stands alone.",
    },
  },
];

const mergedSteps: Step[] = [
  {
    type: "line",
    id: "m1",
    line: {
      narration: true,
      text: "The world tilts.",
    },
  },
  {
    type: "line",
    id: "m2",
    line: {
      speaker: "Valentina",
      text: "H-hel...",
    },
  },
  {
    type: "line",
    id: "m3",
    line: {
      narration: true,
      text: "The word dissolves before it fully forms. I feel my knees weakening.",
    },
  },
  {
    type: "line",
    id: "m4",
    line: {
      narration: true,
      text: "I collapse to the ground with a thud. Pain shoots through me, registering in my senses.",
    },
  },
  {
    type: "line",
    id: "m5",
    line: {
      narration: true,
      text: "The small red box slips in my hand, but my fingers tighten around it instinctively. As if it alone anchors me to something real.",
    },
  },
  {
    type: "line",
    id: "m6",
    line: {
      narration: true,
      text: "Breathing becomes a foreign concept. What is breathing, anyway?",
    },
  },
  {
    type: "line",
    id: "m7",
    line: {
      speaker: "Valentina",
      thought: true,
      text: `My name is Valentina Evans. "How ironic that Valentina means healthy."`,
    },
  },
  {
    type: "line",
    id: "m8",
    line: {
      narration: true,
      hide: ["valentina", "noah", "alice"],
      text: "The lights above fracture into shards of color. Then even that disappears.",
    },
  },
  {
    type: "line",
    id: "m9",
    line: {
      narration: true,
      text: "Darkness closes in. Slowly I sense my consciousness slipping away.",
    },
  },
  {
    type: "line",
    id: "m10",
    line: {
      narration: true,
      text: "…",
    },
  },
  {
    type: "line",
    id: "m11",
    line: {
      narration: true,
      music: "tense",
      text: "…",
    },
  },
  {
    type: "line",
    id: "m12",
    line: {
      bg: "plaza",
      hide: ["valentina", "noah", "alice"],
      music: "none",
      narration: true,
      text: "…",
    },
  },

  {
    type: "line",
    id: "r1",
    line: {
      bg: "bedroom",
      music: "room",
      show: ["valentina"],
      hide: ["noah", "alice"],
      pose: { valentina: "neutral" },
      slot: { valentina: "roomCenter" },
      narration: true,
      text: "My eyes fly open.",
    },
  },
  {
    type: "line",
    id: "r2",
    line: {
      narration: true,
      text: "For a moment, I don’t know where I am.",
    },
  },
  {
    type: "line",
    id: "r3",
    line: {
      narration: true,
      text: "The darkness around me is familiar. Not the hollow, endless darkness from before, but the quiet kind that belongs to my room.",
    },
  },
  {
    type: "line",
    id: "r4",
    line: {
      narration: true,
      text: "My heart is racing. My skin is damp. I’m drenched in sweat.",
    },
  },
  {
    type: "line",
    id: "r5",
    line: {
      speaker: "Valentina",
      text: "Thank goddess… it was just a dream.",
    },
  },
  {
    type: "line",
    id: "r6",
    line: {
      narration: true,
      text: "I press a hand to my forehead and inhale slowly. One breath. Two. Three.",
    },
  },
  {
    type: "line",
    id: "r7",
    line: {
      speaker: "Valentina",
      text: "1… 2… 3…",
    },
  },
  {
    type: "line",
    id: "r8",
    line: {
      narration: true,
      text: "Air enters and leaves through my nostrils. It hurts less this time.",
    },
  },
  {
    type: "line",
    id: "r9",
    line: {
      narration: true,
      pose: { valentina: "neutral" },
      text: "I glance toward the window. Night still rules outside. The world is asleep.",
    },
  },
  {
    type: "line",
    id: "r10",
    line: {
      narration: true,
      text: "I reach for the lamp on my bedside table. Click. A soft amber glow fills the space. Gentle. Safe.",
    },
  },
  {
    type: "line",
    id: "r11",
    line: {
      narration: true,
      text: "I walk to my desk and pull open the drawer.",
    },
  },
  {
    type: "line",
    id: "r12",
    line: {
      narration: true,
      text: "Inside, a familiar red box rests where I left it.",
    },
  },
  {
    type: "line",
    id: "r13",
    line: {
      narration: true,
      text: "My fingers hesitate but then, I slowly lift it carefully.",
    },
  },
  {
    type: "line",
    id: "r14",
    line: {
      narration: true,
      text: "I open the lid.",
    },
  },
  {
    type: "line",
    id: "r15",
    line: {
      narration: true,
      text: "A red collar lies inside. A round aluminum tag catches the light. Etched neatly into the surface reads: ALICE.",
    },
  },
  {
    type: "line",
    id: "r16",
    line: {
      speaker: "Valentina",
      text: "Oh, Alice… where are you?",
    },
  },
  {
    type: "line",
    id: "r17",
    line: {
      narration: true,
      text: "I set the box down and search deeper into the drawer. Beneath a stack of books. That’s where it should be.",
    },
  },
  {
    type: "line",
    id: "r18",
    line: {
      narration: true,
      text: "I remove them slowly, one by one. And there it is. A photo frame.",
    },
  },
  {
    type: "line",
    id: "r19",
    line: {
      narration: true,
      text: "In the picture, a younger version of me is kneeling, arms wrapped tightly around Alice. Protective. Possessive. Happy.",
    },
  },
  {
    type: "line",
    id: "r20",
    line: {
      narration: true,
      text: "On the other side of her— A tall boy. Silver hair. Familiar eyes.",
    },
  },
  {
    type: "line",
    id: "r21",
    line: {
      speaker: "Valentina",
      pose: { valentina: "angry" },
      text: "Liar.",
    },
  },
  {
    type: "line",
    id: "r22",
    line: {
      narration: true,
      text: "The word escapes before I can stop it. Heat rises to my face, carried by a rush of memories I never asked to relive.",
    },
  },
  {
    type: "line",
    id: "r23",
    line: {
      speaker: "Valentina",
      pose: { valentina: "hurt" },
      text: "No… I shouldn’t.",
    },
  },
  {
    type: "line",
    id: "r24",
    line: {
      narration: true,
      text: "My vision blurs. I wipe the corners of my eyes quickly, before tears can fall.",
    },
  },
  {
    type: "line",
    id: "r25",
    line: {
      narration: true,
      text: "I can’t even cry freely. Not without consequences.",
    },
  },
  {
    type: "line",
    id: "r26",
    line: {
      narration: true,
      text: "I hate this relentless companion. This invisible monster that shares every breath I take.",
    },
  },
  {
    type: "line",
    id: "r27",
    line: {
      narration: true,
      text: "It began when I was nineteen. Fur triggers it most easily.",
    },
  },
  {
    type: "line",
    id: "r28",
    line: {
      narration: true,
      text: "Something so soft… becoming a threat. It’s like glass. Transparent. Invisible.",
    },
  },
  {
    type: "line",
    id: "r29",
    line: {
      narration: true,
      text: "You don’t see it until you collide with it. And when it cracks?",
    },
  },
  {
    type: "line",
    id: "r30",
    line: {
      narration: true,
      text: "There’s no going back to the way things were.",
    },
  },
  {
    type: "line",
    id: "r31",
    line: {
      narration: true,
      text: "Modern medicine tries. But it lingers. Persistent. Unyielding. Like a specter that follows me into sleep.",
    },
  },
  {
    type: "line",
    id: "r32",
    line: {
      narration: true,
      text: "Into dreams. Into memories.",
    },
  },
  {
    type: "line",
    id: "r33",
    line: {
      narration: true,
      text: "It has no intention of leaving.",
    },
  },
  {
    type: "line",
    id: "r34",
    line: {
      narration: true,
      text: "Not tomorrow. Not next winter. Not ever.",
    },
  },
  {
    type: "line",
    id: "r35",
    line: {
      narration: true,
      text: "For the rest of my life.",
    },
  },
];

export default function DemoPage() {
  const { content } = useLanguage();
  const [branch, setBranch] = useState<"A" | "B" | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const [currentBg, setCurrentBg] = useState<BgId>("god");
  const [currentMusic, setCurrentMusic] = useState<MusicId>("none");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentMusic === "none") {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    audio.src = MUSIC_SRC[currentMusic];
    audio.loop = true;
    audio.volume = 0.4;

    if (hasInteracted) {
      audio.play().catch(() => {
        // autoplay may still be blocked in some cases
      });
    }
  }, [currentMusic, hasInteracted]);

  const [visibleCharacters, setVisibleCharacters] = useState<
    Record<CharacterId, boolean>
  >({
    valentina: false,
    noah: false,
    alice: false,
  });

  const [poses, setPoses] =
    useState<Record<CharacterId, string>>(DEFAULT_POSES);

  const [slots, setSlots] =
    useState<Record<CharacterId, CharacterSlot>>(DEFAULT_SLOTS);

  const steps = useMemo(() => {
    if (!branch) return baseSteps;
    return [
      ...baseSteps,
      ...(branch === "A" ? branchA : branchB),
      ...mergedSteps,
    ];
  }, [branch]);

  const currentStep = steps[stepIndex];
  const isChoice = currentStep?.type === "choice";
  const currentLine = currentStep?.type === "line" ? currentStep.line : null;
  const isAtEnding = hasStarted && !isChoice && stepIndex >= steps.length - 1;

  const displayedChoicePrompt =
    currentStep?.type === "choice" && currentStep.id === "choice-main"
      ? content.demo.choicePrompt
      : currentStep?.type === "choice"
        ? currentStep.prompt
        : "";

  useEffect(() => {
    if (!currentLine) return;

    if (currentLine.bg) setCurrentBg(currentLine.bg);
    if (currentLine.music) setCurrentMusic(currentLine.music);

    if (currentLine.show?.length) {
      setVisibleCharacters((prev) => {
        const next = { ...prev };
        currentLine.show?.forEach((id) => {
          next[id] = true;
        });
        return next;
      });
    }

    if (currentLine.hide?.length) {
      setVisibleCharacters((prev) => {
        const next = { ...prev };
        currentLine.hide?.forEach((id) => {
          next[id] = false;
        });
        return next;
      });
    }

    if (currentLine.pose) {
      setPoses((prev) => ({
        ...prev,
        ...currentLine.pose,
      }));
    }

    if (currentLine.slot) {
      setSlots((prev) => ({
        ...prev,
        ...currentLine.slot,
      }));
    }
  }, [currentLine]);

  const goNext = () => {
    if (!currentStep) return;
    if (currentStep.type === "choice") return;
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

  const chooseBranch = (selected: "A" | "B") => {
    setBranch(selected);
    setStepIndex((prev) => prev + 1);
  };

  const restart = () => {
    setBranch(null);
    setStepIndex(0);
    setHasStarted(false);
    setHasInteracted(false);
    setSlots(DEFAULT_SLOTS);
    setCurrentBg("god");
    setCurrentMusic("none");
    setVisibleCharacters({
      valentina: false,
      noah: false,
      alice: false,
    });
    setPoses(DEFAULT_POSES);
  };

  const startDemo = () => {
    setHasStarted(true);
    setHasInteracted(true);
  };

  const replayDemo = () => {
    setBranch(null);
    setStepIndex(0);
    setHasStarted(true);
    setHasInteracted(true);
    setSlots(DEFAULT_SLOTS);
    setCurrentBg("god");
    setCurrentMusic("none");
    setVisibleCharacters({
      valentina: false,
      noah: false,
      alice: false,
    });
    setPoses(DEFAULT_POSES);
  };

  return (
    <main className={styles.page}>
      <section
        className={styles.sceneArea}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(7,10,18,0.84), rgba(7,10,18,0.28)), url("${BACKGROUNDS[currentBg]}")`,
        }}
        onClick={() => {
          if (!hasStarted || isAtEnding) return;
          if (!hasInteracted) setHasInteracted(true);
          if (!isChoice) goNext();
        }}
      >
        <div className={styles.topBar} onClick={(e) => e.stopPropagation()}>
          <div className={styles.topControls}>
            <button className={styles.ghostButton} onClick={restart}>
              {content.demo.restart}
            </button>
          </div>
        </div>

        <section className={styles.stage}>
          {(["valentina", "noah", "alice"] as CharacterId[]).map((id) => {
            if (!visibleCharacters[id]) return null;
            const pose = poses[id] || DEFAULT_POSES[id];
            const src =
              CHARACTER_SPRITES[id][pose] ||
              CHARACTER_SPRITES[id][DEFAULT_POSES[id]];

            return (
              <div
                key={id}
                className={`${styles.character} ${SLOT_CLASS_MAP[slots[id]]} ${
                  id === "valentina" && pose === "hurt" ? styles.hurtPose : ""
                } ${id === "valentina" && pose === "angry" ? styles.angryPose : ""}`}
              >
                <Image
                  src={src}
                  alt={id}
                  fill
                  priority
                  sizes="(max-width: 768px) 40vw, 28vw"
                  className={styles.characterImage}
                />
                <div className={styles.characterShadow} />
              </div>
            );
          })}
        </section>

        {!hasStarted && (
          <div
            className={styles.screenOverlay}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.screenCard}>
              <p className={styles.screenKicker}>{content.demo.kicker}</p>
              <h1 className={styles.screenTitle}>
                {content.demo.welcomeTitle}
              </h1>
              <p className={styles.screenBody}>{content.demo.welcomeBody}</p>
              <button className={styles.startButton} onClick={startDemo}>
                {content.demo.beginStory}
              </button>
            </div>
          </div>
        )}

        {isAtEnding && (
          <div
            className={styles.screenOverlay}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.screenCard}>
              <p className={styles.screenKicker}>{content.demo.endKicker}</p>
              <h2 className={styles.screenTitle}>{content.demo.endTitle}</h2>
              <p className={styles.screenBody}>{content.demo.endBody}</p>
              <div className={styles.endActions}>
                <button className={styles.startButton} onClick={replayDemo}>
                  {content.demo.playAgain}
                </button>
                <Link href="/" className={styles.homeButton}>
                  {content.demo.backToHome}
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <section
        className={styles.dialogueArea}
        onClick={(e) => e.stopPropagation()}
      >
        {!hasStarted || isAtEnding ? null : isChoice ? (
          <div className={styles.choicePanel}>
            <p className={styles.choicePrompt}>{displayedChoicePrompt}</p>
            <div className={styles.choiceButtons}>
              {currentStep.options.map((option) => (
                <button
                  key={option.id}
                  className={styles.choiceButton}
                  onClick={() => chooseBranch(option.branch)}
                >
                  {currentStep.id === "choice-main"
                    ? option.branch === "A"
                      ? content.demo.choiceA
                      : content.demo.choiceB
                    : option.label}
                </button>
              ))}
            </div>
          </div>
        ) : currentLine ? (
          <div className={styles.dialogueBox}>
            <div className={styles.dialogueHeader}>
              <span className={styles.speaker}>
                {currentLine.narration
                  ? "\u00A0"
                  : (currentLine.speaker ?? "\u00A0")}
              </span>
            </div>

            <p
              className={`${styles.dialogueText} ${
                currentLine.narration ? styles.narrationText : ""
              } ${currentLine.thought ? styles.thoughtText : ""}`}
            >
              {currentLine.text}
            </p>

            <div className={styles.bottomControls}>
              <button
                className={styles.smallButton}
                onClick={goBack}
                disabled={stepIndex === 0}
              >
                {content.demo.back}
              </button>
              <button
                className={styles.nextButton}
                onClick={goNext}
                disabled={stepIndex >= steps.length - 1}
              >
                {stepIndex >= steps.length - 1
                  ? content.demo.end
                  : content.demo.next}
              </button>
            </div>
          </div>
        ) : null}
      </section>
      <audio ref={audioRef} preload="auto" />
    </main>
  );
}
