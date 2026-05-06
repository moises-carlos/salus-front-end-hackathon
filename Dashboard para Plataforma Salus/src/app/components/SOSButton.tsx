import { useState, useEffect } from "react";
import { Phone, X, Loader2, Wind, Eye, HeartPulse, MessageCircle } from "lucide-react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export function SOSButton() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [mode, setStep] = useState<"options" | "breathing" | "grounding">("options");
  
  const [breathStatus, setBreathStatus] = useState("Inspirar");

  useEffect(() => {
    if (mode === "breathing") {
      const interval = setInterval(() => {
        setBreathStatus((prev) => (prev === "Inspirar" ? "Expirar" : "Inspirar"));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const handleActivateCrisis = async (type: string) => {
    if (!user) return;
    setIsActivating(true);
    try {
      await api.activateCrisis(user.id, 10);
      toast.success(`Alerta de crise enviado! Iniciando ${type}...`);
      setShowModal(false);
    } catch (error) {
      toast.error("Erro ao enviar alerta. Ligue 188.");
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <button
          onClick={() => { setShowModal(true); setStep("options"); }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          className="flex items-center gap-2.5 transition-all duration-300 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #ff6b47 0%, #e85d42 100%)",
            borderRadius: "50px",
            padding: "14px 28px",
            boxShadow: "0 6px 24px rgba(232,93,66,0.38)",
            border: "2px solid rgba(255,255,255,0.25)",
            color: "white",
            minWidth: expanded ? "320px" : "260px",
          }}
        >
          <HeartPulse size={18} className="animate-pulse" />
          <span style={{ fontSize: "0.83rem", fontWeight: 700 }}>SOS · Preciso de ajuda agora</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f2044]/60 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full flex flex-col gap-6 shadow-2xl overflow-hidden relative">
            
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setStep("options")} 
                className={`text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 ${mode === "options" ? "invisible" : ""}`}
              >
                ← Voltar
              </button>
              <button onClick={() => setShowModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {mode === "options" && (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                  <h2 className="text-[#0f2044] text-xl font-bold">Você não está sozinho.</h2>
                  <p className="text-slate-500 text-sm mt-2">Como podemos te ajudar agora?</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setStep("breathing")}
                    className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all group"
                  >
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                      <Wind size={24} />
                    </div>
                    <span className="text-xs font-bold text-blue-900">Respiração</span>
                  </button>

                  <button 
                    onClick={() => setStep("grounding")}
                    className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-all group"
                  >
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                      <Eye size={24} />
                    </div>
                    <span className="text-xs font-bold text-purple-900">Técnica 5-4-3</span>
                  </button>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    onClick={() => handleActivateCrisis("ligação")}
                    className="w-full py-4 rounded-2xl bg-[#e85d42] text-white font-bold text-sm shadow-lg shadow-red-200 flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all"
                  >
                    <Phone size={18} /> Ligar para Suporte (188)
                  </button>
                  
                  <button
                    onClick={() => handleActivateCrisis("chat")}
                    className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all"
                  >
                    <MessageCircle size={18} /> Falar com Psicólogo
                  </button>
                </div>
              </div>
            )}

            {mode === "breathing" && (
              <div className="flex flex-col items-center gap-10 py-6 animate-in zoom-in-95">
                <div className="text-center">
                  <h3 className="text-[#0f2044] font-bold text-xl uppercase tracking-tighter transition-all duration-500">
                    {breathStatus}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">Siga o ritmo dos pontos</p>
                </div>

                <div className="relative flex items-center justify-center w-72 h-72">
                  {/* Pontos se multiplicando e expandindo */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className={`absolute rounded-full border-[3px] border-dashed border-blue-500/40 transition-all duration-[4000ms] ease-in-out ${
                        breathStatus === "Inspirar" 
                          ? "opacity-100 rotate-180" 
                          : "w-4 h-4 opacity-0 rotate-0"
                      }`}
                      style={{ 
                        width: breathStatus === "Inspirar" ? `${(i + 1) * 20 + 20}%` : "16px",
                        height: breathStatus === "Inspirar" ? `${(i + 1) * 20 + 20}%` : "16px",
                        transitionDelay: breathStatus === "Inspirar" ? `${i * 100}ms` : "0ms",
                        borderStyle: 'dotted'
                      }}
                    />
                  ))}
                  
                  {/* Bolinha Única que sobra no final da expiração */}
                  <div 
                    className={`rounded-full bg-blue-600 shadow-lg transition-all duration-[4000ms] ease-in-out ${
                      breathStatus === "Inspirar" ? "w-8 h-8 opacity-100" : "w-4 h-4"
                    }`}
                  />
                </div>

                <button 
                  onClick={() => setStep("options")}
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  Concluir exercício
                </button>
              </div>
            )}

            {mode === "grounding" && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-right-4">
                <div className="text-center">
                  <h3 className="text-[#0f2044] font-bold text-lg">Aterramento 5-4-3-2-1</h3>
                  <p className="text-slate-400 text-xs">Reconecte-se com o presente</p>
                </div>

                <div className="space-y-2">
                  {[
                    { n: 5, t: "Coisas que você vê", bg: "bg-blue-50", c: "text-blue-600" },
                    { n: 4, t: "Coisas que você pode tocar", bg: "bg-emerald-50", c: "text-emerald-600" },
                    { n: 3, t: "Sons que você ouve", bg: "bg-amber-50", c: "text-amber-600" },
                    { n: 2, t: "Cheiros que sente", bg: "bg-purple-50", c: "text-purple-600" },
                    { n: 1, t: "Sabor na boca", bg: "bg-rose-50", c: "text-rose-600" },
                  ].map((item) => (
                    <div key={item.n} className={`flex items-center gap-4 p-3.5 rounded-2xl ${item.bg} border border-white shadow-sm`}>
                      <span className={`text-xl font-black ${item.c}`}>{item.n}</span>
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{item.t}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setStep("options")}
                  className="w-full py-4 bg-[#0f2044] text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-black transition-all"
                >
                  Estou me sentindo melhor
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}