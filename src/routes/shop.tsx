import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { FilterSidebar, DEFAULT_FILTERS, type Filters } from "@/components/filter-sidebar";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({ meta: [{ title: "Shop — IT Gadget Hub Banepa" }, { name: "description", content: "Browse our complete catalog of premium laptops, PC components, mobiles and accessories." }] }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let r = PRODUCTS.filter((p) => {
      if (term) {
        const hay = `${p.name} ${p.brand} ${p.category} ${p.subcategory} ${p.description}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (p.price > filters.priceMax) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.ram.length && !filters.ram.some((r) => p.specs.ram?.includes(r))) return false;
      if (filters.processor.length && !filters.processor.some((r) => p.specs.processor?.includes(r.replace("Intel ", "").replace("Ryzen 9", "Ryzen 9")))) return false;
      if (filters.storage.length && !filters.storage.some((r) => p.specs.storage?.includes(r))) return false;
      return true;
    });
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [filters, sort, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Catalog</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">All Products</h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} curated items{q ? <> matching “<span className="text-foreground">{q}</span>”</> : null}
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); }}
          className="mt-5 glass rounded-xl flex items-center gap-2 px-3 py-2 max-w-xl"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => navigate({ search: { q: e.target.value } })}
            placeholder="Search by name, brand, category…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            aria-label="Search products"
          />
          {q && (
            <button type="button" onClick={() => navigate({ search: { q: "" } })} className="p-1 rounded-md hover:bg-white/5" aria-label="Clear">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </form>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <FilterSidebar filters={filters} set={setFilters} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 gap-3">
            <ActiveFilterChips filters={filters} set={setFilters} />
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="ml-auto shrink-0 bg-transparent glass rounded-lg px-3 py-2 text-sm focus:outline-none">
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActiveFilterChips({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const chips: { key: keyof Filters; label: string; onRemove: () => void }[] = [];
  (["brands", "ram", "processor", "storage"] as const).forEach((k) => {
    (filters[k] as string[]).forEach((v) => {
      chips.push({
        key: k,
        label: v,
        onRemove: () =>
          set({ ...filters, [k]: (filters[k] as string[]).filter((x) => x !== v) }),
      });
    });
  });
  if (filters.priceMax < 500000) {
    chips.push({
      key: "priceMax",
      label: `≤ Rs ${filters.priceMax.toLocaleString()}`,
      onRemove: () => set({ ...filters, priceMax: 500000 }),
    });
  }
  return (
    <div className="flex flex-wrap items-center gap-2 min-h-9 flex-1">
      <AnimatePresence initial={false}>
        {chips.map((c) => (
          <motion.button
            key={`${c.key}-${c.label}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            onClick={c.onRemove}
            className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition"
          >
            {c.label}
            <X className="h-3 w-3 opacity-70 group-hover:opacity-100" />
          </motion.button>
        ))}
        {chips.length > 0 && (
          <motion.button
            key="clear-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => set(DEFAULT_FILTERS)}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
          >
            Clear all
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
