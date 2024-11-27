export const questions = [
  {
    id: 1,
    text: "What has keys, but no locks; space, but no room; and you can enter, but not go in?",
    choices: ["A Keyboard", "A Map", "A Phone"],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "What has cities, but no houses; forests, but no trees; and rivers, but no water?",
    choices: ["A Globe", "A Map", "A Painting"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What gets wetter and wetter the more it dries?",
    choices: ["A Sponge", "A Towel", "A Dishcloth"],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "What has a head and a tail but no body?",
    choices: ["A Snake", "A Coin", "A Dragon"],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "What building has the most stories?",
    choices: ["Empire State Building", "Library", "Burj Khalifa"],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "What has legs but cannot walk?",
    choices: ["A Table", "A Snake", "A Fish"],
    correctAnswer: 0
  }
];

export const timerOptions: { label: string; value: number }[] = [
  { label: "Relaxed (2 minutes)", value: 120 },
  { label: "Standard (1 minute)", value: 60 },
  { label: "Challenge (30 seconds)", value: 30 }
];

export const rewardImages = {
  perfect: "https://images.unsplash.com/photo-1601142634808-38923eb7c560?w=800&auto=format&fit=crop&q=60",
  great: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60",
  good: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60"
};