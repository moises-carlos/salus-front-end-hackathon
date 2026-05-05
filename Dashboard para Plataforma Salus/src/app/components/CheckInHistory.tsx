import { ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

interface HistoryItem {
  id: string;
  moodLevel: number;
  tags: string[];
  timestamp: string;
}

export function CheckInHistory({ refreshKey }: { refreshKey?: number }) {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      if (!user) return;
      try {
        const data = await api.getHistory(user.id);
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [user, refreshKey]);

  const getMoodConfig = (level: number) => {
    if (level >= 4.5) return { emoji: "😄", label: "Ótimo", color: "#16a34a" };
    if (level >= 3.5) return { emoji: "🙂", label: "Bem", color: "#2563eb" };
    if (level >= 2.5) return { emoji: "😐", label: "Neutro", color: "#b45309" };
    if (level >= 1.5) return { emoji: "😔", label: "Mal", color: "#9333ea" };
    return { emoji: "😞", label: "Péssimo", color: "#dc2626" };
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 h-full"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#64748b] uppercase tracking-wider" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
            Histórico
          </p>
          <h3 className="text-[#0f2044] mt-0.5" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Check-ins Recentes
          </h3>
        </div>
        <button className="text-[#2563eb] hover:text-[#1d4ed8] transition-colors flex items-center gap-0.5" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
          Ver todos <ChevronRight size={13} />
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-[200px]">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#2563eb]" size={24} />
          </div>
        ) : history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <p className="text-[#64748b]" style={{ fontSize: "0.85rem" }}>Nenhum check-in realizado ainda.</p>
          </div>
        ) : (
          history.map((item) => {
            const config = getMoodConfig(item.moodLevel);
            const { date, time } = formatDate(item.timestamp);
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors cursor-pointer group"
              >
                {/* Emoji badge */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${config.color}12`, fontSize: "1.25rem" }}
                >
                  {config.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0f2044]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{config.label}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-md"
                      style={{ fontSize: "0.65rem", fontWeight: 600, color: config.color, background: `${config.color}14` }}
                    >
                      {item.moodLevel}/5
                    </span>
                  </div>
                  <p className="text-[#94a3b8] truncate" style={{ fontSize: "0.72rem" }}>
                    {item.tags.join(", ")}
                  </p>
                </div>

                {/* Date/time */}
                <div className="text-right flex-shrink-0">
                  <p className="text-[#64748b]" style={{ fontSize: "0.7rem", fontWeight: 500 }}>{date}</p>
                  <p className="text-[#94a3b8]" style={{ fontSize: "0.65rem" }}>{time}</p>
                </div>

                <ChevronRight size={14} className="text-[#cbd5e1] group-hover:text-[#2563eb] transition-colors flex-shrink-0" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
