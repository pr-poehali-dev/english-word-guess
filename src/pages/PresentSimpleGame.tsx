import GameShell from "@/components/GameShell";

const questions = [
  { question: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: "goes", emoji: "🏫" },
  { question: "They ___ football on Saturdays.", options: ["play", "plays", "playing", "played"], correct: "play", emoji: "⚽" },
  { question: "He ___ breakfast at 8 o'clock.", options: ["eat", "eats", "eating", "eaten"], correct: "eats", emoji: "🍳" },
  { question: "We ___ in a big house.", options: ["live", "lives", "living", "lived"], correct: "live", emoji: "🏠" },
  { question: "My cat ___ a lot.", options: ["sleep", "sleeps", "sleeping", "slept"], correct: "sleeps", emoji: "😸" },
  { question: "I ___ books every week.", options: ["read", "reads", "reading", "readed"], correct: "read", emoji: "📖" },
  { question: "She ___ English very well.", options: ["speak", "speaks", "speaking", "spoken"], correct: "speaks", emoji: "🗣️" },
  { question: "___ he like ice cream?", options: ["Do", "Does", "Is", "Are"], correct: "Does", emoji: "🍦" },
  { question: "___ you go to school by bus?", options: ["Do", "Does", "Is", "Are"], correct: "Do", emoji: "🚌" },
  { question: "She ___ like vegetables.", options: ["don't", "doesn't", "isn't", "aren't"], correct: "doesn't", emoji: "🥦" },
];

export default function PresentSimpleGame() {
  return (
    <GameShell
      planetId="present-simple"
      title="🌍 Present Simple"
      subtitle="I play / She plays"
      color="#4ECDC4"
      shadow="#2A9D8F"
      questions={questions}
    />
  );
}
