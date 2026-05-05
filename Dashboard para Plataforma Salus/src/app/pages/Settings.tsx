import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Bell, 
  Lock, 
  Eye, 
  ShieldCheck, 
  Smartphone, 
  UserCog, 
  Globe, 
  LogOut,
  Moon,
  Info
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(true);

  const handleLogout = () => {
    toast.info("Sessão encerrada com segurança.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header de Navegação */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={() => navigate("/")}
            className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#0f2044]">Configurações</h1>
            <p className="text-xs text-slate-500 font-medium">Personalize sua experiência no SALUS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Menu Lateral de Categorias */}
          <div className="md:col-span-1 space-y-2">
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
              {[
                { icon: UserCog, label: "Conta", active: true },
                { icon: Bell, label: "Notificações", active: false },
                { icon: ShieldCheck, label: "Privacidade", active: false },
                { icon: Smartphone, label: "Dispositivos", active: false },
                { icon: Info, label: "Sobre o App", active: false },
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100"
            >
              <LogOut size={18} />
              Encerrar Sessão
            </button>
          </div>

          {/* Painel Principal de Ajustes */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Seção: Preferências de Acompanhamento */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Bell size={20} />
                </div>
                <h2 className="text-lg font-bold text-[#0f2044]">Notificações Inteligentes</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-700 text-sm">Alertas de Check-in Diário</p>
                    <p className="text-xs text-slate-400">Lembretes para registrar seu humor</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-blue-600 cursor-pointer transition-all relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-5 before:transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-700 text-sm">Identificação de Padrões</p>
                    <p className="text-xs text-slate-400">Notificar quando o sistema detectar sinais de estresse</p>
                  </div>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção: Segurança e Dados */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <Lock size={20} />
                </div>
                <h2 className="text-lg font-bold text-[#0f2044]">Segurança e LGPD</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-700 text-sm">Proteção Biométrica</p>
                    <p className="text-xs text-slate-400">Exigir digital/FaceID para abrir o diário emocional</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={biometrics}
                    onChange={() => setBiometrics(!biometrics)}
                    className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-green-600 cursor-pointer transition-all relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-5 before:transition-all"
                  />
                </div>

                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                  <div className="flex items-center gap-3">
                    <Eye size={18} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-600">Gerenciar Dados Sensíveis</span>
                  </div>
                  <ShieldCheck size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
            </div>

            <div className="p-4 text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">
                SALUS MVP v1.0 • 2026
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}