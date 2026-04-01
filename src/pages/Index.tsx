import { useNavigate } from "react-router-dom";

function FloatingBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "0s" }}>🌟</div>
      <div className="absolute top-20 right-16 text-5xl opacity-10 animate-float" style={{ animationDelay: "0.8s" }}>🎈</div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-10 animate-float" style={{ animationDelay: "1.5s" }}>🌈</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-10 animate-float" style={{ animationDelay: "0.4s" }}>🎉</div>
      <div className="absolute top-1/2 left-5 text-4xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>🌸</div>
      <div className="absolute top-1/3 right-5 text-4xl opacity-10 animate-float" style={{ animationDelay: "1.2s" }}>⭐</div>
    </div>
  );
}

const GAMES = [
  {
    id: "colors",
    emoji: "🎨",
    title: "Guess the Color",
    description: "Guess the color by its shade!",
    gradient: "linear-gradient(135deg, #FF6B35, #FF85A1)",
    shadow: "0 6px 0 #CC4422, 0 10px 20px rgba(255,107,53,0.4)",
    path: "/colors",
  },
  {
    id: "body",
    emoji: "👁️",
    title: "Body Parts",
    description: "Ears, eyes, nose, mouth, hair, hands, feet!",
    gradient: "linear-gradient(135deg, #4ECDC4, #6BCB77)",
    shadow: "0 6px 0 #2A9D8F, 0 10px 20px rgba(78,205,196,0.4)",
    path: "/body",
  },
  {
    id: "numbers",
    emoji: "🔢",
    title: "Guess the Number",
    description: "Numbers from 1 to 20 — test your memory!",
    gradient: "linear-gradient(135deg, #A78BFA, #818CF8)",
    shadow: "0 6px 0 #7C3AED, 0 10px 20px rgba(167,139,250,0.4)",
    path: "/numbers",
  },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen font-nunito overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FFF8E7 0%, #FFF0F5 40%, #F0F8FF 100%)",
      }}
    >
      <FloatingBg />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center animate-bounce-in mb-10">
          <div className="text-8xl mb-4 animate-float">🧠</div>
          <h1
            className="text-5xl md:text-7xl font-black mb-2"
            style={{
              fontFamily: "'Fredoka One', cursive",
              background: "linear-gradient(135deg, #FF6B35, #FF85A1, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(2px 2px 0px rgba(255,107,53,0.3))",
            }}
          >
            Word Quest!
          </h1>
          <p
            className="text-xl font-bold"
            style={{ color: "#A78BFA" }}
          >
            Pick a game and start playing! 🎮
          </p>
        </div>

        <div className="w-full max-w-md flex flex-col gap-5">
          {GAMES.map((game, index) => (
            <button
              key={game.id}
              onClick={() => navigate(game.path)}
              className="w-full rounded-3xl text-white text-left transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl border-4 border-white overflow-hidden"
              style={{
                background: game.gradient,
                boxShadow: game.shadow,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-4 p-6">
                <div className="text-6xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {game.emoji}
                </div>
                <div>
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                  >
                    {game.title}
                  </div>
                  <div className="text-sm font-bold opacity-80 mt-1">
                    {game.description}
                  </div>
                </div>
                <div className="ml-auto text-3xl">→</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex gap-4 text-4xl animate-float" style={{ animationDelay: "1s" }}>
          <span>🏆</span><span>⭐</span><span>🎯</span>
        </div>
      </div>
    </div>
  );
}
