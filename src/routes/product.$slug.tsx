import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Shield, Truck, Award, Star, Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react";
import { PRODUCTS, formatNPR, waLink } from "@/data/products";
import { useCart } from "@/lib/cart-store";
import { ProductCard } from "@/components/product-card";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.slug === params.slug);
    return { meta: [{ title: `${p?.name ?? "Product"} — IT Gadget Hub Banepa` }, { name: "description", content: p?.description ?? "" }, { property: "og:image", content: p?.image ?? "" }] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) throw notFound();
  const add = useCart((s) => s.add);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  const specs = [
    p.specs.processor && { I: Cpu, l: "Processor", v: p.specs.processor },
    p.specs.ram && { I: MemoryStick, l: "Memory", v: p.specs.ram },
    p.specs.storage && { I: HardDrive, l: "Storage", v: p.specs.storage },
    p.specs.display && { I: Monitor, l: "Display", v: p.specs.display },
  ].filter(Boolean) as { I: any; l: string; v: string }[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/category/$slug" params={{ slug: p.category }} className="hover:text-foreground capitalize">{p.category}</Link> / <span className="text-foreground">{p.name}</span>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <div className="absolute -inset-10 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full" />
          <div className="relative aspect-square glass-strong rounded-3xl overflow-hidden">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            {p.badge && <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase bg-accent text-accent-foreground">{p.badge}</span>}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="text-xs uppercase tracking-widest text-primary">{p.brand} · {p.subcategory}</div>
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-bold tracking-tight">{p.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="inline-flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" /> {p.rating} <span className="text-muted-foreground">({p.reviews})</span>
            </div>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-accent">{p.inStock ? "In stock" : "Out of stock"}</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-gradient">{formatNPR(p.price)}</span>
            {p.oldPrice && <span className="text-lg text-muted-foreground line-through">{formatNPR(p.oldPrice)}</span>}
          </div>
          <p className="mt-5 text-muted-foreground">{p.description}</p>

          {specs.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {specs.map((s) => (
                <div key={s.l} className="glass rounded-xl p-3 flex gap-3">
                  <s.I className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                    <div className="text-sm font-medium">{s.v}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => { add(p); toast.success("Added to cart"); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-[var(--shadow-glow)] hover:opacity-90">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <a href={waLink(`Hi IT Gadget Hub, I am interested in ${p.name}...`)} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[{ I: Shield, l: "1Y Warranty" }, { I: Truck, l: "Free Delivery" }, { I: Award, l: "Genuine" }].map(({ I, l }) => (
              <div key={l} className="glass rounded-xl p-3 flex items-center gap-2">
                <I className="h-4 w-4 text-primary" /><span className="text-xs">{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((r, i) => <ProductCard key={r.id} product={r} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
