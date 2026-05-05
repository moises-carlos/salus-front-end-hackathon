import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Settings,
  Menu,
  X,
  LogOut,
  HeartPulse,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Artigos", path: "/artigos" },
  { icon: CalendarDays, label: "Agendamentos", path: "/agendamentos" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.info("Sessão encerrada.");
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#0f2044] text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          bg-gradient-to-b from-[#0c1a3a] to-[#0f2348]
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-[240px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.18)" }}
      >
        <div className="flex items-center justify-between px-4 pt-7 pb-8">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavigation("/")}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4a90d9] to-[#2563eb] flex items-center justify-center shadow-lg flex-shrink-0">
              <HeartPulse size={18} className="text-white" />
            </div>
            {!collapsed && (
              <span
                className="text-white tracking-wide"
                style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "0.04em" }}
              >
                Salus
              </span>
            )}
          </div>
          <button
            onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}
            className="text-white/40 hover:text-white/80 transition-colors hidden md:block"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/40 hover:text-white/80 transition-colors md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mx-4 h-px bg-white/10 mb-4" />

        {!collapsed && (
          <p className="px-5 mb-2 text-white/30 uppercase tracking-widest" style={{ fontSize: "0.65rem" }}>
            Menu
          </p>
        )}

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={label}
                onClick={() => handleNavigation(path)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${active
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }
                `}
              >
                <Icon
                  size={19}
                  className={active ? "text-[#5ba4f5]" : ""}
                  strokeWidth={active ? 2 : 1.6}
                />
                {!collapsed && (
                  <span style={{ fontSize: "0.875rem", fontWeight: active ? 500 : 400 }}>
                    {label}
                  </span>
                )}
                {active && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5ba4f5]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mx-4 h-px bg-white/10 mb-4" />

        <div className={`px-3 pb-6 flex flex-col gap-2 ${collapsed ? "items-center" : ""}`}>
          <div 
            className={`flex items-center gap-3 px-2 cursor-pointer hover:bg-white/5 py-2 rounded-xl transition-colors ${collapsed ? "justify-center" : ""}`}
            onClick={() => handleNavigation("/perfil")}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5ba4f5] to-[#2563eb] flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white/10">
              <span className="text-white" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                {user?.name?.substring(0, 2).toUpperCase() || "SA"}
              </span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-white truncate" style={{ fontSize: "0.8rem", fontWeight: 500 }}>{user?.name || "Usuário"}</p>
                <p className="text-white/40 truncate" style={{ fontSize: "0.7rem" }}>{user?.role || "Paciente"}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={18} />
            {!collapsed && <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
}