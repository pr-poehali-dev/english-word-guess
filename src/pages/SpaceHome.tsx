import { useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";

const PLANETS = [
  {
    id: "articles",
    path: "/articles",
    title: "Articles",
    subtitle: "a / an / the",
    emoji: "🪐",
    color: "#FF6B35",
    glow: "#FF6B35",
    shadow: "#cc4400",
    size: 110,
    top: "12%",
    left: "8%",
    badge: "🏅",
  },
  {
    id: "present-simple",
    path: "/present-simple",
    title: "Present Simple",
    subtitle: "I play / She plays",
    emoji: "🌍",
    color: "#4ECDC4",
    glow: "#4ECDC4",
    shadow: "#2A9D8F",
    size: 130,
    top: "5%",
    left: "55%",
    badge: "🥇",
  },
  {
    id: "question-words",
    path: "/question-words",
    title: "Question Words",
    subtitle: "Who? What? Where?",
    emoji: "💜",
    color: "#A78BFA",
    glow: "#A78BFA",
    shadow: "#6d28d9",
    size: 100,
    top: "38%",
    left: "75%",
    badge: "🔮",
  },
  {
    id: "sports",
    path: "/sports",
    title: "Sports",
    subtitle: "football, tennis...",
    emoji: "🌑",
    color: "#6BCB77",
    glow: "#6BCB77",
    shadow: "#3a9e46",
    size: 95,
    top: "55%",
    left: "15%",
    badge: "⚽",
  },
  {
    id: "professions",
    path: "/professions",
    title: "Professions",
    subtitle: "doctor, teacher...",
    emoji: "🟠",
    color: "#FFD93D",
    glow: "#FFD93D",
    shadow: "#c9a000",
    size: 115,
    top: "65%",
    left: "55%",
    badge: "🎓",
  },
  {
    id: "appearance",
    path: "/appearance",
    title: "Appearance",
    subtitle: "curls, golden, lovely...",
    emoji: "🌸",
    color: "#FF85A1",
    glow: "#FF85A1",
    shadow: "#cc2255",
    size: 105,
    top: "35%",
    left: "38%",
    badge: "💎",
  },
];

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 3,
}));

export default function SpaceHome() {
  const navigate = useNavigate();
  const { isCompleted, getTotalStars } = useProgress();
  const totalStars = getTotalStars();

  return (
    <div
      className="min-h-screen relative overflow-hidden font-nunito"
      style={{
        background: "radial-gradient(ellipse at 20% 30%, #1a0533 0%, #0a0a1a 40%, #000510 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Stars */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity: 0.6 + Math.random() * 0.4,
            animation: `twinkle ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Header */}
      <div className="relative z-10 text-center pt-8 pb-4 px-4">
        <div
          className="inline-block text-4xl font-black mb-1"
          style={{
            fontFamily: "'Fredoka One', cursive",
            background: "linear-gradient(135deg, #FFD93D, #FF85A1, #74D7F7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🚀 Space English
        </div>
        <p className="text-blue-200 font-bold text-sm">Explore planets — learn English!</p>
        <div className="mt-2 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1 border border-white/20">
          <span className="text-yellow-300 font-black text-lg">⭐ {totalStars}</span>
          <span className="text-white/70 text-xs font-bold">stars collected</span>
        </div>
      </div>

      {/* Solar system area */}
      <div className="relative z-10 w-full" style={{ height: "calc(100vh - 160px)", minHeight: 520 }}>
        {/* Sun */}
        <div
          className="absolute"
          style={{
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "radial-gradient(circle, #FFF7A1 0%, #FFD93D 50%, #FF6B35 100%)",
            boxShadow: "0 0 40px 20px rgba(255,217,61,0.4), 0 0 80px 40px rgba(255,107,53,0.2)",
            animation: "float 4s ease-in-out infinite",
          }}
        />

        {/* Planets */}
        {PLANETS.map((planet) => {
          const done = isCompleted(planet.id);
          return (
            <button
              key={planet.id}
              onClick={() => navigate(planet.path)}
              className="absolute flex flex-col items-center group"
              style={{ top: planet.top, left: planet.left, transform: "translate(-50%, 0)" }}
            >
              {/* Planet circle */}
              <div
                className="rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 active:scale-95 relative"
                style={{
                  width: planet.size,
                  height: planet.size,
                  background: `radial-gradient(circle at 35% 35%, ${planet.color}ee, ${planet.shadow})`,
                  boxShadow: `0 0 30px 10px ${planet.glow}44, inset 0 -8px 20px rgba(0,0,0,0.3)`,
                  animation: "float 4s ease-in-out infinite",
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                <span style={{ fontSize: planet.size * 0.38 }}>
                  {done ? planet.badge : planet.emoji}
                </span>
                {done && (
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-sm font-black"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                  >
                    ✓
                  </div>
                )}
              </div>
              {/* Label */}
              <div
                className="mt-2 text-center"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 12,
                  padding: "3px 10px",
                  border: `2px solid ${planet.color}66`,
                }}
              >
                <p className="text-white font-black text-xs leading-tight">{planet.title}</p>
                <p className="text-white/60 font-bold" style={{ fontSize: 9 }}>{planet.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom hint */}
      <div className="fixed bottom-4 left-0 right-0 text-center z-10">
        <p className="text-white/40 text-xs font-bold">Tap a planet to start! 🌟</p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
