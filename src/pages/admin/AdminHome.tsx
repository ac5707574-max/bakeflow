import { Store, Users, Star, DollarSign, BarChart2, CreditCard, ArrowRight } from "lucide-react";

interface Props { onNavigate: (page: string) => void; }

export default function AdminHome({ onNavigate }: Props) {
  const stats = [
    { label: "Pastelerías registradas", value: "248", sub: "+12 este mes", Icon: Store, color: "from-pink-400 to-rose-400" },
    { label: "Usuarios totales", value: "4,821", sub: "+89 esta semana", Icon: Users, color: "from-purple-400 to-pink-400" },
    { label: "Suscripciones activas", value: "189", sub: "76% Pro o Premium", Icon: Star, color: "from-amber-400 to-orange-400" },
    { label: "Ingresos mensuales", value: "$42,180", sub: "+18% vs agosto", Icon: DollarSign, color: "from-indigo-400 to-purple-400" },
  ];

  const recent = [
    { name: "Dulcería Rosita", plan: "Pro", status: "active", location: "CDMX", date: "8 Sep" },
    { name: "Pastelería Luna", plan: "Premium", status: "active", location: "Guadalajara", date: "6 Sep" },
    { name: "Sweet Dreams", plan: "Gratuito", status: "suspended", location: "Monterrey", date: "4 Sep" },
    { name: "Cakes & More", plan: "Pro", status: "active", location: "Puebla", date: "3 Sep" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-foreground">Panel BakeFlow</h1>
        <p className="text-muted-foreground mt-1 font-medium">Resumen general de la plataforma — Septiembre 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, Icon, color }) => (
          <div key={label} className="bg-card rounded-3xl card-shadow border border-border p-5">
            <div className={`w-11 h-11 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-3`}>
              <Icon size={20} className="text-white" />
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs font-bold text-foreground mt-0.5">{label}</div>
            <div className="text-xs text-muted-foreground">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { Icon: Store, label: "Pastelerías", page: "bakeries" },
          { Icon: Star, label: "Suscripciones", page: "subscriptions" },
          { Icon: CreditCard, label: "Transacciones", page: "transactions" },
          { Icon: BarChart2, label: "Estadísticas", page: "stats" },
        ].map(({ Icon, label, page }) => (
          <button key={page} onClick={() => onNavigate(page)}
            className="bg-card rounded-3xl border border-border card-shadow p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center">
              <Icon size={20} className="text-pink-400" />
            </div>
            <span className="text-xs font-bold text-foreground">{label}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Pastelerías recientes</h2>
          <button onClick={() => onNavigate("bakeries")} className="flex items-center gap-1 text-sm text-pink-500 font-bold hover:text-pink-600">
            Ver todas <ArrowRight size={14} />
          </button>
        </div>
        <div className="bg-card rounded-3xl card-shadow border border-border overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 bg-muted text-xs font-bold text-muted-foreground">
            <span className="col-span-2">Pastelería</span><span>Plan</span><span>Estado</span><span>Registro</span>
          </div>
          {recent.map((b, i) => (
            <div key={b.name} className={`grid grid-cols-5 gap-4 px-5 py-4 items-center ${i < recent.length - 1 ? "border-b border-border" : ""}`}>
              <div className="col-span-2">
                <div className="font-bold text-sm text-foreground">{b.name}</div>
                <div className="text-xs text-muted-foreground">{b.location}</div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full w-fit ${b.plan === "Premium" ? "bg-amber-50 text-amber-700" : b.plan === "Pro" ? "bg-purple-50 text-purple-700" : "bg-muted text-muted-foreground"}`}>
                {b.plan}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full w-fit ${b.status === "active" ? "badge-ready" : "badge-cancelled"}`}>
                {b.status === "active" ? "Activa" : "Suspendida"}
              </span>
              <span className="text-sm text-muted-foreground">{b.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
