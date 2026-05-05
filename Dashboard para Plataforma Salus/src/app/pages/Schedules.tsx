import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  Stethoscope,
  MapPin,
  ListFilter,
  History,
  ClipboardCheck
} from "lucide-react";
import { toast } from "sonner";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: {
    [key: string]: string[];
  };
  bio: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dra. Letícia Schmidt",
    specialty: "Especialista em Ansiedade e Pânico",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=200",
    bio: "Focada em terapia cognitivo-comportamental para transtornos de ansiedade.",
    availability: { "06/05": ["09:00", "10:30"], "07/05": ["11:00", "15:30"] }
  },
  {
    id: 2,
    name: "Dr. Ricardo Oliveira",
    specialty: "Psiquiatra - Foco em Depressão",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
    bio: "Especialista em acompanhamento clínico e suporte inteligente.",
    availability: { "06/05": ["08:00", "13:00"], "08/05": ["09:00", "14:00"] }
  }
];

export default function Schedules() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"necessarios" | "agendados" | "concluidos">("necessarios");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      toast.success(`Consulta marcada com ${selectedDoctor.name} para ${selectedDate} às ${selectedTime}!`);
      setStep(1);
      setActiveTab("agendados");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={() => step === 1 ? navigate("/") : setStep(1)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all font-semibold"
          >
            <ArrowLeft size={20} />
            {step === 1 ? "Voltar para Dashboard" : "Voltar"}
          </button>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
            <Stethoscope size={16} /> Agendamento Salus
          </div>
        </div>

        {step === 1 && (
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 w-full md:w-fit">
            {[
              { id: "necessarios", label: "Necessários", icon: ListFilter },
              { id: "agendados", label: "Agendados", icon: ClipboardCheck },
              { id: "concluidos", label: "Concluídos", icon: History }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {step === 1 ? (
          <div className="animate-in fade-in duration-500">
            {activeTab === "necessarios" && (
              <div className="space-y-6">
                <header>
                  <h1 className="text-3xl font-black text-[#0f2044]">Especialistas Disponíveis</h1>
                  <p className="text-slate-500 font-medium">Conecte-se a profissionais para acompanhamento contínuo.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                      className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-50 shadow-sm" />
                        <div>
                          <h3 className="text-lg font-bold text-[#0f2044]">{doc.name}</h3>
                          <p className="text-blue-600 text-xs font-semibold">{doc.specialty}</p>
                        </div>
                        <button className="w-full py-2.5 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-600 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                          Agendar agora <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "agendados" && (
              <div className="bg-white rounded-[2rem] p-10 text-center border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="text-blue-600" size={32} />
                </div>
                <h2 className="text-xl font-bold text-[#0f2044]">Suas próximas consultas</h2>
                <p className="text-slate-500 mt-2">Você possui agendamentos ativos para suporte emocional constante.</p>
              </div>
            )}

            {activeTab === "concluidos" && (
              <div className="bg-white rounded-[2rem] p-10 text-center border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="text-slate-400" size={32} />
                </div>
                <h2 className="text-xl font-bold text-[#0f2044]">Histórico de Atendimento</h2>
                <p className="text-slate-500 mt-2">Veja seus progressos e relatórios de sessões anteriores.</p>
              </div>
            )}
          </div>
        ) : (
          /* Parte de Seleção de Horário */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-300">
            <div className="lg:col-span-1 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm text-center">
                <img src={selectedDoctor?.image} className="w-24 h-24 rounded-full mx-auto border-4 border-blue-100 mb-4" />
                <h2 className="text-xl font-black text-[#0f2044]">{selectedDoctor?.name}</h2>
                <p className="text-blue-600 font-bold text-sm mb-4">{selectedDoctor?.specialty}</p>
                <p className="text-slate-600 text-xs leading-relaxed">{selectedDoctor?.bio}</p>
            </div>

            <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#0f2044] mb-6 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={20} /> Escolha um horário
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    {Object.keys(selectedDoctor?.availability || {}).map((date) => (
                      <button
                        key={date}
                        onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                        className={`flex-1 py-3 rounded-2xl border-2 transition-all font-bold ${selectedDate === date ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-white border-slate-100 text-slate-500 hover:border-blue-200"}`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                  {selectedDate && (
                    <div className="grid grid-cols-3 gap-3 animate-in fade-in">
                      {selectedDoctor?.availability[selectedDate].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-xl border-2 font-bold transition-all ${selectedTime === time ? "bg-blue-50 border-blue-600 text-blue-700" : "bg-slate-50 border-transparent text-slate-400"}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  disabled={!selectedTime}
                  onClick={handleBooking}
                  className="w-full mt-8 py-4 bg-[#0f2044] hover:bg-blue-900 text-white rounded-2xl font-black transition-all disabled:bg-slate-200"
                >
                  Confirmar Agendamento
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}