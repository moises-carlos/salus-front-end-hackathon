import React, { useState } from "react";
import { BookOpen, X, Clock, User, Search, ArrowRight, ArrowLeft, HeartPulse, Brain, Zap, Moon, Sun, Coffee, Users, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Article {
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  image: string;
  author: string;
  readTime: string;
  icon: React.ReactNode;
}

const Articles = () => {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
const articles: Article[] = [
    {
      title: "Identificando Padrões Emocionais",
      excerpt: "Entenda como o monitoramento diário ajuda a identificar sinais iniciais de crises...",
      content: "O SALUS atua na identificação precoce de padrões emocionais[cite: 2]. Ao registrar seu humor, o sistema transforma dados em insights úteis para evitar que crises se agravem[cite: 2]. O autoconhecimento gerado por esses registros permite uma prevenção ativa e um controle emocional maior sobre a rotina[cite: 2].",
      tag: "Tecnologia",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      author: "Equipe Salus",
      readTime: "6 min",
      icon: <Brain size={18} />
    },
    {
      title: "Gestão da Rotina de Autocuidado",
      excerpt: "Como manter a constância nos cuidados diários para melhorar sua rotina mental...",
      content: "A dificuldade em organizar emoções torna o dia a dia mais pesado[cite: 2]. O SALUS serve como um aliado diário para facilitar a constância do autocuidado[cite: 2]. Estabelecer uma rotina de check-ins ajuda a manter o equilíbrio e apoia diretamente o acompanhamento médico[cite: 2].",
      tag: "Rotina",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
      author: "Dr. Vitor Santos",
      readTime: "5 min",
      icon: <HeartPulse size={18} />
    },
    {
      title: "Suporte Imediato em Crises",
      excerpt: "Saiba como o Modo de Crise oferece alívio e orientação em momentos críticos...",
      content: "Crises inesperadas são dores reais enfrentadas por milhões de pessoas[cite: 2]. O SALUS oferece suporte imediato e humanizado nesses momentos[cite: 2]. Através de ferramentas de alívio rápido e conexão facilitada com profissionais, você nunca estará sozinho em uma crise de pânico ou ansiedade[cite: 2].",
      tag: "Emergência",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      author: "Psic. Ana Oliveira",
      readTime: "4 min",
      icon: <Zap size={18} />
    },
    {
      title: "Higiene do Sono e Saúde Mental",
      excerpt: "A relação profunda entre noites bem dormidas e a regulação da ansiedade...",
      content: "O sono é um pilar da saúde mental. Manter horários regulares e reduzir estímulos eletrônicos antes de dormir ajuda o cérebro a processar emoções do dia. O SALUS visa promover o bem-estar e a prevenção através desses hábitos saudáveis[cite: 2].",
      tag: "Sono",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800", // Link Corrigido (4)
      author: "Dr. Moisés Carlos",
      readTime: "7 min",
      icon: <Moon size={18} />
    },
    {
      title: "Ansiedade no Ambiente Universitário",
      excerpt: "Estratégias para estudantes lidarem com a pressão acadêmica e prazos...",
      content: "Estudantes universitários são um dos perfis principais de usuários do SALUS[cite: 2]. A plataforma auxilia a compreender o estado emocional sob estresse, evitando que o isolamento e a pressão acadêmica se tornem crises graves[cite: 2].",
      tag: "Acadêmico",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      author: "Prof. Boniek Araújo",
      readTime: "8 min",
      icon: <Users size={18} />
    },
    {
      title: "Mindfulness: O Poder do Agora",
      excerpt: "Técnicas de atenção plena para reduzir sintomas de estresse e depressão...",
      content: "Mindfulness ajuda a identificar pensamentos intrusivos. Ao focar na respiração e no momento presente, o usuário reduz a reatividade emocional, um dos ganhos esperados para quem busca melhoria na qualidade de vida com o SALUS[cite: 2].",
      tag: "Prática",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      author: "Vitor Santos",
      readTime: "5 min",
      icon: <Sun size={18} />
    },
    {
      title: "Alimentação e Neurotransmissores",
      excerpt: "Como o que você come influencia a produção de serotonina e dopamina...",
      content: "A dieta influencia diretamente o humor. Alimentos ricos em triptofano auxiliam na produção de serotonina. O monitoramento comportamental do SALUS pode ajudar a relacionar hábitos alimentares com seu estado emocional diário[cite: 2].",
      tag: "Nutrição",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800",
      author: "Douglas Vinicius",
      readTime: "6 min",
      icon: <Coffee size={18} />
    },
    {
      title: "Vencendo o Estigma da Ajuda",
      excerpt: "Por que buscar profissionais de saúde mental é um ato de coragem e autocuidado...",
      content: "Um dos objetivos do SALUS é intermediar a busca de ajuda e conectar usuários a profissionais[cite: 2]. Superar o preconceito contra o tratamento é fundamental para alcançar o controle emocional e a prevenção de crises a longo prazo[cite: 2].",
      tag: "Conscientização",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800", // Link Corrigido (8)
      author: "Equipe Salus",
      readTime: "4 min",
      icon: <ShieldAlert size={18} />
    }
  ];
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] transition-colors duration-300">
      <div className="p-6 max-w-7xl mx-auto space-y-8 pb-20">
        
        {/* Navigation & Header */}
        <div className="flex flex-col space-y-6">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all font-semibold w-fit bg-white/50 px-4 py-2 rounded-xl border border-slate-200"
          >
            <ArrowLeft size={20} />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                <BookOpen size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0f2044]">Artigos e Dicas</h1>
                <p className="text-slate-500 font-medium">Seu aliado diário na jornada de saúde mental[cite: 2]</p>
              </div>
            </div>

            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Buscar temas de saúde..."
                className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 w-full md:w-80 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArticles.map((article, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md text-blue-700 rounded-full text-xs font-bold shadow-md">
                    {article.icon}
                    {article.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0f2044] leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center text-blue-600 font-bold text-xs">
                  Ler conteúdo completo <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-lg">Nenhum resultado para "{searchTerm}".</p>
            <p className="text-slate-300 text-sm">Tente buscar por Tecnologia, Sono ou Suporte.</p>
          </div>
        )}
      </div>

      {/* Modal Expandido */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedArticle(null)}
          />
          
          <div className="relative bg-white w-full max-w-3xl max-h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>

            <div className="h-64 sm:h-96 w-full relative shrink-0">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                  {selectedArticle.tag}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 leading-tight drop-shadow-lg">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar bg-white">
              <div className="flex flex-wrap items-center gap-6 mb-10 text-sm text-slate-400 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-black shadow-inner">
                    {selectedArticle.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 leading-none">{selectedArticle.author}</p>
                    <p className="text-[10px] uppercase mt-1">Especialista Salus</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                <span className="flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-widest"><Clock size={16} /> {selectedArticle.readTime} de leitura</span>
              </div>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-blue-900/70 leading-relaxed text-xl font-medium border-l-4 border-blue-600 pl-6 mb-8 bg-blue-50/50 py-4 rounded-r-2xl">
                  {selectedArticle.excerpt}
                </p>
                <div className="text-slate-700 text-lg leading-loose space-y-6 text-justify">
                  {selectedArticle.content}
                </div>
              </div>

              <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-slate-500 text-sm italic text-center">
                  O SALUS não substitui profissionais de saúde mental. Em caso de necessidade grave, procure ajuda especializada imediatamente[cite: 2].
                </p>
              </div>

              <button 
                onClick={() => setSelectedArticle(null)}
                className="w-full mt-10 py-5 bg-[#0f2044] hover:bg-blue-900 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-widest text-sm"
              >
                Concluir Leitura
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; border: 2px solid #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default Articles;