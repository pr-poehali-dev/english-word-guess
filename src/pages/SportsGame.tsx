import GameShell from "@/components/GameShell";

const questions = [
  { question: "What sport is this?", options: ["football", "tennis", "swimming", "cycling"], correct: "football", emoji: "⚽" },
  { question: "What sport is this?", options: ["basketball", "football", "tennis", "boxing"], correct: "basketball", emoji: "🏀" },
  { question: "What sport is this?", options: ["volleyball", "swimming", "baseball", "hockey"], correct: "swimming", emoji: "🏊" },
  { question: "What sport is this?", options: ["skiing", "cycling", "running", "gymnastics"], correct: "cycling", emoji: "🚴" },
  { question: "What sport is this?", options: ["football", "tennis", "golf", "rugby"], correct: "tennis", emoji: "🎾" },
  { question: "I ___ football every day.", options: ["play", "do", "go", "make"], correct: "play", emoji: "⚽" },
  { question: "She ___ swimming on Fridays.", options: ["plays", "does", "goes", "makes"], correct: "goes", emoji: "🏊‍♀️" },
  { question: "He ___ gymnastics after school.", options: ["plays", "does", "goes", "makes"], correct: "does", emoji: "🤸" },
  { question: "Which sport uses a racket?", options: ["football", "tennis", "swimming", "running"], correct: "tennis", emoji: "🏸" },
  { question: "Which sport is in water?", options: ["football", "cycling", "swimming", "tennis"], correct: "swimming", emoji: "💧" },
];

export default function SportsGame() {
  return (
    <GameShell
      planetId="sports"
      title="🌑 Sports"
      subtitle="football, tennis..."
      color="#6BCB77"
      shadow="#3a9e46"
      questions={questions}
    />
  );
}
