import { Clock, TrendingUp } from "lucide-react";

const moodMap: Record<string, { emoji: string; label: string; color: string; bg: string }> = {
  great: { emoji: "😊", label: "Muito bem", color: "#16a34a", bg: "#f0fdf4" },
  good: { emoji: "🙂", label: "Bem", color: "#2563eb", bg: "#eff6ff" },
  neutral: { emoji: "😐", label: "Neutro", color: "#b45309", bg: "#fffbeb" },
  bad: { emoji: "😔", label: "Cansado", color: "#9333ea", bg: "#faf5ff" },
};

interface CheckInCardProps {
  mood?: keyof typeof moodMap;
  date?: string;
  time?: string;
  score?: number;
}

export function CheckInCard({
  mood = "good",
  date = "05 de maio, 2026",
  time = "08:42",
  score = 7.4,
}: CheckInCardProps) {
  const m = moodMap[mood];

  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 h-full"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#64748b] uppercase tracking-wider" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
            Último Check-in
          </p>
          <h3 className="text-[#0f2044] mt-0.5" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Estado Emocional
          </h3>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center">
          <TrendingUp size={16} className="text-[#2563eb]" />
        </div>
      </div>

      {/* Mood display */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: m.bg, fontSize: "2rem" }}
        >
          {m.emoji}
        </div>
        <div>
          <p className="text-[#0f2044]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
            {m.label}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={12} className="text-[#94a3b8]" />
            <p className="text-[#94a3b8]" style={{ fontSize: "0.75rem" }}>
              {date} · {time}
            </p>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[#64748b]" style={{ fontSize: "0.75rem" }}>Pontuação de bem-estar</p>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: m.color }}>{score}/10</span>
        </div>
        <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${score * 10}%`,
              background: `linear-gradient(90deg, ${m.color}88, ${m.color})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
