import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-2"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.6)" }}
      >
        <p className="text-[#0f2044]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: "1rem", fontWeight: 700, color: "#2563eb" }}>{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export function TrendChart({ refreshKey }: { refreshKey?: number }) {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ avg: "0", max: "0", min: "0" });

  useEffect(() => {
    async function fetchTrend() {
      if (!user) return;
      try {
        const history = await api.getHistory(user.id);
        
        // Process last 7 days
        const last7Days = history.slice(0, 7).reverse().map((item: any) => {
          const date = new Date(item.timestamp);
          return {
            day: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
            score: item.moodLevel
          };
        });

        if (last7Days.length > 0) {
          const scores = last7Days.map((d: any) => d.score);
          setStats({
            avg: (scores.reduce((a: number, b: number) => a + b, 0) / scores.length).toFixed(1),
            max: Math.max(...scores).toFixed(1),
            min: Math.min(...scores).toFixed(1)
          });
        }

        setData(last7Days);
      } catch (error) {
        console.error("Failed to fetch trend:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrend();
  }, [user, refreshKey]);

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 h-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 50%, #e0f2fe 100%)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#1e40af] uppercase tracking-wider" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
            Tendência de Humor
          </p>
          <h3 className="text-[#0f2044] mt-0.5" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Últimos Check-ins
          </h3>
        </div>
        {!isLoading && data.length > 1 && (
          <div
            className="px-3 py-1 rounded-full"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.18)" }}
          >
            <span className="text-[#1d4ed8]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
              {data[data.length-1].score >= data[data.length-2].score ? '↑ Melhora' : '↓ Queda'}
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0" style={{ minHeight: "140px" }}>
        {isLoading ? (
          <div className="flex-1 h-full flex items-center justify-center">
            <Loader2 className="animate-spin text-[#2563eb]" size={24} />
          </div>
        ) : data.length === 0 ? (
          <div className="flex-1 h-full flex items-center justify-center text-[#64748b] text-sm">
            Sem dados suficientes para o gráfico.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.2)" strokeDasharray="4 4" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 5]}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(37,99,235,0.2)", strokeWidth: 2 }} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#moodGrad)"
                dot={{ r: 3.5, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 5.5, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Stats row */}
      <div className="flex gap-4">
        {[
          { label: "Média", value: stats.avg },
          { label: "Pico", value: stats.max },
          { label: "Mínimo", value: stats.min },
        ].map(({ label, value }) => (
          <div key={label} className="flex-1 text-center">
            <p className="text-[#2563eb]" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{value}</p>
            <p className="text-[#64748b]" style={{ fontSize: "0.68rem" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
