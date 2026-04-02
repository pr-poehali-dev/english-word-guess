import GameShell from "@/components/GameShell";

const questions = [
  { question: "___ is your name?", options: ["What", "Who", "Where", "When"], correct: "What", emoji: "👋" },
  { question: "___ old are you?", options: ["How", "What", "Who", "Why"], correct: "How", emoji: "🎂" },
  { question: "___ do you live?", options: ["Who", "Where", "When", "What"], correct: "Where", emoji: "🏡" },
  { question: "___ is your teacher?", options: ["What", "Where", "Who", "How"], correct: "Who", emoji: "👩‍🏫" },
  { question: "___ do you go to school?", options: ["What", "When", "Who", "Where"], correct: "When", emoji: "⏰" },
  { question: "___ do you like summer?", options: ["Who", "What", "Why", "How"], correct: "Why", emoji: "☀️" },
  { question: "___ many pets do you have?", options: ["How", "What", "Who", "Where"], correct: "How", emoji: "🐾" },
  { question: "___ is your favourite colour?", options: ["Who", "Where", "When", "What"], correct: "What", emoji: "🎨" },
  { question: "___ does your mum work?", options: ["When", "Where", "Who", "Why"], correct: "Where", emoji: "💼" },
  { question: "___ is your best friend?", options: ["What", "Where", "When", "Who"], correct: "Who", emoji: "🤝" },
];

export default function QuestionWordsGame() {
  return (
    <GameShell
      planetId="question-words"
      title="💜 Question Words"
      subtitle="Who? What? Where?"
      color="#A78BFA"
      shadow="#6d28d9"
      questions={questions}
    />
  );
}
