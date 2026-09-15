import { useState } from "react";
import { Clock, ChefHat, CheckCircle2, PartyPopper, XCircle, Cake, Phone, User } from "lucide-react";

const EMPLOYEES = ["Sin asignar", "Sofía López", "Mia Ramírez", "Daniela Cruz", "Karen Vega"];

const INITIAL_ORDERS = [
  { id: "#1045", client: "Valentina Ruiz", cake: "Pastel de bodas", date: "15 Sep", status: "pending", employee: "Sin asignar", total: "$1,200", phone: "+52 55 9876 5432" },
  { id: "#1043", client: "Carlos Mendoza", cake: "Pastel de cumpleaños", date: "12 Sep", status: "progress", employee: "Sofía López", total: "$480", phone: "+52 55 1111 2222" },
  { id: "#1044", client: "Andrea Torres", cake: "Cupcakes x24", date: "11 Sep", status: "progress", employee: "Mia Ramírez", total: "$380", phone: "+52 55 3333 4444" },
  { id: "#1042", client: "Luna García", cake: "Pastel de fresa", date: "10 Sep", status: "ready", employee: "Daniela Cruz", total: "$480", phone: "+52 55 5555 6666" },
  { id: "#1038", client: "Paola Jiménez", cake: "Red Velvet", date: "8 Sep", status: "delivered", employee: "Karen Vega", total: "$520", phone: "+52 55 7777 8888" },
];

const STATUS_MAP: Record<string, { label: string; class: string; Icon: React.ComponentType<{ size?: number }> }> = {
  pending: { label: "Pendiente", class: "badge-pending", Icon: Clock },
  progress: { label: "En proceso", class: "badge-progress", Icon: ChefHat },
  ready: { label: "Listo", class: "badge-ready", Icon: CheckCircle2 },
  delivered: { label: "Entregado", class: "badge-delivered", Icon: PartyPopper },
  cancelled: { label: "Cancelado", class: "badge-cancelled", Icon: XCircle },
};

export default function OrdersManagement() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selected, setSelected] = useState<string | null>("#1045");
  const selectedOrder = orders.find((o) => o.id === selected);

  function changeStatus(id: string, status: string) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  }
  function assignEmployee(id: string, employee: string) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, employee } : o));
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-foreground">Pedidos</h1>
        <p className="text-muted-foreground text-sm mt-1 font-medium">Administra y asigna todos los pedidos de tu pastelería</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-2">
          {orders.map((o) => {
            const s = STATUS_MAP[o.status];
            return (
              <button key={o.id} onClick={() => setSelected(o.id)}
                className={`w-full text-left p-4 rounded-3xl border-2 transition-all ${selected === o.id ? "border-pink-400 bg-pink-50" : "border-border bg-card hover:border-pink-200 card-shadow"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Cake size={18} className="text-pink-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-pink-500">{o.id}</span>
                      <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${s.class}`}>
                        <s.Icon size={10} /> {s.label}
                      </span>
                    </div>
                    <div className="font-semibold text-sm text-foreground truncate">{o.cake}</div>
                    <div className="text-xs text-muted-foreground">{o.client} · {o.date}</div>
                  </div>
                  <div className="font-display font-semibold text-sm text-foreground shrink-0">{o.total}</div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedOrder && (
          <div className="lg:col-span-3 bg-card rounded-3xl card-shadow border border-border p-6 h-fit">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <Cake size={28} className="text-pink-400" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">{selectedOrder.cake}</h2>
                <div className="text-sm text-muted-foreground font-medium">{selectedOrder.id}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground mb-2">
                  <User size={12} /> Información del cliente
                </div>
                <div className="font-bold text-foreground">{selectedOrder.client}</div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                  <Phone size={12} className="text-pink-400" /> {selectedOrder.phone}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-2">Estado del pedido</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(STATUS_MAP).map(([key, val]) => (
                    <button key={key} onClick={() => changeStatus(selectedOrder.id, key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedOrder.status === key ? "border-pink-400 bg-pink-50 text-pink-600" : "border-border text-muted-foreground hover:border-pink-200"
                      }`}>
                      <val.Icon size={12} /> {val.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-2">Asignar empleado</label>
                <select value={selectedOrder.employee} onChange={(e) => assignEmployee(selectedOrder.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-muted focus:outline-none focus:border-pink-400 text-sm font-medium">
                  {EMPLOYEES.map((emp) => <option key={emp}>{emp}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-2xl p-3">
                  <div className="text-xs text-muted-foreground font-semibold">Fecha</div>
                  <div className="font-bold text-sm text-foreground">{selectedOrder.date}</div>
                </div>
                <div className="bg-muted rounded-2xl p-3">
                  <div className="text-xs text-muted-foreground font-semibold">Total</div>
                  <div className="font-display font-semibold text-pink-500">{selectedOrder.total}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
