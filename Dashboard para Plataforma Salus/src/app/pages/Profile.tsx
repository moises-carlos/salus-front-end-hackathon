import React, { useState, useEffect } from "react";
import { User, ClipboardList, Phone, UserRound, ArrowLeft, Save, Edit2, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [history, setHistory] = useState<any[]>([]);

  // Inicializa o formulário com dados do Contexto de Autenticação
  const [userData, setUserData] = useState({
    nome: user?.name || "Usuário",
    email: user?.email || "",
    nascimento: "02/04/2007", 
    medico: "Dr. Ricardo Oliveira", 
    contatoMedico: "(81) 98888-7777",
  });

  const [editForm, setEditForm] = useState({ ...userData });

  // Busca o histórico real da API ao carregar a página
  useEffect(() => {
    async function loadHistory() {
      if (!user?.id) return;
      try {
        const data = await api.getHistory(user.id);
        setHistory(data);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        toast.error("Não foi possível carregar seu histórico.");
      } finally {
        setIsLoadingHistory(false);
      }
    }
    loadHistory();
  }, [user]);

  const handleSave = async () => {
    // Nota: O trecho da API fornecido não possui 'updateProfile'. 
    // Esta função atualiza o estado local para refletir a interface.
    setUserData({ ...editForm });
    setIsEditing(false);
    toast.success("Perfil atualizado localmente!");
  };

  const handleCancel = () => {
    setEditForm({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Voltar para Dashboard
          </button>

          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm font-semibold"
            >
              <Edit2 size={18} />
              Editar Perfil
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-xl text-red-600 hover:bg-red-50 transition-all font-semibold"
              >
                <X size={18} />
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all shadow-md font-semibold"
              >
                <Save size={18} />
                Salvar Alterações
              </button>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-[#0f2044]">Meu Perfil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Dados Pessoais</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-400 uppercase">Nome Completo</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                    value={editForm.nome}
                    onChange={(e) => setEditForm({...editForm, nome: e.target.value})}
                  />
                ) : (
                  <p className="text-slate-700 font-medium">{userData.nome}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-400 uppercase">E-mail</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                ) : (
                  <p className="text-slate-700 font-medium">{userData.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-green-50 rounded-lg">
                <UserRound className="text-green-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Acompanhamento Médico</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-400 uppercase">Médico Responsável</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                    value={editForm.medico}
                    onChange={(e) => setEditForm({...editForm, medico: e.target.value})}
                  />
                ) : (
                  <p className="text-slate-700 font-medium">{userData.medico}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-400 uppercase">Contato</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone size={14} className="text-slate-400" />
                  <p className="text-slate-700 font-medium">{userData.contatoMedico}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <ClipboardList className="text-purple-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Histórico de Check-ins (API)</h2>
            </div>
            
            <div className="divide-y divide-slate-100">
              {isLoadingHistory ? (
                <div className="py-10 flex justify-center">
                  <Loader2 className="animate-spin text-blue-600" />
                </div>
              ) : history.length > 0 ? (
                history.map((item, index) => (
                  <div key={index} className="py-4 flex justify-between items-center hover:bg-slate-50 px-2 transition-colors rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-medium">Humor Nível {item.moodLevel}</span>
                      <span className="text-slate-400 text-xs">{item.notes}</span>
                    </div>
                    <span className="text-slate-400 text-sm font-semibold bg-slate-100 px-3 py-1 rounded-full">
                      {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-10 text-center text-slate-400">Nenhum registro encontrado.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;