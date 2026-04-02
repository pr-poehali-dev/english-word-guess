import GameShell from "@/components/GameShell";

const questions = [
  { question: "What does 'appearance' mean?", options: ["character", "how someone looks", "a sport", "a colour"], correct: "how someone looks", emoji: "🪞" },
  { question: "What does 'character' mean?", options: ["how you look", "your personality / qualities", "your job", "your sport"], correct: "your personality / qualities", emoji: "💭" },
  { question: "What are 'curls'?", options: ["straight hair", "wavy / curly hair", "short hair", "no hair"], correct: "wavy / curly hair", emoji: "💇‍♀️" },
  { question: "What does 'golden' mean?", options: ["dark", "red", "gold / yellow", "black"], correct: "gold / yellow", emoji: "✨" },
  { question: "What does 'lovely' mean?", options: ["bad", "ugly", "beautiful / wonderful", "funny"], correct: "beautiful / wonderful", emoji: "💖" },
  { question: "What does 'funny' mean?", options: ["sad", "serious", "making you laugh", "angry"], correct: "making you laugh", emoji: "😄" },
  { question: "She has ___ curls — her hair is golden.", options: ["bad", "beautiful", "tall", "funny"], correct: "beautiful", emoji: "👩‍🦱" },
  { question: "He is ___ — he always makes us laugh!", options: ["bad", "lovely", "funny", "curly"], correct: "funny", emoji: "🤣" },
  { question: "Which word describes appearance?", options: ["funny", "golden hair", "character", "good"], correct: "golden hair", emoji: "👑" },
  { question: "Which word describes character?", options: ["curls", "appearance", "good", "golden"], correct: "good", emoji: "😇" },
];

export default function AppearanceGame() {
  return (
    <GameShell
      planetId="appearance"
      title="🌸 Appearance"
      subtitle="curls, golden, lovely..."
      color="#FF85A1"
      shadow="#cc2255"
      questions={questions}
    />
  );
}
