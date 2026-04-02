import GameShell from "@/components/GameShell";

const questions = [
  { question: "Who helps sick people?", options: ["teacher", "doctor", "farmer", "pilot"], correct: "doctor", emoji: "👨‍⚕️" },
  { question: "Who teaches children at school?", options: ["nurse", "chef", "teacher", "driver"], correct: "teacher", emoji: "👩‍🏫" },
  { question: "Who cooks food in a restaurant?", options: ["chef", "pilot", "doctor", "farmer"], correct: "chef", emoji: "👨‍🍳" },
  { question: "Who flies an aeroplane?", options: ["driver", "pilot", "farmer", "nurse"], correct: "pilot", emoji: "✈️" },
  { question: "Who grows vegetables and food?", options: ["pilot", "doctor", "teacher", "farmer"], correct: "farmer", emoji: "👨‍🌾" },
  { question: "What does a doctor do?", options: ["teaches", "flies", "cooks", "helps sick people"], correct: "helps sick people", emoji: "🏥" },
  { question: "Who helps the doctor?", options: ["chef", "nurse", "farmer", "pilot"], correct: "nurse", emoji: "👩‍⚕️" },
  { question: "Who draws buildings?", options: ["teacher", "nurse", "architect", "farmer"], correct: "architect", emoji: "🏗️" },
  { question: "He ___ a doctor.", options: ["am", "is", "are", "be"], correct: "is", emoji: "👨‍⚕️" },
  { question: "They ___ teachers.", options: ["am", "is", "are", "be"], correct: "are", emoji: "👨‍🏫" },
];

export default function ProfessionsGame() {
  return (
    <GameShell
      planetId="professions"
      title="🟠 Professions"
      subtitle="doctor, teacher..."
      color="#FFD93D"
      shadow="#c9a000"
      questions={questions}
    />
  );
}
