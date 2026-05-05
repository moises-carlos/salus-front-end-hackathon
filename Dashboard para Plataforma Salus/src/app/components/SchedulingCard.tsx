import { CalendarPlus, Flame, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const streakDays = ["S", "T", "Q", "Q", "S", "S", "D"];
const activeStreak = [true, true, true, true, true, false, false];

interface Professional {
  id: string;
  name: string;
  specialty: string;
}

export function SchedulingCard() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        const data = await api.getProfessionals();
        setProfessionals(data);
      } catch (error) {
        console.error("Failed to fetch professionals:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfessionals();
  }, []);

  const recommendedPro = professionals[0];

  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-5 h-full"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#64748b] uppercase tracking-wider" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
            Comprometimento
          </p>
          <h3 className="text-[#0f2044] mt-0.5" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Sequência de Uso
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <Flame size={18} className="text-[#f97316]" />
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f97316" }}>5</span>
          <span className="text-[#94a3b8]" style={{ fontSize: "0.72rem" }}>dias</span>
        </div>
      </div>

      {/* Streak dots */}
      <div className="flex items-center justify-between gap-1">
        {streakDays.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                background: activeStreak[i]
                  ? "linear-gradient(135deg, #f97316, #ef4444)"
                  : "#f1f5f9",
                boxShadow: activeStreak[i] ? "0 2px 8px rgba(249,115,22,0.35)" : "none",
              }}
            >
              {activeStreak[i] ? (
                <Flame size={14} className="text-white" />
              ) : (
                <span style={{ fontSize: "0.65rem", color: "#cbd5e1" }}>—</span>
              )}
            </div>
            <span
              style={{ fontSize: "0.6rem", fontWeight: 500, color: activeStreak[i] ? "#f97316" : "#cbd5e1" }}
            >
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Motivational message */}
      <div
        className="rounded-xl p-3 flex items-start gap-2.5"
        style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
      >
        <Star size={14} className="text-[#f59e0b] mt-0.5 flex-shrink-0" />
        <p className="text-[#92400e]" style={{ fontSize: "0.75rem", lineHeight: "1.5" }}>
          Incrível! Você está com <strong>5 dias seguidos</strong> de check-in. Continue assim!
        </p>
      </div>

      {/* Next appointment / Recommendation */}
      <div className="flex-1">
        <p className="text-[#64748b]" style={{ fontSize: "0.75rem", fontWeight: 500, marginBottom: "0.5rem" }}>
          Recomendação de Profissional
        </p>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="animate-spin text-[#2563eb]" size={20} />
          </div>
        ) : recommendedPro ? (
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: "#f0f7ff", border: "1px solid #bfdbfe" }}
          >
            <div className="w-10 h-10 rounded-lg bg-[#2563eb] flex items-center justify-center flex-shrink-0 text-white font-bold">
              {recommendedPro.name.charAt(0)}
            </div>
            <div>
              <p className="text-[#0f2044]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{recommendedPro.name}</p>
              <p className="text-[#64748b]" style={{ fontSize: "0.7rem" }}>{recommendedPro.specialty}</p>
            </div>
          </div>
        ) : (
          <p className="text-[#94a3b8] text-center italic" style={{ fontSize: "0.75rem" }}>Nenhum profissional disponível no momento.</p>
        )}
      </div>

      {/* CTA Button */}
      <button
        className="w-full py-3.5 rounded-2xl text-white transition-all duration-200 active:scale-[0.98] hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
          fontSize: "0.875rem",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <CalendarPlus size={16} />
          Agendar Nova Consulta
        </span>
      </button>
    </div>
  );
}
