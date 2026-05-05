import { Bell, Search } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { CheckInCard } from "../components/CheckInCard";
import { TrendChart } from "../components/TrendChart";
import { CheckInHistory } from "../components/CheckInHistory";
import { SchedulingCard } from "../components/SchedulingCard";
import { SOSButton } from "../components/SOSButton";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api"; // Restaurado
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Restaurado

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="flex items-center justify-between mb-7 gap-4">
      <div className="ml-1">
        <p className="text-[#94a3b8] uppercase tracking-widest" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="text-[#0f2044] mt-0.5" style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.2 }}>
          Olá, {user?.name?.split(' ')[0] || 'Visitante'} 
        </h1>
        <p className="text-[#64748b] mt-0.5" style={{ fontSize: "0.875rem" }}>
          Bem-vindo ao seu painel de saúde.
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white"
          style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <Search size={14} className="text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none text-[#0f2044] placeholder:text-[#cbd5e1] w-28"
            style={{ fontSize: "0.8rem" }}
          />
        </div>

        <button
          className="w-9 h-9 rounded-xl bg-white flex items-center justify-center relative hover:bg-[#f8fafc] transition-colors"
          style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <Bell size={16} className="text-[#64748b]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e85d42]" />
        </button>

        <div
          onClick={() => navigate("/perfil")}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5ba4f5] to-[#2563eb] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all"
          style={{ boxShadow: "0 2px 8px rgba(37,99,235,0.28)" }}
          title="Ver meu perfil"
        >
          <span className="text-white" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
            {user?.name?.substring(0, 2).toUpperCase() || "SA"}
          </span>
        </div>
      </div>
    </header>
  );
}

// Componente de Registro (QuickCheckIn) restaurado
function QuickCheckIn({ onCheckInSuccess }: { onCheckInSuccess: () => void }) {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { emoji: "😞", label: "Péssimo", value: 1 },
    { emoji: "😔", label: "Mal", value: 2 },
    { emoji: "😐", label: "Neutro", value: 3 },
    { emoji: "😊", label: "Bem", value: 4 },
    { emoji: "😄", label: "Ótimo", value: 5 },
  ];

  const handleCheckIn = async () => {
    if (selectedMood === null || !user) return;

    setIsSubmitting(true);
    try {
      await api.checkIn(user.id, {
        moodLevel: selectedMood,
        tags: [moods.find(m => m.value === selectedMood)?.label || ""],
        notes: "Check-in rápido via dashboard"
      });
      toast.success("Check-in realizado com sucesso!");
      setSelectedMood(null);
      onCheckInSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar check-in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl px-6 py-4 mb-5 flex items-center gap-4 flex-wrap"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
    >
      <p className="text-[#0f2044] flex-shrink-0" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
        Check-in rápido:
      </p>
      <div className="flex gap-2 flex-wrap">
        {moods.map(({ emoji, label, value }) => (
          <button
            key={label}
            onClick={() => setSelectedMood(value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95 ${
              selectedMood === value 
                ? "bg-[#eff6ff] scale-105 border-[#3b82f6]" 
                : "bg-[#f8fafc] hover:bg-[#f1f5f9]"
            }`}
            style={{ border: selectedMood === value ? "1px solid #3b82f6" : "1px solid rgba(0,0,0,0.05)" }}
          >
            <span style={{ fontSize: "1.1rem" }}>{emoji}</span>
            <span className="text-[#64748b]" style={{ fontSize: "0.72rem", fontWeight: 500 }}>{label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={handleCheckIn}
        disabled={selectedMood === null || isSubmitting}
        className="ml-auto flex-shrink-0 px-4 py-1.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
          fontSize: "0.78rem",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(37,99,235,0.28)",
        }}
      >
        {isSubmitting ? "Enviando..." : "Registrar"}
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="min-h-screen flex" style={{ background: "#f0f4f8" }}>
      <Sidebar />

      <main
        className="salus-main flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ minWidth: 0, overflowX: "hidden" }}
      >
        <div className="flex-1 px-6 py-8 max-w-[1200px] w-full mx-auto pb-28">
          <Header />
          
          {/* Registro emocional inserido novamente */}
          <QuickCheckIn onCheckInSuccess={handleRefresh} />
          
          <div className="flex gap-5 mb-5" style={{ flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 calc(33.33% - 14px)", minWidth: "260px", flexGrow: 1, minHeight: "240px" }}>
              <CheckInCard mood="good" />
            </div>
            <div style={{ flex: "0 0 calc(66.66% - 6px)", minWidth: "300px", flexGrow: 2, minHeight: "240px" }}>
              <TrendChart refreshKey={refreshKey} />
            </div>
          </div>

          <div className="flex gap-5" style={{ flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 calc(58.33% - 10px)", minWidth: "300px", flexGrow: 2, minHeight: "340px" }}>
              <CheckInHistory refreshKey={refreshKey} />
            </div>
            <div style={{ flex: "0 0 calc(41.66% - 10px)", minWidth: "260px", flexGrow: 1, minHeight: "340px" }}>
              <SchedulingCard />
            </div>
          </div>
        </div>
      </main>

      <SOSButton />

      <style>{`
        .salus-main {
          margin-left: 240px;
        }
        @media (max-width: 768px) {
          .salus-main {
            margin-left: 0 !important;
          }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(0.92); }
        }
      `}</style>
    </div>
  );
}