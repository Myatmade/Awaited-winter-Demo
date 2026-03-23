import type { SiteContent } from "@/content/types";

export const jp: SiteContent = {
  header: {
    home: "ホーム",
    demo: "デモ",
    story: "物語",
    characters: "登場人物",
    about: "概要",
    credits: "クレジット",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    goHome: "ホームへ戻る",
  },
  footer: {
    copyright: "© 2026 Myat Ma De May Phuu Ngon.",
    assets: "一部の素材はライセンスに基づいて使用しています。",
  },
  home: {
    quoteLines: ["冬の夜。", "忘れられた約束。", "消えることのない記憶。"],
  },
  story: {
    title: "物語",
    synopsisLines: [
      "埋もれた約束がある。",
      "沈黙の中へ消えていく名前がある。",
      "それでも、本当に失われてしまうのだろうか。",
      "",
      "『The Awaited Winter』は、記憶の断片に導かれるValentinaが",
      "逃れられないあの冬へと再び向き合う物語です。",
    ],
  },
  about: {
    title: "概要",
    paragraphs: [
      "『The Awaited Winter』は、Myat Ma De May Phuu Ngonによるオリジナル作品です。2022年に冬をテーマにしたコンテストで受賞したビルマ語の短編をもとにしています。",
      "本サイトでは、原作をインタラクティブな物語として再構成し、創作文章とWeb技術を組み合わせて表現しています。",
      "このプロジェクトを通して、物語表現の新しい見せ方を探りながら、Web開発とUI/UXデザインのスキル向上を目指しています。",
    ],
  },
  credits: {
    title: "クレジット",
    lines: [
      "原作・クリエイティブディレクション",
      "Myat Ma De May Phuu Ngon",
      "",
      "Webデザイン・開発",
      "Myat Ma De May Phuu Ngon",
      "",
      "キャラクター・CGアートワーク",
      "Leonardo AIを活用し、作者が調整",
      "一部アートワークは作者による完全制作",
      "",
      "音楽",
      '"No Copyright Music" by The Mountain',
      '"Sad Piano Lost Love (30 sec)" by WaveMaster',
      '"Shalom Aleichem" by NikitaKondrashev',
      '"Stairs into the Unknown (Dark Piano Music)" by JuliusH',
      '"A Little Dream" by Piano_Music',
      "",
      "音源提供: Pixabay",
    ],
  },
  characters: {
    title: "登場人物",
    more: "[詳細]",
    roleLabel: "役割:",
    profileLabel: "プロフィール:",
    previousCharacter: "前のキャラクター",
    nextCharacter: "次のキャラクター",
    items: {
      valentina: {
        name: "Valentina Evans",
        role: "主人公",
        tagline: "忘れられない記憶を抱えて生きる、静かな女性。",
        profile:
          "小さな町で日常の安らぎを探し続けるValentina。しかし、ある冬をきっかけに、忘れようとしていた過去が再び彼女の前に現れます。",
      },
      alice: {
        name: "Alice",
        role: "相棒",
        tagline: "かけがえのない温もりをくれる、小さな存在。",
        profile:
          "活発な白い犬。大切な瞬間にはいつもValentinaのそばにいて、彼女の人生に優しい光をもたらします。",
      },
      noah: {
        name: "Noah",
        role: "???",
        tagline: "忘れられた時間をまとった、どこか懐かしい人。",
        profile:
          "穏やかな青年。その存在はValentinaの心を揺らし、未解決の何かが残されていることを思い出させます。",
      },
    },
  },
  demo: {
    kicker: "デモ",
    welcomeTitle: "ようこそ",
    welcomeBody: "クリックして物語を進めてください。",
    beginStory: "物語を始める",
    endKicker: "デモ終了",
    endTitle: "つづく...",
    endBody: "読んでいただきありがとうございました。",
    playAgain: "もう一度見る",
    backToHome: "ホームに戻る",
    restart: "リスタート",
    back: "戻る",
    next: "次へ",
    end: "終了",
    choicePrompt: "Valentinaはどうするべき？",
    choiceA: "A: コートのポケットを必死に探す",
    choiceB: "B: 助けを呼ぶ",
  },
};
