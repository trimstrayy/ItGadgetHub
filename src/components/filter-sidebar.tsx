import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

export type Filters = {
  brands: string[];
  priceMax: number;
  ram: string[];
  processor: string[];
  storage: string[];
};

export const DEFAULT_FILTERS: Filters = { brands: [], priceMax: 500000, ram: [], processor: [], storage: [] };

const BRANDS = ["ASUS", "Apple", "NVIDIA", "AMD", "Logitech", "Keychron", "Samsung", "Sony", "Lenovo", "Google"];
const RAMS = ["8GB", "16GB", "32GB", "64GB"];
const PROCS = ["Intel i5", "Intel i7", "Intel i9", "Apple M4", "Ryzen 9", "Snapdragon"];
const STORE = ["256GB", "512GB", "1TB", "2TB"];

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs border transition ${on ? "bg-primary text-primary-foreground border-primary" : "border-white/10 hover:border-white/30"}`}>
      {label}
    </button>
  );
}

function FilterBody({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const tog = (key: keyof Filters, v: string) => {
    const arr = filters[key] as string[];
    set({ ...filters, [key]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] });
  };
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Brand</div>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((b) => <Toggle key={b} label={b} on={filters.brands.includes(b)} onClick={() => tog("brands", b)} />)}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Price up to</span>
          <span className="text-xs font-semibold text-primary">Rs {filters.priceMax.toLocaleString()}</span>
        </div>
        <input type="range" min={10000} max={500000} step={5000} value={filters.priceMax}
          onChange={(e) => set({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-primary" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">RAM</div>
        <div className="flex flex-wrap gap-2">{RAMS.map((b) => <Toggle key={b} label={b} on={filters.ram.includes(b)} onClick={() => tog("ram", b)} />)}</div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Processor</div>
        <div className="flex flex-wrap gap-2">{PROCS.map((b) => <Toggle key={b} label={b} on={filters.processor.includes(b)} onClick={() => tog("processor", b)} />)}</div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Storage</div>
        <div className="flex flex-wrap gap-2">{STORE.map((b) => <Toggle key={b} label={b} on={filters.storage.includes(b)} onClick={() => tog("storage", b)} />)}</div>
      </div>
      <button onClick={() => set(DEFAULT_FILTERS)} className="w-full py-2 rounded-lg glass text-xs hover:border-primary/40">Reset Filters</button>
    </div>
  );
}

export function FilterSidebar({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm">
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </button>
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="glass rounded-2xl p-5 sticky top-24">
          <div className="font-display font-bold mb-4">Filters</div>
          <FilterBody filters={filters} set={set} />
        </div>
      </aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="lg:hidden fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              className="lg:hidden fixed top-0 left-0 z-[81] h-full w-[85%] max-w-sm glass-strong border-r border-white/10 p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="font-display font-bold">Filters</div>
                <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-white/5"><X className="h-4 w-4" /></button>
              </div>
              <FilterBody filters={filters} set={set} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
