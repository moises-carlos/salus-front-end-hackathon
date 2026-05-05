import { useState } from "react";
import { Phone, X, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export function SOSButton() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateCrisis = async (type: string) => {
    if (!user) return;
    
    setIsActivating(true);
    try {
      await api.activateCrisis(user.id, 10); // Max intensity for SOS
      toast.success(`Alerta de crise enviado! Iniciando ${type}...`);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to activate crisis:", error);
      toast.error("Erro ao enviar alerta. Tente novamente ou ligue 188.");
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <>
      {/* Floating SOS button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <button
          onClick={() => setShowModal(true)}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          className="flex items-center gap-2.5 transition-all duration-300 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #ff6b47 0%, #e85d42 100%)",
            borderRadius: "50px",
            padding: expanded ? "14px 28px" : "14px 24px",
            boxShadow: "0 6px 24px rgba(232,93,66,0.38), 0 2px 8px rgba(232,93,66,0.2)",
            border: "2px solid rgba(255,255,255,0.25)",
            color: "white",
            cursor: "pointer",
            minWidth: expanded ? "320px" : "260px",
          }}
        >
          <div
            className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0"
            style={{ animation: "pulse-ring 2s infinite" }}
          >
            <Phone size={13} className="text-white" />
          </div>
          <span style={{ fontSize: "0.83rem", fontWeight: 700, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
            SOS · Preciso de ajuda agora
          </span>
          {expanded && (
            <span
              className="ml-auto text-white/70"
              style={{ fontSize: "0.7rem", fontWeight: 500, whiteSpace: "nowrap" }}
            >
              Clique para acionar
            </span>
          )}
        </button>
      </div>

      {/* SOS Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,32,68,0.55)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col gap-5"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#fff1ed] flex items-center justify-center">
                <Phone size={22} className="text-[#e85d42]" />
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg bg-[#f1f5f9] flex items-center justify-center hover:bg-[#e2e8f0] transition-colors"
              >
                <X size={16} className="text-[#64748b]" />
              </button>
            </div>

            <div>
              <h2 className="text-[#0f2044]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Você não está sozinho(a).
              </h2>
              <p className="text-[#64748b] mt-1.5" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                Estamos aqui para ajudar. Escolha como prefere receber suporte agora:
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => handleActivateCrisis("ligação")}
                disabled={isActivating}
                className="w-full py-3.5 rounded-2xl text-white transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #e85d42, #ff6b47)",
                  boxShadow: "0 4px 14px rgba(232,93,66,0.3)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {isActivating ? <Loader2 className="animate-spin" size={18} /> : "📞 Ligar para suporte (CVV: 188)"}
              </button>
              <button
                onClick={() => handleActivateCrisis("chat")}
                disabled={isActivating}
                className="w-full py-3.5 rounded-2xl text-white transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.28)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {isActivating ? <Loader2 className="animate-spin" size={18} /> : "💬 Conversar com psicólogo agora"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-2xl text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                Estou bem, fechar
              </button>
            </div>

            <p className="text-center text-[#94a3b8]" style={{ fontSize: "0.68rem" }}>
              Serviço disponível 24h/7 dias · Totalmente confidencial
            </p>
          </div>
        </div>
      )}
    </>
  );
}
