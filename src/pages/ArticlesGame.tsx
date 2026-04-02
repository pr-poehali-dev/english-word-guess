import GameShell from "@/components/GameShell";

const questions = [
  { question: "I have ___ apple.", options: ["a", "an", "the", "—"], correct: "an", emoji: "🍎" },
  { question: "___ sun is very bright.", options: ["A", "An", "The", "—"], correct: "The", emoji: "☀️" },
  { question: "She is ___ teacher.", options: ["a", "an", "the", "—"], correct: "a", emoji: "👩‍🏫" },
  { question: "He has ___ orange.", options: ["a", "an", "the", "—"], correct: "an", emoji: "🍊" },
  { question: "___ cat is sleeping.", options: ["A", "An", "The", "—"], correct: "The", emoji: "😺" },
  { question: "I can see ___ elephant.", options: ["a", "an", "the", "—"], correct: "an", emoji: "🐘" },
  { question: "This is ___ good book.", options: ["a", "an", "the", "—"], correct: "a", emoji: "📚" },
  { question: "___ moon is beautiful tonight.", options: ["A", "An", "The", "—"], correct: "The", emoji: "🌙" },
  { question: "We have ___ dog.", options: ["a", "an", "the", "—"], correct: "a", emoji: "🐶" },
  { question: "I eat ___ egg every morning.", options: ["a", "an", "the", "—"], correct: "an", emoji: "🥚" },
];

export default function ArticlesGame() {
  return (
    <GameShell
      planetId="articles"
      title="🪐 Articles"
      subtitle="a / an / the"
      color="#FF6B35"
      shadow="#cc4400"
      questions={questions}
    />
  );
}
