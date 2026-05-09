import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Truck, Headphones, MapPin, Cpu, Zap, Award } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IT Gadget Hub Banepa — Premium Tech Boutique" },
      { name: "description", content: "Banepa's high-end destination for laptops, PC components, mobiles and accessories. Curated, certified, delivered with style." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-muted-foreground">Now serving</span>
              <span className="font-semibold">Banepa & Kathmandu Valley</span>
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter">
              Premium tech, <br />
              <span className="text-gradient">curated for the bold.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Discover handpicked laptops, PC components, mobiles and pro accessories — every piece certified, every detail considered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lime)] transition">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/category/$slug" params={{ slug: "laptops" }} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:border-primary/40">
                Shop Laptops
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "8K+", l: "Happy clients" },
                { v: "120+", l: "Premium SKUs" },
                { v: "4.9★", l: "Store rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl rounded-full" />
            <div className="relative glass-strong rounded-3xl overflow-hidden border-white/10">
              <img src={heroImg} alt="Premium gaming laptop with neon glow" width={1920} height={1080} className="w-full h-auto" />
              <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center"><Zap className="h-4 w-4 text-primary-foreground" /></div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Editor's Pick</div>
                  <div className="text-sm font-semibold">ROG Strix G16 · RTX 4070</div>
                </div>
                <Link to="/product/$slug" params={{ slug: "rog-strix-g16" }} className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground">View</Link>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-4 -right-4 glass-strong rounded-2xl p-3 flex items-center gap-2 hidden sm:flex">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold">100% Genuine</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="border-y border-white/5 py-5 overflow-hidden">
          <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite] gap-12 text-muted-foreground">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-12">
                {["ASUS ROG", "APPLE", "NVIDIA", "AMD", "LOGITECH", "SONY", "SAMSUNG", "LENOVO", "GOOGLE", "KEYCHRON"].map((b) => (
                  <span key={b + k} className="font-display font-bold text-2xl tracking-widest opacity-60 hover:opacity-100 transition">{b}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES BENTO */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Featured Categories</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">Shop by domain.</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 gap-4 md:gap-5 h-auto md:h-[560px]">
          {[
            { ...CATEGORIES[0], cls: "col-span-6 md:col-span-4 row-span-2" },
            { ...CATEGORIES[1], cls: "col-span-6 md:col-span-2 row-span-1" },
            { ...CATEGORIES[2], cls: "col-span-3 md:col-span-1 row-span-1" },
            { ...CATEGORIES[3], cls: "col-span-3 md:col-span-1 row-span-1" },
          ].map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={c.cls}>
              <Link to="/category/$slug" params={{ slug: c.slug }}
                className="group relative h-full min-h-[200px] rounded-3xl overflow-hidden glass block">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <div className="text-xs uppercase tracking-widest text-primary">{c.desc}</div>
                  <div className="mt-2 font-display text-2xl md:text-4xl font-bold">{c.name}</div>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm w-fit">
                    Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-2">New Arrivals</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">Fresh from the hub.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { I: Shield, t: "Authentic Warranty", d: "Manufacturer-backed on every SKU." },
            { I: Truck, t: "Valley Delivery", d: "Free same-day inside Kathmandu Valley." },
            { I: Award, t: "Certified Pre-Sale", d: "Tested by our in-house engineers." },
            { I: Headphones, t: "24/7 Support", d: "WhatsApp us anytime — we reply." },
          ].map(({ I, t, d }) => (
            <div key={t} className="glass rounded-2xl p-5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-3">
                <I className="h-4 w-4 text-primary" />
              </div>
              <div className="font-display font-semibold">{t}</div>
              <div className="text-xs text-muted-foreground mt-1">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-strong rounded-3xl p-8 lg:p-12">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Visit the boutique</div>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">Banepa.<br /><span className="text-gradient">Where tech meets craft.</span></h2>
            <p className="mt-5 text-muted-foreground">Drop by our showroom on Araniko Highway. Hands-on demos, expert consults, espresso on us.</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-primary" /> Araniko Highway, Banepa-05</div>
              <div className="flex items-center gap-3 text-sm"><Cpu className="h-4 w-4 text-primary" /> Open 10am – 7pm daily</div>
            </div>
            <div className="mt-8 glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-accent mb-2">Warranty Checker</div>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input placeholder="Enter serial number" className="flex-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Check</button>
              </form>
              <div className="mt-2 text-[10px] text-muted-foreground">Verifies authenticity & remaining warranty.</div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden glass-strong relative min-h-[420px]">
            <iframe
              title="IT Gadget Hub Banepa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=85.5100%2C27.6250%2C85.5350%2C27.6400&layer=mapnik&marker=27.6326%2C85.5225"
              className="absolute inset-0 w-full h-full grayscale-[0.6] contrast-110 invert hue-rotate-180"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 glass-strong rounded-xl p-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold">IT Gadget Hub · Banepa</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
