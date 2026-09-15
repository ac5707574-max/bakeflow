import { TrendingUp, Lock, DollarSign, Star, Flower2, Crown } from "lucide-react";

const MONTHLY = [
  { month: "Abr", revenue: 28000 },
  { month: "May", revenue: 31000 },
  { month: "Jun", revenue: 35000 },
  { month: "Jul", revenue: 38000 },
  { month: "Ago", revenue: 39500 },
  { month: "Sep", revenue: 42180 },
];

const maxRevenue = Math.max(...MONTHLY.map((m) => m.revenue));

export default function AdminStats() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-foreground">Estadísticas</h1>
        <p className="text-muted-foreground text-sm mt-1 font-medium">Tendencias de crecimiento de BakeFlow</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Tasa de conversión", value: "24%", sub: "Gratuito → Pro", Icon: TrendingUp },
          { label: "Retención mensual", value: "92%", sub: "Suscripciones", Icon: Lock },
          { label: "Ticket promedio", value: "$248", sub: "Por pedido", Icon: DollarSign },
          { label: "NPS Score", value: "78", sub: "Muy bueno", Icon: Star },
        ].map(({ label, value, sub, Icon }) => (
          <div key={label} className="bg-card rounded-3xl card-shadow border border-border p-5">
            <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center mb-2">
              <Icon size={18} className="text-pink-400" />
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs font-bold text-foreground mt-0.5">{label}</div>
            <div className="text-xs text-muted-foreground">{sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-3xl card-shadow border border-border p-6 mb-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <DollarSign size={18} className="text-pink-400" /> Ingresos mensuales
        </h2>
        <div className="flex items-end gap-4 h-48">
          {MONTHLY.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-bold text-muted-foreground">${(m.revenue / 1000).toFixed(0)}k</div>
              <div className="w-full flex items-end justify-center" style={{ height: "140px" }}>
                <div className="w-full bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-xl transition-all hover:from-pink-600 hover:to-pink-400"
                  style={{ height: `${(m.revenue / maxRevenue) * 100}%` }} />
              </div>
              <div className="text-xs font-bold text-foreground">{m.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { plan: "Gratuito", count: 59, pct: 24, color: "bg-pink-300", Icon: Flower2 },
          { plan: "Pro", count: 131, pct: 53, color: "bg-purple-400", Icon: Star },
          { plan: "Premium", count: 58, pct: 23, color: "bg-amber-400", Icon: Crown },
        ].map(({ plan, count, pct, color, Icon }) => (
          <div key={plan} className="bg-card rounded-3xl card-shadow border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-muted-foreground" />
                <span className="font-bold text-foreground">{plan}</span>
              </div>
              <span className="font-display text-xl font-semibold text-foreground">{pct}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <div className="text-sm text-muted-foreground font-medium">{count} pastelerías</div>
          </div>
        ))}
      </div>
    </div>
  );
}
