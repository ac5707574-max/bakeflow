import { Star, TrendingUp, DollarSign, CreditCard } from "lucide-react";

const TRANSACTIONS = [
  { id: "TXN-001", bakery: "Pastelería Luna", type: "subscription", desc: "Plan Premium - Sep 2026", amount: 299, date: "1 Sep" },
  { id: "TXN-002", bakery: "Dulcería Rosita", type: "subscription", desc: "Plan Pro - Sep 2026", amount: 199, date: "1 Sep" },
  { id: "TXN-003", bakery: "Pastel Kawaii", type: "commission", desc: "Comisión 5% · Ventas $2,800", amount: 140, date: "3 Sep" },
  { id: "TXN-004", bakery: "Cakes & More", type: "subscription", desc: "Plan Pro - Sep 2026", amount: 199, date: "1 Sep" },
  { id: "TXN-005", bakery: "Pastelería Luna", type: "commission", desc: "Comisión 5% · Ventas $4,100", amount: 205, date: "5 Sep" },
  { id: "TXN-006", bakery: "Pastel Kawaii", type: "subscription", desc: "Renovación Premium", amount: 299, date: "15 Sep" },
];

export default function AdminTransactions() {
  const total = TRANSACTIONS.reduce((s, t) => s + t.amount, 0);
  const subs = TRANSACTIONS.filter((t) => t.type === "subscription").reduce((s, t) => s + t.amount, 0);
  const commissions = TRANSACTIONS.filter((t) => t.type === "commission").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-foreground flex items-center gap-3">
          <CreditCard size={28} className="text-pink-400" /> Transacciones
        </h1>
        <p className="text-muted-foreground text-sm mt-1 font-medium">Movimientos registrados en la plataforma</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total recaudado", value: `$${total.toLocaleString()}`, Icon: DollarSign, color: "from-pink-400 to-rose-400" },
          { label: "Suscripciones", value: `$${subs.toLocaleString()}`, Icon: Star, color: "from-purple-400 to-pink-400" },
          { label: "Comisiones", value: `$${commissions.toLocaleString()}`, Icon: TrendingUp, color: "from-amber-400 to-orange-400" },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="bg-card rounded-3xl card-shadow border border-border p-5">
            <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-2`}>
              <Icon size={18} className="text-white" />
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-3xl card-shadow border border-border overflow-hidden">
        <div className="grid grid-cols-6 gap-3 px-5 py-3 bg-muted text-xs font-bold text-muted-foreground">
          <span>ID</span><span className="col-span-2">Pastelería / Descripción</span><span>Tipo</span><span>Fecha</span><span>Monto</span>
        </div>
        <div className="divide-y divide-border">
          {TRANSACTIONS.map((t) => (
            <div key={t.id} className="grid grid-cols-6 gap-3 px-5 py-4 items-center">
              <span className="text-xs font-bold text-muted-foreground">{t.id}</span>
              <div className="col-span-2">
                <div className="font-bold text-sm text-foreground">{t.bakery}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full w-fit ${t.type === "subscription" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700"}`}>
                {t.type === "subscription" ? <><Star size={9} /> Suscripción</> : <><TrendingUp size={9} /> Comisión</>}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{t.date}</span>
              <span className="font-display font-semibold text-green-600">+${t.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
