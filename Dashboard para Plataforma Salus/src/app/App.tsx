import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Schedules from "./pages/Schedules";
import Settings from "./pages/Settings"; 
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <Loader2 className="animate-spin text-[#2563eb]" size={40} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

         
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          
          <Route
            path="/artigos"
            element={
              <PrivateRoute>
                <Articles />
              </PrivateRoute>
            }
          />

          
          <Route
            path="/agendamentos"
            element={
              <PrivateRoute>
                <Schedules />
              </PrivateRoute>
            }
          />

         
          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}