import { useEffect, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, ChevronDown, Cpu, Laptop, Headphones, Smartphone, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const catIcons: Record<string, any> = { laptops: Laptop, components: Cpu, accessories: Headphones, mobile: Smartphone };

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, open } = useCart();
  const c = count();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [path]);

  return (
    <header className={cn("sticky top-0 z-50 transition-all", scrolled ? "py-2" : "py-3")}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={cn("glass-strong rounded-2xl flex items-center gap-2 px-4 py-2.5 transition-all", scrolled && "shadow-[var(--shadow-elev)]")}>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="font-display text-sm font-bold tracking-tight">IT GADGET HUB</div>
              <div className="text-[10px] text-muted-foreground tracking-[0.2em]">BANEPA · NEPAL</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-6">
            <Link to="/" className={cn("px-3 py-2 rounded-lg text-sm hover:bg-white/5", path === "/" && "text-primary")}>Home</Link>
            <button
              onMouseEnter={() => setMegaOpen(true)}
              onClick={() => setMegaOpen((o) => !o)}
              className={cn("px-3 py-2 rounded-lg text-sm hover:bg-white/5 inline-flex items-center gap-1", megaOpen && "bg-white/5")}
            >
              Categories <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <Link to="/shop" className={cn("px-3 py-2 rounded-lg text-sm hover:bg-white/5", path === "/shop" && "text-primary")}>Shop</Link>
            <Link to="/about" className={cn("px-3 py-2 rounded-lg text-sm hover:bg-white/5", path === "/about" && "text-primary")}>About</Link>
            <Link to="/contact" className={cn("px-3 py-2 rounded-lg text-sm hover:bg-white/5", path === "/contact" && "text-primary")}>Contact</Link>
          </nav>

          <div className="flex-1" />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/shop", search: { q: query } as any });
            }}
            className="hidden md:flex items-center gap-2 glass rounded-xl px-3 py-2 text-sm w-64 focus-within:border-foreground/40 transition"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gadgets…"
              className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground text-foreground"
              aria-label="Search products"
            />
          </form>

          <button onClick={open} className="relative h-10 w-10 grid place-items-center glass rounded-xl hover:border-primary/50 transition" aria-label="Cart">
            <ShoppingBag className="h-4 w-4" />
            <AnimatePresence>
              {c > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold grid place-items-center"
                >{c}</motion.span>
              )}
            </AnimatePresence>
          </button>

          <button onClick={() => setMobileOpen(true)} className="lg:hidden h-10 w-10 grid place-items-center glass rounded-xl" aria-label="Menu">
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              onMouseLeave={() => setMegaOpen(false)}
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-[min(960px,calc(100vw-2rem))] glass-strong rounded-2xl p-6 shadow-[var(--shadow-elev)]"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map((c) => {
                  const Icon = catIcons[c.slug];
                  return (
                    <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group rounded-xl p-4 hover:bg-white/5 transition">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-display font-semibold group-hover:text-primary">{c.name}</div>
                      </div>
                      <ul className="space-y-1.5">
                        {c.sub.map((s) => (
                          <li key={s} className="text-xs text-muted-foreground hover:text-foreground">· {s}</li>
                        ))}
                      </ul>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl"
          >
            <div className="p-6 flex items-center justify-between">
              <span className="font-display font-bold">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="h-10 w-10 glass rounded-xl grid place-items-center"><X className="h-4 w-4" /></button>
            </div>
            <nav className="px-6 flex flex-col gap-1">
              {[{ to: "/", l: "Home" }, { to: "/shop", l: "Shop" }, { to: "/about", l: "About" }, { to: "/contact", l: "Contact" }].map((i) => (
                <Link key={i.to} to={i.to} className="py-3 text-2xl font-display font-semibold border-b border-white/5">{i.l}</Link>
              ))}
              <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Categories</div>
              {CATEGORIES.map((c) => (
                <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="py-3 text-lg border-b border-white/5">{c.name}</Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
