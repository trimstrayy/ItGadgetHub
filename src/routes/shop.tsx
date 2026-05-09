import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { FilterSidebar, DEFAULT_FILTERS, type Filters } from "@/components/filter-sidebar";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop — IT Gadget Hub Banepa" }, { name: "description", content: "Browse our complete catalog of premium laptops, PC components, mobiles and accessories." }] }),
  component: ShopPage,
});

function ShopPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let r = PRODUCTS.filter((p) => {
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
  }, [filters, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Catalog</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">All Products</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} curated items</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <FilterSidebar filters={filters} set={setFilters} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 gap-3">
            <FilterSidebar filters={filters} set={setFilters} />
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="ml-auto bg-transparent glass rounded-lg px-3 py-2 text-sm focus:outline-none">
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
