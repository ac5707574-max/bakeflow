import { Cake, Sparkles, Package, User, Clock, ChefHat, CheckCircle2, PartyPopper, ArrowRight, Star, ShoppingCart } from "lucide-react";

interface Props {
  userName: string;
  onNavigate: (page: string) => void;
}

const RECENT_ORDERS = [
  { id: "#1042", name: "Pastel de fresa", status: "progress", date: "10 Sep", total: "$480" },
  { id: "#1038", name: "Pastel personalizado", status: "ready", date: "8 Sep", total: "$650" },
  { id: "#1031", name: "Cupcakes de vainilla", status: "delivered", date: "2 Sep", total: "$240" },
];

const STATUS_MAP: Record<string, { label: string; class: string; Icon: React.ComponentType<{ size?: number }> }> = {
  pending:   { label: "Pendiente",  class: "badge-pending",   Icon: Clock },
  progress:  { label: "En proceso", class: "badge-progress",  Icon: ChefHat },
  ready:     { label: "Listo",      class: "badge-ready",     Icon: CheckCircle2 },
  delivered: { label: "Entregado",  class: "badge-delivered", Icon: PartyPopper },
  cancelled: { label: "Cancelado",  class: "badge-cancelled", Icon: Clock },
};

const FEATURED = [
  { name: "Pastel de fresa", price: "$320", rating: 4.9, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80" },
  { name: "Red Velvet Kawaii", price: "$480", rating: 5.0, img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80" },
  { name: "Cheesecake de maracuyá", price: "$380", rating: 4.8, img: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80" },
];

export default function CustomerHome({ userName, onNavigate }: Props) {
  const first = userName.split(" ")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 space-y-8">

      {/* ── HERO BANNER ─────────────────────────── */}
      <div className="relative bg-gradient-to-br from-pink-500 via-rose-400 to-violet-500 rounded-3xl overflow-hidden p-6 md:p-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-12 w-32 h-32 bg-violet-400/30 rounded-full translate-y-1/3" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-semibold">{greeting},</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-0.5">{first}!</h1>
            <p className="text-white/80 text-sm mt-2 font-medium">¿Qué delicia quieres ordenar hoy?</p>
          </div>
          <button onClick={() => onNavigate("menu")}
            className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl border border-white/30 transition-all text-sm backdrop-blur-sm">
            <ShoppingCart size={16} /> Ver menú
          </button>
        </div>
      </div>

      {/* ── QUICK ACTIONS ───────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { Icon: Cake,     label: "Ver menú",       page: "menu",         from: "from-pink-400",   to: "to-rose-400" },
          { Icon: Sparkles, label: "Pastel especial", page: "custom-order", from: "from-violet-400", to: "to-pink-400" },
          { Icon: Package,  label: "Mis pedidos",     page: "my-orders",    from: "from-indigo-400", to: "to-violet-400" },
          { Icon: User,     label: "Mi perfil",       page: "profile",      from: "from-pink-300",   to: "to-violet-300" },
        ].map(({ Icon, label, page, from, to }) => (
          <button key={page} onClick={() => onNavigate(page)}
            className="bg-card rounded-3xl card-shadow border border-border p-4 md:p-5 flex flex-col items-center gap-3 hover:scale-[1.03] hover:card-shadow-lg transition-all group">
            <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${from} ${to} rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
              <Icon size={22} className="text-white" />
            </div>
            <span className="text-xs md:text-sm font-bold text-foreground text-center leading-tight">{label}</span>
          </button>
        ))}
      </div>

      {/* ── FEATURED CAKES ──────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Más populares</h2>
          <button onClick={() => onNavigate("menu")} className="flex items-center gap-1 text-sm text-pink-500 font-bold hover:text-pink-600 transition-colors">
            Ver todos <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURED.map((cake) => (
            <div key={cake.name} className="bg-card rounded-3xl card-shadow border border-border overflow-hidden hover:scale-[1.02] transition-transform group">
              <div className="h-36 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-100">
                <img src={cake.img} alt={cake.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="p-4">
                <div className="font-bold text-sm text-foreground mb-1">{cake.name}</div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className={i < Math.floor(cake.rating) ? "text-amber-400 fill-amber-400" : "text-border fill-border"} />
                  ))}
                  <span className="text-xs text-muted-foreground font-medium ml-1">{cake.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-semibold text-pink-500">{cake.price}</span>
                  <button onClick={() => onNavigate("menu")}
                    className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1">
                    <ShoppingCart size={11} /> Ordenar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT ORDERS ───────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Pedidos recientes</h2>
          <button onClick={() => onNavigate("my-orders")} className="flex items-center gap-1 text-sm text-pink-500 font-bold hover:text-pink-600 transition-colors">
            Ver todos <ArrowRight size={14} />
          </button>
        </div>
        <div className="bg-card rounded-3xl card-shadow border border-border overflow-hidden">
          <div className="grid grid-cols-4 gap-3 px-5 py-3 bg-muted text-xs font-bold text-muted-foreground">
            <span>ID</span><span className="col-span-1">Producto</span><span>Fecha</span><span>Estado / Total</span>
          </div>
          {RECENT_ORDERS.map((order, i) => {
            const s = STATUS_MAP[order.status];
            const StatusIcon = s.Icon;
            return (
              <div key={order.id} className={`grid grid-cols-4 gap-3 px-5 py-4 items-center ${i < RECENT_ORDERS.length - 1 ? "border-b border-border" : ""}`}>
                <span className="font-bold text-sm text-pink-500">{order.id}</span>
                <div className="col-span-1 min-w-0">
                  <div className="font-bold text-sm text-foreground truncate">{order.name}</div>
                </div>
                <span className="text-sm text-muted-foreground">{order.date}</span>
                <div className="flex flex-col gap-1">
                  <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border w-fit ${s.class}`}>
                    <StatusIcon size={9} /> {s.label}
                  </span>
                  <span className="font-display font-semibold text-sm text-foreground">{order.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
