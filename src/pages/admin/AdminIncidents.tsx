import { useState } from "react";
import { AlertTriangle, ShieldAlert, MessageSquare, CheckCircle2, Search } from "lucide-react";

const INCIDENTS = [
  { id: "INC-001", type: "report", title: "Pastelería no entregó pedido", reporter: "Luna García", bakery: "Sweet Dreams", status: "open", date: "9 Sep", desc: "El cliente reporta que su pedido #1031 nunca fue entregado a pesar de haber pagado." },
  { id: "INC-002", type: "fraud", title: "Posible fraude en pagos", reporter: "Sistema", bakery: "Boulangerie MX", status: "investigating", date: "7 Sep", desc: "Se detectaron múltiples transacciones sospechosas en un periodo de 2 horas." },
  { id: "INC-003", type: "complaint", title: "Empleado con acceso no autorizado", reporter: "Dulcería Rosita", bakery: "Dulcería Rosita", status: "resolved", date: "5 Sep", desc: "Un exempleado seguía teniendo acceso al panel de la pastelería tras ser dado de baja." },
  { id: "INC-004", type: "report", title: "Producto fuera del menú cobrado", reporter: "Carlos Mendoza", bakery: "Cakes & More", status: "open", date: "3 Sep", desc: "El cliente fue cobrado por un producto que no aparecía en el menú oficial." },
];

const TYPE_META: Record<string, { label: string; class: string; Icon: React.ComponentType<{ size?: number }> }> = {
  report: { label: "Reporte", class: "bg-amber-50 text-amber-700", Icon: AlertTriangle },
  fraud: { label: "Fraude", class: "bg-red-50 text-red-700", Icon: ShieldAlert },
  complaint: { label: "Queja", class: "bg-orange-50 text-orange-700", Icon: MessageSquare },
};

const STATUS_MAP: Record<string, { label: string; class: string }> = {
  open: { label: "Abierta", class: "badge-pending" },
  investigating: { label: "Investigando", class: "badge-progress" },
  resolved: { label: "Resuelta", class: "badge-ready" },
};

export default function AdminIncidents() {
  const [incidents, setIncidents] = useState(INCIDENTS);
  const [selected, setSelected] = useState(INCIDENTS[0].id);
  const sel = incidents.find((i) => i.id === selected)!;
  const SelTypeIcon = TYPE_META[sel.type].Icon;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-foreground flex items-center gap-3">
          <AlertTriangle size={28} className="text-pink-400" /> Incidencias
        </h1>
        <p className="text-muted-foreground text-sm mt-1 font-medium">{incidents.filter((i) => i.status === "open").length} abiertas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {incidents.map((inc) => {
            const meta = TYPE_META[inc.type];
            return (
              <button key={inc.id} onClick={() => setSelected(inc.id)}
                className={`w-full text-left p-4 rounded-3xl border-2 transition-all ${selected === inc.id ? "border-rose-400 bg-rose-50" : "border-border bg-card hover:border-rose-200 card-shadow"}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${meta.class}`}>
                    <meta.Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-rose-500">{inc.id}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_MAP[inc.status].class}`}>{STATUS_MAP[inc.status].label}</span>
                    </div>
                    <div className="font-semibold text-sm text-foreground">{inc.title}</div>
                    <div className="text-xs text-muted-foreground">{inc.bakery} · {inc.date}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 bg-card rounded-3xl card-shadow border border-border p-6 h-fit">
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-border">
            <div>
                  <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold text-foreground">{sel.title}</h2>
                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${TYPE_META[sel.type].class}`}>
                  <SelTypeIcon size={10} /> {TYPE_META[sel.type].label}
                </span>
              </div>
              <div className="text-sm text-muted-foreground font-medium">{sel.id} · {sel.date}</div>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_MAP[sel.status].class}`}>{STATUS_MAP[sel.status].label}</span>
          </div>

          <div className="space-y-3 mb-5">
            {[
              { label: "Reportado por", value: sel.reporter },
              { label: "Pastelería involucrada", value: sel.bakery },
            ].map((f) => (
              <div key={f.label} className="bg-muted rounded-2xl p-3">
                <div className="text-xs text-muted-foreground font-semibold">{f.label}</div>
                <div className="font-bold text-sm text-foreground mt-0.5">{f.value}</div>
              </div>
            ))}
            <div className="bg-muted rounded-2xl p-3">
              <div className="text-xs text-muted-foreground font-semibold mb-1">Descripción</div>
              <div className="text-sm font-medium text-foreground leading-relaxed">{sel.desc}</div>
            </div>
          </div>

          {sel.status !== "resolved" && (
            <div className="flex gap-3">
              {sel.status === "open" && (
                <button onClick={() => setIncidents((prev) => prev.map((i) => i.id === sel.id ? { ...i, status: "investigating" } : i))}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 border border-blue-200 font-bold rounded-2xl text-sm hover:bg-blue-100 transition-colors">
                  <Search size={14} /> Investigar
                </button>
              )}
              <button onClick={() => setIncidents((prev) => prev.map((i) => i.id === sel.id ? { ...i, status: "resolved" } : i))}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-50 text-green-600 border border-green-200 font-bold rounded-2xl text-sm hover:bg-green-100 transition-colors">
                <CheckCircle2 size={14} /> Resolver
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
