import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NUMBERS = [
  { value: 1, word: "One", emoji: "1️⃣" },
  { value: 2, word: "Two", emoji: "2️⃣" },
  { value: 3, word: "Three", emoji: "3️⃣" },
  { value: 4, word: "Four", emoji: "4️⃣" },
  { value: 5, word: "Five", emoji: "5️⃣" },
  { value: 6, word: "Six", emoji: "6️⃣" },
  { value: 7, word: "Seven", emoji: "7️⃣" },
  { value: 8, word: "Eight", emoji: "8️⃣" },
  { value: 9, word: "Nine", emoji: "9️⃣" },
  { value: 10, word: "Ten", emoji: "🔟" },
  { value: 11, word: "Eleven", emoji: "1️⃣1️⃣" },
  { value: 12, word: "Twelve", emoji: "1️⃣2️⃣" },
  { value: 13, word: "Thirteen", emoji: "1️⃣3️⃣" },
  { value: 14, word: "Fourteen", emoji: "1️⃣4️⃣" },
  { value: 15, word: "Fifteen", emoji: "1️⃣5️⃣" },
  { value: 16, word: "Sixteen", emoji: "1️⃣6️⃣" },
  { value: 17, word: "Seventeen", emoji: "1️⃣7️⃣" },
  { value: 18, word: "Eighteen", emoji: "1️⃣8️⃣" },
  { value: 19, word: "Nineteen", emoji: "1️⃣9️⃣" },
  { value: 20, word: "Twenty", emoji: "2️⃣0️⃣" },
];

// Two game modes
type Mode = "number-to-word" | "word-to-number";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getOptions(correct: typeof NUMBERS[number], all: typeof NUMBERS): typeof NUMBERS[number][] {
  const others = shuffle(all.filter((n) => n.value !== correct.value)).slice(0, 3);
  return shuffle([correct, ...others]);
}

type GameState = "playing" | "correct" | "wrong";

function getDots(n: number): string {
  const dots = ["⚪", "🔵", "🟢", "🟡", "🟠", "🔴", "🟣", "🟤"];
  const color = dots[n % dots.length];
  if (n <= 10) return color.repeat(n);
  return color.repeat(10) + "\n" + color.repeat(n - 10);
}

export default function Numbers() {
  const navigate = useNavigate();
  const [mode] = useState<Mode>(() =>
    Math.random() < 0.5 ? "number-to-word" : "word-to-number"
  );
  const [queue] = useState(() => shuffle(NUMBERS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [optionsMap] = useState<Record<number, typeof NUMBERS>>({});

  const getOpts = (idx: number) => {
    if (!optionsMap[idx]) {
      optionsMap[idx] = getOptions(queue[idx], NUMBERS);
    }
    return optionsMap[idx];
  };

  const current = queue[currentIndex];
  const opts = getOpts(currentIndex);

  const handleAnswer = (value: number) => {
    if (gameState !== "playing") return;
    setSelectedAnswer(value);
    if (value === current.value) {
      setScore((s) => s + 1);
      setGameState("correct");
    } else {
      setGameState("wrong");
    }
    setShowDots(false);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= queue.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setGameState("playing");
    setShowDots(false);
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
        style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 40%, #E0E7FF 100%)" }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-4 border-purple-200">
          <div className="text-7xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "🌟" : "💪"}</div>
          <h2
            className="text-4xl font-black mb-2"
            style={{ fontFamily: "'Fredoka One', cursive", color: "#A78BFA" }}
          >
            Game Over!
          </h2>
          <p className="text-xl font-bold text-gray-600 mb-1">Your score:</p>
          <p className="text-5xl font-black mb-2" style={{ color: "#818CF8" }}>
            {score} / {total}
          </p>
          <p className="text-lg font-bold mb-6" style={{ color: pct >= 80 ? "#4BCB6B" : pct >= 50 ? "#F59E0B" : "#FF4B4B" }}>
            {pct >= 80 ? "Brilliant! 🎉" : pct >= 50 ? "Good job! 👍" : "Keep practicing! 🔥"}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="w-full py-3 rounded-2xl text-white font-black text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #A78BFA, #818CF8)", boxShadow: "0 4px 0 #7C3AED" }}
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
      style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 40%, #E0E7FF 100%)" }}
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
            style={{ fontFamily: "'Fredoka One', cursive", color: "#A78BFA" }}
          >
            🔢 Numbers
          </span>
        </div>
        <div
          className="bg-white rounded-2xl px-3 py-1 font-black text-lg shadow border-2 border-purple-200"
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
              background: "linear-gradient(90deg, #A78BFA, #818CF8)",
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-sm mb-6">
        <div
          className="w-full rounded-3xl shadow-2xl border-8 border-white flex flex-col items-center justify-center py-8 px-4 min-h-[160px]"
          style={{ background: "linear-gradient(135deg, #EDE9FE, #DDD6FE)" }}
        >
          {mode === "number-to-word" ? (
            <>
              <div
                className="text-8xl font-black leading-none animate-bounce-in"
                style={{ fontFamily: "'Fredoka One', cursive", color: "#7C3AED" }}
              >
                {current.value}
              </div>
              <p className="font-bold text-purple-400 mt-2 text-lg">
                Which word is this number?
              </p>
            </>
          ) : (
            <>
              <div
                className="text-5xl font-black animate-bounce-in text-center"
                style={{ fontFamily: "'Fredoka One', cursive", color: "#7C3AED" }}
              >
                {current.word}
              </div>
              <p className="font-bold text-purple-400 mt-2 text-lg">
                Which number is this word?
              </p>
            </>
          )}
        </div>

        {/* Dots helper */}
        <div className="mt-3">
          {showDots ? (
            <div
              className="rounded-2xl px-4 py-3 text-center border-2 text-sm leading-6"
              style={{ background: "#FAF5FF", borderColor: "#DDD6FE", color: "#6D28D9" }}
            >
              {getDots(current.value)}
            </div>
          ) : (
            <button
              onClick={() => setShowDots(true)}
              disabled={gameState !== "playing"}
              className="w-full py-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 border-2 border-dashed"
              style={{ borderColor: "#C4B5FD", color: "#7C3AED", background: "transparent" }}
            >
              💡 Show dots to count
            </button>
          )}
        </div>
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
            if (opt.value === current.value) {
              btnStyle = {
                background: "linear-gradient(135deg, #4BCB6B, #22C55E)",
                border: "4px solid #16A34A",
                color: "white",
              };
              mark = " ✅";
            } else if (opt.value === selectedAnswer && selectedAnswer !== current.value) {
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
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              disabled={gameState !== "playing"}
              className="py-4 rounded-2xl font-black text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
              style={btnStyle}
            >
              {mode === "number-to-word" ? opt.word : opt.value}
              {mark}
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
            {gameState === "correct"
              ? "🎉 Correct!"
              : `❌ It was ${current.value} — ${current.word}!`}
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
