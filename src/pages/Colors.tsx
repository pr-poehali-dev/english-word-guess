import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const COLORS = [
  { name: "Red", hex: "#FF4B4B", emoji: "🔴" },
  { name: "Blue", hex: "#4B8BFF", emoji: "🔵" },
  { name: "Green", hex: "#4BCB6B", emoji: "🟢" },
  { name: "Yellow", hex: "#FFD94B", emoji: "🟡" },
  { name: "Orange", hex: "#FF8C4B", emoji: "🟠" },
  { name: "Purple", hex: "#A855F7", emoji: "🟣" },
  { name: "Pink", hex: "#FF85C2", emoji: "🩷" },
  { name: "Brown", hex: "#A0522D", emoji: "🟤" },
  { name: "Black", hex: "#2D2D2D", emoji: "⚫" },
  { name: "White", hex: "#F0F0F0", emoji: "⚪" },
  { name: "Gray", hex: "#9CA3AF", emoji: "🩶" },
  { name: "Cyan", hex: "#06B6D4", emoji: "🩵" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getOptions(correct: typeof COLORS[number], all: typeof COLORS): typeof COLORS[number][] {
  const others = shuffle(all.filter((c) => c.name !== correct.name)).slice(0, 3);
  return shuffle([correct, ...others]);
}

type GameState = "playing" | "correct" | "wrong";

export default function Colors() {
  const navigate = useNavigate();
  const [queue] = useState(() => shuffle(COLORS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const current = queue[currentIndex];
  const options = useCallback(
    () => getOptions(current, COLORS),
    [current]
  );
  const [currentOptions] = useState(options);
  const [optionsPerQuestion] = useState<Record<number, typeof COLORS>>({
    0: getOptions(queue[0], COLORS),
  });

  const getOpts = (idx: number) => {
    if (!optionsPerQuestion[idx]) {
      optionsPerQuestion[idx] = getOptions(queue[idx], COLORS);
    }
    return optionsPerQuestion[idx];
  };

  const handleAnswer = (name: string) => {
    if (gameState !== "playing") return;
    setSelectedAnswer(name);
    if (name === current.name) {
      setScore((s) => s + 1);
      setGameState("correct");
    } else {
      setGameState("wrong");
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= queue.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setGameState("playing");
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const opts = getOpts(currentIndex);

  if (finished) {
    const total = queue.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 font-nunito"
        style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFF0F5 40%, #F0F8FF 100%)" }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-4 border-orange-200">
          <div className="text-7xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "🌟" : "💪"}</div>
          <h2
            className="text-4xl font-black mb-2"
            style={{ fontFamily: "'Fredoka One', cursive", color: "#FF6B35" }}
          >
            Game Over!
          </h2>
          <p className="text-xl font-bold text-gray-600 mb-1">Your score:</p>
          <p className="text-5xl font-black mb-2" style={{ color: "#A78BFA" }}>
            {score} / {total}
          </p>
          <p className="text-lg font-bold mb-6" style={{ color: pct >= 80 ? "#4BCB6B" : pct >= 50 ? "#FFD94B" : "#FF4B4B" }}>
            {pct >= 80 ? "Excellent! 🎉" : pct >= 50 ? "Good job! 👍" : "Keep practicing! 🔥"}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="w-full py-3 rounded-2xl text-white font-black text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF85A1)", boxShadow: "0 4px 0 #CC4422" }}
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
      style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFF0F5 40%, #F0F8FF 100%)" }}
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
            style={{ fontFamily: "'Fredoka One', cursive", color: "#FF6B35" }}
          >
            🎨 Guess the Color
          </span>
        </div>
        <div
          className="bg-white rounded-2xl px-3 py-1 font-black text-lg shadow border-2 border-orange-200"
          style={{ color: "#A78BFA" }}
        >
          {score} ⭐
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex justify-between text-sm font-bold text-gray-400 mb-1">
          <span>Question {currentIndex + 1} of {queue.length}</span>
          <span>{Math.round(((currentIndex) / queue.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${(currentIndex / queue.length) * 100}%`,
              background: "linear-gradient(90deg, #FF6B35, #FF85A1)",
            }}
          />
        </div>
      </div>

      {/* Color display */}
      <div className="w-full max-w-sm mb-8">
        <div
          className="w-full h-48 rounded-3xl shadow-2xl border-8 border-white transition-all duration-500"
          style={{ backgroundColor: current.hex }}
        />
        <p className="text-center font-bold text-gray-400 mt-3 text-lg">
          What color is this? 🤔
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3">
        {opts.map((opt) => {
          let btnStyle: React.CSSProperties = {
            background: "white",
            border: "4px solid #E5E7EB",
            color: "#374151",
          };
          let emoji = "";

          if (gameState !== "playing" && selectedAnswer !== null) {
            if (opt.name === current.name) {
              btnStyle = {
                background: "linear-gradient(135deg, #4BCB6B, #22C55E)",
                border: "4px solid #16A34A",
                color: "white",
              };
              emoji = " ✅";
            } else if (opt.name === selectedAnswer && selectedAnswer !== current.name) {
              btnStyle = {
                background: "linear-gradient(135deg, #FF4B4B, #EF4444)",
                border: "4px solid #DC2626",
                color: "white",
              };
              emoji = " ❌";
            }
          }

          return (
            <button
              key={opt.name}
              onClick={() => handleAnswer(opt.name)}
              disabled={gameState !== "playing"}
              className="py-4 rounded-2xl font-black text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
              style={btnStyle}
            >
              {opt.emoji} {opt.name}{emoji}
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
