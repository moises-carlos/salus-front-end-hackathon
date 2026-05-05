import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { Loader2, Pencil, BarChart2, Users } from "lucide-react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await api.register({ 
        name: `${firstName} ${lastName}`.trim(), 
        email, 
        password 
      });
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 bg-[#f8fafc] flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="max-w-md w-full py-10">
          <div className="mb-10">
            <div className="flex items-center gap-1 mb-10">
              <span className="text-[#0f2044] text-2xl font-bold tracking-tight">Sal</span>
              <span className="text-[#2563eb] text-2xl font-bold tracking-tight">us</span>
            </div>
            <h1 className="text-[#0f2044] text-3xl font-serif font-semibold mb-2">Crie sua conta</h1>
            <p className="text-[#64748b] text-sm">Seu cuidado começa com um primeiro passo</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#475569]">Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ana"
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all text-[#0f2044] placeholder:text-[#cbd5e1]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#475569]">Sobrenome</label>
                <input
                  type="text"
                  required
                  placeholder="Silva"
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all text-[#0f2044] placeholder:text-[#cbd5e1]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#475569]">E-mail</label>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all text-[#0f2044] placeholder:text-[#cbd5e1]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#475569]">Senha</label>
              <input
                type="password"
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all text-[#0f2044] placeholder:text-[#cbd5e1]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#475569]">Confirmar senha</label>
              <input
                type="password"
                required
                placeholder="Repita a senha"
                className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all text-[#0f2044] placeholder:text-[#cbd5e1]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#2563eb] text-white rounded-xl font-semibold shadow-lg shadow-[#2563eb]/20 hover:bg-[#1d4ed8] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-[#64748b] text-[10px] leading-relaxed">
            Ao criar sua conta, você concorda com os <a href="#" className="text-[#2563eb] hover:underline">Termos de Uso</a> e a <a href="#" className="text-[#2563eb] hover:underline">Política de Privacidade</a> da SALUS.
          </p>

          <div className="mt-6 text-center">
            <p className="text-[#64748b] text-sm">
              Já tem conta? <Link to="/login" className="text-[#2563eb] font-bold hover:underline">Fazer login</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0c1a3a] p-12 flex-col justify-center relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-white text-4xl font-serif leading-tight mb-10">
            Sua jornada de <span className="italic font-normal">bem-estar</span> começa aqui
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-12">
            Junte-se a milhares de pessoas que já transformaram a forma de cuidar da saúde mental.
          </p>

          <div className="space-y-8">
            {[
              { icon: Pencil, title: "Diário emocional inteligente", desc: "Registre como você se sente e entenda seus padrões ao longo do tempo." },
              { icon: BarChart2, title: "Análise de padrões emocionais", desc: "Visualize tendências e receba alertas antes que crises se agravem." },
              { icon: Users, title: "Conexão com profissionais", desc: "Acesse psicólogos e psiquiatras diretamente pela plataforma." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}
