import React, { useState } from "react";
import { User, ClipboardList, Phone, UserRound, ArrowLeft, Save, Edit2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    nome: "Caio Lucas Laurindo Da Silva",
    nascimento: "02/04/2007",
    email: "caio.lucas@exemplo.com",
    medico: "Dr. Ricardo Oliveira",
    contatoMedico: "(81) 98888-7777",
    historico: [
      { data: "01/05/2026", registro: "Check-in matinal concluído" },
      { data: "28/04/2026", registro: "Pressão arterial aferida: 12/8" },
      { data: "15/04/2026", registro: "Consulta de rotina realizada" }
    ]
  });

  const [editForm, setEditForm] = useState({ ...userData });

  const handleSave = () => {
    setUserData({ ...editForm });
    setIsEditing(false);
    toast.success("Perfil atualizado com sucesso!");
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
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome Completo</label>
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
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data de Nascimento</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                    value={editForm.nascimento}
                    onChange={(e) => setEditForm({...editForm, nascimento: e.target.value})}
                  />
                ) : (
                  <p className="text-slate-700 font-medium">{userData.nascimento}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</label>
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
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Médico Responsável</label>
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
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telefone de Contato</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                    value={editForm.contatoMedico}
                    onChange={(e) => setEditForm({...editForm, contatoMedico: e.target.value})}
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={14} className="text-slate-400" />
                    <p className="text-slate-700 font-medium">{userData.contatoMedico}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <ClipboardList className="text-purple-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Histórico Recente</h2>
            </div>
            
            <div className="divide-y divide-slate-100">
              {userData.historico.map((item, index) => (
                <div key={index} className="py-4 flex justify-between items-center hover:bg-slate-50 px-2 transition-colors rounded-lg">
                  <span className="text-slate-700 font-medium">{item.registro}</span>
                  <span className="text-slate-400 text-sm font-semibold bg-slate-100 px-3 py-1 rounded-full">{item.data}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;