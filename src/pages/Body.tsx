import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BODY_PARTS = [
  { name: "Head", emoji: "🗣️", hint: "It sits on top of your neck" },
  { name: "Eyes", emoji: "👀", hint: "You use them to see" },
  { name: "Nose", emoji: "👃", hint: "You use it to smell" },
  { name: "Mouth", emoji: "👄", hint: "You use it to eat and talk" },
  { name: "Ears", emoji: "👂", hint: "You use them to hear" },
  { name: "Hand", emoji: "✋", hint: "It has five fingers" },
  { name: "Leg", emoji: "🦵", hint: "You walk with these" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getOptions(correct: typeof BODY_PARTS[number], all: typeof BODY_PARTS): typeof BODY_PARTS[number][] {
  const others = shuffle(all.filter((c) => c.name !== correct.name)).slice(0, 3);
  return shuffle([correct, ...others]);
}

type GameState = "playing" | "correct" | "wrong";

export default function Body() {
  const navigate = useNavigate();
  const [queue] = useState(() => shuffle(BODY_PARTS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [optionsMap] = useState<Record<number, typeof BODY_PARTS>>(() => {
    const map: Record<number, typeof BODY_PARTS> = {};
    return map;
  });

  const getOpts = (idx: number) => {
    if (!optionsMap[idx]) {
      optionsMap[idx] = getOptions(queue[idx], BODY_PARTS);
    }
    return optionsMap[idx];
  };

  const current = queue[currentIndex];
  const opts = getOpts(currentIndex);

  const handleAnswer = (name: string) => {
    if (gameState !== "playing") return;
    setSelectedAnswer(name);
    if (name === current.name) {
      setScore((s) => s + 1);
      setGameState("correct");
    } else {
      setGameState("wrong");
    }
    setShowHint(false);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= queue.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setGameState("playing");
    setShowHint(false);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (finished) {
    const total = queue.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 font-nunito"
        style={{ background: "linear-gradient(135deg, #E0FFF8 0%, #F0FFF4 40%, #F0FFFF 100%)" }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-4 border-teal-200">
          <div className="text-7xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "🌟" : "💪"}</div>
          <h2
            className="text-4xl font-black mb-2"
            style={{ fontFamily: "'Fredoka One', cursive", color: "#4ECDC4" }}
          >
            Game Over!
          </h2>
          <p className="text-xl font-bold text-gray-600 mb-1">Your score:</p>
          <p className="text-5xl font-black mb-2" style={{ color: "#A78BFA" }}>
            {score} / {total}
          </p>
          <p className="text-lg font-bold mb-6" style={{ color: pct >= 80 ? "#4BCB6B" : pct >= 50 ? "#F59E0B" : "#FF4B4B" }}>
            {pct >= 80 ? "Amazing! 🎉" : pct >= 50 ? "Good job! 👍" : "Keep practicing! 🔥"}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="w-full py-3 rounded-2xl text-white font-black text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #4ECDC4, #6BCB77)", boxShadow: "0 4px 0 #2A9D8F" }}
            >
              Play Again 🔄
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 border-4"
              style={{ borderColor: "#A78BFA", color: "#A78BFA" }}
            >
              Home 🏠
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 font-nunito"
      style={{ background: "linear-gradient(135deg, #E0FFF8 0%, #F0FFF4 40%, #F0FFFF 100%)" }}
    >
      {/* Header */}
      <div className="w-full max-w-sm mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-3xl hover:scale-110 active:scale-95 transition-transform"
        >
          ←
        </button>
        <div className="text-center">
          <span
            className="text-2xl font-black"
            style={{ fontFamily: "'Fredoka One', cursive", color: "#4ECDC4" }}
          >
            👁️ Body Parts
          </span>
        </div>
        <div
          className="bg-white rounded-2xl px-3 py-1 font-black text-lg shadow border-2 border-teal-200"
          style={{ color: "#A78BFA" }}
        >
          {score} ⭐
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
          <span>Question {currentIndex + 1} of {queue.length}</span>
          <span>{Math.round((currentIndex / queue.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${(currentIndex / queue.length) * 100}%`,
              background: "linear-gradient(90deg, #4ECDC4, #6BCB77)",
            }}
          />
        </div>
      </div>

      {/* Emoji display */}
      <div className="w-full max-w-sm mb-4">
        <div
          className="w-full h-44 rounded-3xl shadow-2xl border-8 border-white flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #E0FFF8, #CCFBF1)" }}
        >
          <span className="text-9xl animate-float">{current.emoji}</span>
        </div>
        <p className="text-center font-bold text-gray-400 mt-3 text-lg">
          What body part is this? 🤔
        </p>
      </div>

      {/* Hint */}
      <div className="w-full max-w-sm mb-4">
        {showHint ? (
          <div
            className="rounded-2xl px-4 py-2 text-center font-bold text-sm border-2"
            style={{ background: "#FFF7ED", borderColor: "#FED7AA", color: "#9A3412" }}
          >
            💡 {current.hint}
          </div>
        ) : (
          <button
            onClick={() => setShowHint(true)}
            disabled={gameState !== "playing"}
            className="w-full py-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 border-2 border-dashed"
            style={{ borderColor: "#FCD34D", color: "#92400E", background: "transparent" }}
          >
            💡 Show Hint
          </button>
        )}
      </div>

      {/* Options */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3">
        {opts.map((opt) => {
          let btnStyle: React.CSSProperties = {
            background: "white",
            border: "4px solid #E5E7EB",
            color: "#374151",
          };
          let mark = "";

          if (gameState !== "playing" && selectedAnswer !== null) {
            if (opt.name === current.name) {
              btnStyle = {
                background: "linear-gradient(135deg, #4BCB6B, #22C55E)",
                border: "4px solid #16A34A",
                color: "white",
              };
              mark = " ✅";
            } else if (opt.name === selectedAnswer && selectedAnswer !== current.name) {
              btnStyle = {
                background: "linear-gradient(135deg, #FF4B4B, #EF4444)",
                border: "4px solid #DC2626",
                color: "white",
              };
              mark = " ❌";
            }
          }

          return (
            <button
              key={opt.name}
              onClick={() => handleAnswer(opt.name)}
              disabled={gameState !== "playing"}
              className="py-4 rounded-2xl font-black text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
              style={btnStyle}
            >
              {opt.emoji} {opt.name}{mark}
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {gameState !== "playing" && (
        <div className="w-full max-w-sm mt-6 text-center">
          <div
            className="text-2xl font-black mb-4"
            style={{ color: gameState === "correct" ? "#4BCB6B" : "#FF4B4B" }}
          >
            {gameState === "correct" ? "🎉 Correct!" : `❌ It was ${current.name}!`}
          </div>
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl text-white font-black text-xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #A78BFA, #818CF8)",
              boxShadow: "0 4px 0 #7C3AED",
            }}
          >
            {currentIndex + 1 >= queue.length ? "See Results 🏆" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}