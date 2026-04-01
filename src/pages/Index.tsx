import { useState, useEffect, useCallback } from "react";

const ANIMALS = [
  { emoji: "🐶", name: "Собака", sound: "Гав!", hint: "Лучший друг человека", wrong: ["Кот", "Кролик", "Хомяк"] },
  { emoji: "🐱", name: "Кот", sound: "Мяу!", hint: "Мурлычет и ловит мышей", wrong: ["Собака", "Лиса", "Енот"] },
  { emoji: "🦁", name: "Лев", sound: "Рррр!", hint: "Царь зверей с большой гривой", wrong: ["Тигр", "Леопард", "Гепард"] },
  { emoji: "🐘", name: "Слон", sound: "Трубит!", hint: "Самое большое животное на суше", wrong: ["Носорог", "Бегемот", "Жираф"] },
  { emoji: "🐸", name: "Лягушка", sound: "Ква-ква!", hint: "Прыгает и живёт у воды", wrong: ["Жаба", "Ящерица", "Черепаха"] },
  { emoji: "🦊", name: "Лиса", sound: "Тяв!", hint: "Рыжая и хитрая красавица", wrong: ["Волк", "Кот", "Енот"] },
  { emoji: "🐼", name: "Панда", sound: "Пыхтит!", hint: "Чёрно-белый медведь ест бамбук", wrong: ["Медведь", "Зебра", "Коала"] },
  { emoji: "🦋", name: "Бабочка", sound: "Машет крыльями!", hint: "Порхает с цветка на цветок", wrong: ["Стрекоза", "Пчела", "Мотылёк"] },
  { emoji: "🐬", name: "Дельфин", sound: "Кликает!", hint: "Умный житель моря", wrong: ["Кит", "Акула", "Морж"] },
  { emoji: "🦒", name: "Жираф", sound: "Молчит!", hint: "Самая длинная шея в мире", wrong: ["Зебра", "Лошадь", "Верблюд"] },
  { emoji: "🐺", name: "Волк", sound: "Воет!", hint: "Живёт в стае в лесу", wrong: ["Собака", "Лиса", "Медведь"] },
  { emoji: "🐧", name: "Пингвин", sound: "Крякает!", hint: "Птица, которая не умеет летать", wrong: ["Страус", "Утка", "Орёл"] },
  { emoji: "🐯", name: "Тигр", sound: "Рычит!", hint: "Полосатый хищник джунглей", wrong: ["Лев", "Леопард", "Ягуар"] },
  { emoji: "🦓", name: "Зебра", sound: "Ржёт!", hint: "Лошадь в полосочку", wrong: ["Лошадь", "Осёл", "Пони"] },
  { emoji: "🐻", name: "Медведь", sound: "Рычит!", hint: "Любит мёд и спит зимой", wrong: ["Волк", "Кабан", "Лось"] },
];

const COLORS = [
  { bg: "bg-game-yellow", border: "border-yellow-400", shadow: "shadow-yellow-200" },
  { bg: "bg-game-pink", border: "border-pink-400", shadow: "shadow-pink-200" },
  { bg: "bg-game-blue", border: "border-teal-400", shadow: "shadow-teal-200" },
  { bg: "bg-game-purple", border: "border-purple-400", shadow: "shadow-purple-200" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 20 }, (_, i) => i);
  const colors = ["#FFD93D", "#FF6B35", "#FF85A1", "#4ECDC4", "#A78BFA", "#6BCB77"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-sm animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-20px",
            backgroundColor: colors[i % colors.length],
            animationDelay: `${Math.random() * 1.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function StarBurst({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div className="text-8xl animate-star-burst">⭐</div>
    </div>
  );
}

type GameState = "menu" | "playing" | "result";

export default function Index() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<typeof ANIMALS>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStar, setShowStar] = useState(false);
  const [cardAnim, setCardAnim] = useState("");
  const [btnAnim, setBtnAnim] = useState<Record<string, string>>({});
  const [floatAnim, setFloatAnim] = useState(true);
  const [streak, setStreak] = useState(0);

  const currentQ = questions[questionIndex];

  const startGame = useCallback(() => {
    const shuffled = shuffle(ANIMALS).slice(0, 10);
    setQuestions(shuffled);
    setScore(0);
    setLives(3);
    setQuestionIndex(0);
    setSelected(null);
    setStreak(0);
    setCardAnim("animate-bounce-in");
    generateOptions(shuffled[0]);
    setGameState("playing");
  }, []);

  function generateOptions(animal: typeof ANIMALS[0]) {
    const opts = shuffle([animal.name, ...animal.wrong.slice(0, 3)]);
    setOptions(opts);
  }

  function handleAnswer(answer: string) {
    if (selected) return;
    setSelected(answer);
    setFloatAnim(false);

    const correct = answer === currentQ.name;
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const bonus = newStreak >= 3 ? 20 : 10;
      setScore((s) => s + bonus);
      setBtnAnim({ [answer]: "animate-pop" });
      setShowStar(true);
      setTimeout(() => setShowStar(false), 600);
      if (newStreak >= 3) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      setStreak(0);
      setLives((l) => l - 1);
      setBtnAnim({ [answer]: "animate-shake" });
    }

    setTimeout(() => {
      if (!correct && lives - 1 <= 0) {
        setGameState("result");
        return;
      }
      const nextIndex = questionIndex + 1;
      if (nextIndex >= questions.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        setGameState("result");
        return;
      }
      setQuestionIndex(nextIndex);
      setSelected(null);
      setBtnAnim({});
      setFloatAnim(true);
      setCardAnim("");
      setTimeout(() => setCardAnim("animate-bounce-in"), 50);
      generateOptions(questions[nextIndex]);
    }, 1000);
  }

  const totalQ = questions.length;
  const progress = totalQ > 0 ? ((questionIndex) / totalQ) * 100 : 0;

  const grade = score >= 150 ? "🏆 Чемпион!" : score >= 100 ? "🥇 Отлично!" : score >= 60 ? "🥈 Хорошо!" : "🥉 Продолжай тренироваться!";

  return (
    <div
      className="min-h-screen font-nunito overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FFF8E7 0%, #FFF0F5 40%, #F0F8FF 100%)",
      }}
    >
      <Confetti active={showConfetti} />
      <StarBurst show={showStar} />

      {/* Декоративные фоновые элементы */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "0s" }}>🌟</div>
        <div className="absolute top-20 right-16 text-5xl opacity-10 animate-float" style={{ animationDelay: "0.8s" }}>🎈</div>
        <div className="absolute bottom-20 left-20 text-6xl opacity-10 animate-float" style={{ animationDelay: "1.5s" }}>🌈</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-10 animate-float" style={{ animationDelay: "0.4s" }}>🎉</div>
        <div className="absolute top-1/2 left-5 text-4xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>🌸</div>
        <div className="absolute top-1/3 right-5 text-4xl opacity-10 animate-float" style={{ animationDelay: "1.2s" }}>⭐</div>
      </div>

      {/* МЕНЮ */}
      {gameState === "menu" && (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="text-center animate-bounce-in">
            <div className="text-8xl mb-4 animate-float">🦁</div>
            <h1
              className="text-5xl md:text-7xl font-black mb-3"
              style={{
                fontFamily: "'Fredoka One', cursive",
                background: "linear-gradient(135deg, #FF6B35, #FF85A1, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(2px 2px 0px rgba(255,107,53,0.3))",
              }}
            >
              Угадай
            </h1>
            <h1
              className="text-5xl md:text-7xl font-black mb-6"
              style={{
                fontFamily: "'Fredoka One', cursive",
                background: "linear-gradient(135deg, #4ECDC4, #6BCB77, #FFD93D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(2px 2px 0px rgba(78,205,196,0.3))",
              }}
            >
              Животное!
            </h1>
            <p className="text-xl text-gray-500 font-bold mb-10">
              🐾 Угадай, кто спрятался? 10 вопросов!
            </p>

            {/* Карточки животных для украшения */}
            <div className="flex justify-center gap-3 mb-10">
              {["🐶", "🐱", "🐘", "🦊", "🐸"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-float"
                  style={{
                    background: ["#FFD93D", "#FF85A1", "#4ECDC4", "#A78BFA", "#6BCB77"][i],
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            <button
              onClick={startGame}
              className="relative px-12 py-5 rounded-3xl text-white text-2xl font-black transition-all duration-200 active:scale-95 hover:scale-105 shadow-2xl animate-pulse-ring"
              style={{
                fontFamily: "'Fredoka One', cursive",
                background: "linear-gradient(135deg, #FF6B35, #FF85A1)",
                boxShadow: "0 8px 0 #CC4422, 0 12px 20px rgba(255,107,53,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.07) translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateY(0)";
              }}
            >
              🎮 Играть!
            </button>

            <div className="mt-8 flex justify-center gap-6 text-gray-400 text-sm font-bold">
              <span>❤️ 3 жизни</span>
              <span>⭐ 10 очков за ответ</span>
              <span>🔥 Бонус за серию!</span>
            </div>
          </div>
        </div>
      )}

      {/* ИГРА */}
      {gameState === "playing" && currentQ && (
        <div className="relative min-h-screen flex flex-col items-center px-4 py-6">
          {/* Шапка */}
          <div className="w-full max-w-lg mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <span key={i} className={`text-2xl transition-all duration-300 ${i < lives ? "opacity-100" : "opacity-20 grayscale"}`}>
                    ❤️
                  </span>
                ))}
              </div>
              <div
                className="px-4 py-2 rounded-2xl text-white font-black text-lg"
                style={{ background: "linear-gradient(135deg, #FFD93D, #FF6B35)" }}
              >
                ⭐ {score}
              </div>
              <div className="text-gray-500 font-bold text-sm">
                {questionIndex + 1} / {totalQ}
              </div>
            </div>

            {/* Прогресс-бар */}
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #4ECDC4, #6BCB77, #FFD93D)",
                }}
              />
            </div>

            {/* Серия */}
            {streak >= 2 && (
              <div className="mt-2 text-center animate-bounce-in">
                <span className="text-sm font-black text-orange-500">
                  🔥 Серия: {streak}! {streak >= 3 ? "+20 очков!" : "+10 очков"}
                </span>
              </div>
            )}
          </div>

          {/* Карточка животного */}
          <div className={`relative w-full max-w-lg mb-6 ${cardAnim}`}>
            <div
              className="rounded-3xl p-8 text-center shadow-2xl border-4 border-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ffffff, #FFF8E7)",
              }}
            >
              {/* Декоративные кружки */}
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full opacity-20" style={{ background: "#FFD93D" }} />
              <div className="absolute bottom-3 left-3 w-14 h-14 rounded-full opacity-15" style={{ background: "#FF85A1" }} />

              <div
                className={`text-9xl mb-4 inline-block ${floatAnim ? "animate-float" : ""} ${selected === currentQ.name ? "animate-pop" : ""}`}
              >
                {currentQ.emoji}
              </div>
              <div
                className="text-xl font-bold text-gray-400 mb-1"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                💡 {currentQ.hint}
              </div>
              <div className="text-lg font-bold text-gray-300">
                {selected && `Говорит: ${currentQ.sound}`}
              </div>
            </div>
          </div>

          {/* Вопрос */}
          <div className="mb-5 text-center">
            <h2
              className="text-3xl font-black text-gray-700"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Кто это? 🤔
            </h2>
          </div>

          {/* Кнопки ответов */}
          <div className="w-full max-w-lg grid grid-cols-2 gap-3">
            {options.map((opt, i) => {
              const isCorrect = opt === currentQ.name;
              const isSelected = selected === opt;
              const showResult = selected !== null;

              let btnStyle = {};
              let btnClass = `relative p-4 rounded-2xl text-white text-xl font-black transition-all duration-200 shadow-lg border-b-4 ${btnAnim[opt] || ""}`;

              if (!showResult) {
                const colorPairs = [
                  { bg: "linear-gradient(135deg, #FF6B35, #FF8C5A)", border: "#CC4422" },
                  { bg: "linear-gradient(135deg, #4ECDC4, #6EE7E7)", border: "#2A9D8F" },
                  { bg: "linear-gradient(135deg, #A78BFA, #C4B5FD)", border: "#7C3AED" },
                  { bg: "linear-gradient(135deg, #FFD93D, #FFEA70)", border: "#CC9900" },
                ];
                btnStyle = {
                  background: colorPairs[i % 4].bg,
                  borderBottomColor: colorPairs[i % 4].border,
                  cursor: "pointer",
                };
                btnClass += " hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-1";
              } else if (isCorrect) {
                btnStyle = {
                  background: "linear-gradient(135deg, #6BCB77, #8EE4A0)",
                  borderBottomColor: "#3A9A46",
                };
                btnClass += " scale-105";
              } else if (isSelected) {
                btnStyle = {
                  background: "linear-gradient(135deg, #EF4444, #FC7373)",
                  borderBottomColor: "#B91C1C",
                };
              } else {
                btnStyle = {
                  background: "linear-gradient(135deg, #D1D5DB, #E5E7EB)",
                  borderBottomColor: "#9CA3AF",
                  opacity: 0.5,
                };
              }

              return (
                <button
                  key={opt}
                  className={btnClass}
                  style={btnStyle}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                >
                  {showResult && isCorrect && <span className="mr-1">✅</span>}
                  {showResult && isSelected && !isCorrect && <span className="mr-1">❌</span>}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* РЕЗУЛЬТАТ */}
      {gameState === "result" && (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-md animate-bounce-in">
            {/* Карточка результата */}
            <div
              className="rounded-3xl p-8 text-center shadow-2xl border-4 border-white mb-6"
              style={{
                background: "linear-gradient(135deg, #ffffff, #FFF8E7)",
              }}
            >
              <div className="text-8xl mb-4 animate-float">{score >= 100 ? "🏆" : score >= 60 ? "🎉" : "💪"}</div>
              <h2
                className="text-4xl font-black mb-2"
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  background: "linear-gradient(135deg, #FF6B35, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {grade}
              </h2>
              <p className="text-gray-500 font-bold text-lg mb-6">
                Ты набрал{score !== 1 ? "а" : ""} очков:
              </p>

              <div
                className="text-7xl font-black mb-6"
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  background: "linear-gradient(135deg, #FFD93D, #FF6B35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {score}
              </div>

              {/* Сетка с животными которых правильно угадали */}
              <div className="flex justify-center gap-2 flex-wrap mb-2">
                {questions.map((q, i) => (
                  <span key={i} className="text-3xl animate-float" style={{ animationDelay: `${i * 0.1}s` }}>
                    {q.emoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col gap-3">
              <button
                onClick={startGame}
                className="w-full py-5 rounded-3xl text-white text-2xl font-black transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl"
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  background: "linear-gradient(135deg, #FF6B35, #FF85A1)",
                  boxShadow: "0 6px 0 #CC4422, 0 10px 20px rgba(255,107,53,0.4)",
                }}
              >
                🔄 Играть снова!
              </button>
              <button
                onClick={() => setGameState("menu")}
                className="w-full py-4 rounded-3xl text-gray-500 text-xl font-bold transition-all duration-200 hover:scale-105 border-2 border-gray-200 bg-white"
              >
                🏠 В меню
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
