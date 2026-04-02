import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";

interface Question {
  question: string;
  options: string[];
  correct: string;
  emoji?: string;
}

interface GameShellProps {
  planetId: string;
  title: string;
  subtitle: string;
  color: string;
  shadow: string;
  questions: Question[];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const REWARDS: Record<number, { title: string; emoji: string; text: string }> = {
  3: { title: "Amazing!", emoji: "🏆", text: "Perfect score! You're a star!" },
  2: { title: "Good job!", emoji: "🌟", text: "Almost perfect! Keep going!" },
  1: { title: "Keep trying!", emoji: "💪", text: "Practice makes perfect!" },
  0: { title: "Try again!", emoji: "🚀", text: "You can do it next time!" },
};

export default function GameShell({ planetId, title, subtitle, color, shadow, questions }: GameShellProps) {
  const navigate = useNavigate();
  const { complete } = useProgress();
  const [queue] = useState(() => shuffle(questions));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [rewardShown, setRewardShown] = useState(false);

  const current = queue[index];
  const shuffledOptions = useState(() => queue.map((q) => shuffle(q.options)))[0];

  const handleAnswer = (opt: string) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    const correct = opt === current.correct;
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (index + 1 >= queue.length) {
      const stars = score >= queue.length * 0.8 ? 3 : score >= queue.length * 0.5 ? 2 : score >= 1 ? 1 : 0;
      complete(planetId, stars);
      setFinished(true);
      setRewardShown(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (finished && rewardShown) {
    const pct = Math.round((score / queue.length) * 100);
    const level = score >= queue.length * 0.8 ? 3 : score >= queue.length * 0.5 ? 2 : score >= 1 ? 1 : 0;
    const reward = REWARDS[level];
    const stars = level;

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 font-nunito"
        style={{ background: "radial-gradient(ellipse at 20% 30%, #1a0533 0%, #0a0a1a 40%, #000510 100%)" }}
      >
        <div
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border-2"
          style={{ borderColor: `${color}66` }}
        >
          <div className="text-7xl mb-3 animate-bounce-in">{reward.emoji}</div>
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3].map((s) => (
              <span key={s} className="text-3xl" style={{ opacity: s <= stars ? 1 : 0.25 }}>⭐</span>
            ))}
          </div>
          <h2 className="text-3xl font-black mb-1 text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
            {reward.title}
          </h2>
          <p className="text-white/70 font-bold mb-2">{reward.text}</p>
          <p className="text-2xl font-black mb-1" style={{ color }}>
            {score} / {queue.length}
          </p>
          <p className="text-white/50 font-bold mb-6">{pct}% correct</p>

          {/* Reward badge */}
          <div
            className="rounded-2xl p-4 mb-6 border-2"
            style={{ background: `${color}22`, borderColor: `${color}55` }}
          >
            <p className="text-white font-black text-sm mb-1">🎁 Planet Reward Unlocked!</p>
            <p className="text-white/70 text-xs font-bold">
              {stars === 3 ? "Gold Medal 🥇 — You mastered this planet!" :
               stars === 2 ? "Silver Medal 🥈 — Great work!" :
               stars === 1 ? "Bronze Medal 🥉 — Good start!" :
               "Try again to get a medal!"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-2xl text-white font-black text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${color}, ${shadow})`, boxShadow: `0 4px 0 ${shadow}` }}
            >
              Play Again 🔄
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 border-2 text-white"
              style={{ borderColor: color }}
            >
              Back to Space 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 font-nunito"
      style={{ background: "radial-gradient(ellipse at 20% 30%, #1a0533 0%, #0a0a1a 40%, #000510 100%)" }}
    >
      {/* Header */}
      <div className="w-full max-w-sm mb-5 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-3xl text-white/70 hover:text-white transition-colors">
          ←
        </button>
        <div className="text-center">
          <p className="font-black text-lg text-white" style={{ fontFamily: "'Fredoka One', cursive", color }}>
            {title}
          </p>
          <p className="text-white/50 text-xs font-bold">{subtitle}</p>
        </div>
        <div
          className="rounded-2xl px-3 py-1 font-black text-sm border"
          style={{ background: `${color}22`, borderColor: `${color}55`, color }}
        >
          {score} ⭐
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-sm mb-5">
        <div className="flex justify-between text-xs font-bold text-white/40 mb-1">
          <span>Question {index + 1} of {queue.length}</span>
          <span>{Math.round((index / queue.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(index / queue.length) * 100}%`, background: `linear-gradient(90deg, ${color}, ${shadow})` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className="w-full max-w-sm rounded-3xl p-6 mb-5 border-2 text-center"
        style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)", borderColor: `${color}44` }}
      >
        {current.emoji && <div className="text-6xl mb-3 animate-float">{current.emoji}</div>}
        <p className="text-white font-black text-xl leading-snug">{current.question}</p>
      </div>

      {/* Options */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3">
        {shuffledOptions[index].map((opt) => {
          let bg = "rgba(255,255,255,0.08)";
          let border = "rgba(255,255,255,0.15)";
          let textColor = "white";
          let mark = "";

          if (answered) {
            if (opt === current.correct) {
              bg = "#22c55e22";
              border = "#22c55e";
              textColor = "#4ade80";
              mark = " ✓";
            } else if (opt === selected) {
              bg = "#ef444422";
              border = "#ef4444";
              textColor = "#f87171";
              mark = " ✗";
            }
          }

          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
              className="py-3 px-3 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 border-2"
              style={{ background: bg, borderColor: border, color: textColor }}
            >
              {opt}{mark}
            </button>
          );
        })}
      </div>

      {answered && (
        <button
          onClick={handleNext}
          className="mt-5 w-full max-w-sm py-3 rounded-2xl text-white font-black text-lg transition-all hover:scale-105 active:scale-95 animate-bounce-in"
          style={{ background: `linear-gradient(135deg, ${color}, ${shadow})`, boxShadow: `0 4px 0 ${shadow}` }}
        >
          {index + 1 >= queue.length ? "See Results! 🎉" : "Next →"}
        </button>
      )}
    </div>
  );
}
