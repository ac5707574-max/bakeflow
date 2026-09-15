import { useState } from "react";
import { Search, Store, Mail, MapPin, X, Trash2, Play, Pause } from "lucide-react";

const BAKERIES = [
  { id: 1, name: "Dulcería Rosita", owner: "Rosa Martínez", email: "dulceria@rosita.com", location: "CDMX", plan: "Pro", status: "active", orders: 34, date: "8 Sep 2026" },
  { id: 2, name: "Pastelería Luna", owner: "Valentina Ríos", email: "luna@pasteles.com", location: "Guadalajara", plan: "Premium", status: "active", orders: 67, date: "6 Sep 2026" },
  { id: 3, name: "Sweet Dreams", owner: "Karen Torres", email: "karen@sweet.com", location: "Monterrey", plan: "Gratuito", status: "suspended", orders: 8, date: "4 Sep 2026" },
  { id: 4, name: "Cakes & More", owner: "Patricia Vega", email: "patricia@cakes.com", location: "Puebla", plan: "Pro", status: "active", orders: 22, date: "3 Sep 2026" },
  { id: 5, name: "Pastel Kawaii", owner: "Mia Flores", email: "mia@kawaii.com", location: "Tijuana", plan: "Premium", status: "active", orders: 51, date: "1 Sep 2026" },
];

export default function AdminBakeries() {
  const [bakeries, setBakeries] = useState(BAKERIES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<typeof BAKERIES[0] | null>(null);

  const filtered = bakeries.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.owner.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter || b.plan.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  function toggleStatus(id: number) {
    setBakeries((prev) => prev.map((b) => b.id === id ? { ...b, status: b.status === "active" ? "suspended" : "active" } : b));
    setSelected((prev) => prev ? { ...prev, status: prev.status === "active" ? "suspended" : "active" } : null);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-foreground flex items-center gap-3">
          <Store size={28} className="text-pink-400" /> Pastelerías
        </h1>
        <p className="text-muted-foreground text-sm mt-1 font-medium">{bakeries.length} empresas registradas</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-48 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar pastelería..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-border bg-card focus:outline-none focus:border-pink-400 text-sm font-medium" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[["all", "Todas"], ["active", "Activas"], ["suspended", "Suspendidas"], ["pro", "Pro"], ["premium", "Premium"]].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all ${filter === val ? "bg-pink-500 text-white" : "bg-card border border-border text-muted-foreground hover:border-pink-200"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-card rounded-3xl card-shadow border border-border overflow-hidden">
          <div className="grid grid-cols-5 gap-3 px-5 py-3 bg-muted text-xs font-bold text-muted-foreground">
            <span className="col-span-2">Pastelería</span><span>Plan</span><span>Estado</span><span>Pedidos</span>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((b) => (
              <button key={b.id} onClick={() => setSelected(b)}
                className={`w-full grid grid-cols-5 gap-3 px-5 py-4 items-center text-left transition-all ${selected?.id === b.id ? "bg-pink-50" : "hover:bg-muted"}`}>
                <div className="col-span-2">
                  <div className="font-bold text-sm text-foreground">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.owner}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit ${b.plan === "Premium" ? "bg-amber-50 text-amber-700" : b.plan === "Pro" ? "bg-purple-50 text-purple-700" : "bg-muted text-muted-foreground"}`}>
                  {b.plan}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit ${b.status === "active" ? "badge-ready" : "badge-cancelled"}`}>
                  {b.status === "active" ? "Activa" : "Suspendida"}
                </span>
                <span className="text-sm font-semibold text-foreground">{b.orders}</span>
              </button>
            ))}
          </div>
        </div>

        {selected ? (
          <div className="lg:col-span-2 bg-card rounded-3xl card-shadow border border-border p-5 h-fit">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">{selected.name}</h2>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                  <MapPin size={12} className="text-pink-400" /> {selected.location}
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="w-7 h-7 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                <X size={14} />
              </button>
            </div>
            <div className="space-y-2 mb-5">
              {[
                { label: "Propietaria", value: selected.owner },
                { label: "Email", value: selected.email },
                { label: "Plan", value: selected.plan },
                { label: "Pedidos totales", value: String(selected.orders) },
                { label: "Registro", value: selected.date },
              ].map((f) => (
                <div key={f.label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-xs font-bold text-muted-foreground">{f.label}</span>
                  <span className="text-xs font-semibold text-foreground">{f.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button onClick={() => toggleStatus(selected.id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  selected.status === "active"
                    ? "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                    : "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                }`}>
                {selected.status === "active" ? <><Pause size={14} /> Suspender</> : <><Play size={14} /> Reactivar</>}
              </button>
              <button onClick={() => { setBakeries((prev) => prev.filter((b) => b.id !== selected.id)); setSelected(null); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-bold bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-all">
                <Trash2 size={14} /> Eliminar cuenta
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-card rounded-3xl card-shadow border border-dashed border-border p-5 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Store size={32} className="mx-auto mb-2 text-pink-200" />
              <div className="text-sm font-medium">Selecciona una pastelería</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
