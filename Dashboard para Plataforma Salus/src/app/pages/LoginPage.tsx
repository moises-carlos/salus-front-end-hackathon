import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.login({ email, password });
      login(response);
      toast.success("Bem-vindo de volta!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0c1a3a] p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1">
            <span className="text-white text-2xl font-bold tracking-tight">Sal</span>
            <span className="text-[#3b82f6] text-2xl font-bold tracking-tight">us</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg mb-20">
          <h1 className="text-white text-5xl font-serif leading-tight mb-6">
            Cuide da sua mente com <span className="italic font-normal">inteligência</span> e presença
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Monitoramento emocional contínuo, suporte em momentos difíceis e conexão com profissionais — tudo em um só lugar.
          </p>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-[#f8fafc] flex items-center justify-center p-8 sm:p-12">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-[#0f2044] text-3xl font-serif font-semibold mb-2">Bem-vindo de volta</h2>
            <p className="text-[#64748b] text-sm">Insira suas credenciais para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#475569]">E-mail</label>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all text-[#0f2044] placeholder:text-[#94a3b8]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[#475569]">Senha</label>
                <button type="button" className="text-xs text-[#64748b] hover:text-[#2563eb] transition-colors">Esqueceu a senha?</button>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all text-[#0f2044] placeholder:text-[#94a3b8]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#2563eb] text-white rounded-xl font-semibold shadow-lg shadow-[#2563eb]/20 hover:bg-[#1d4ed8] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Entrar"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#64748b] text-sm">
              Ainda não tem conta?{" "}
              <Link to="/register" className="text-[#2563eb] font-bold hover:underline">Criar conta gratuita</Link>
            </p>
          </div>
        </div>
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
