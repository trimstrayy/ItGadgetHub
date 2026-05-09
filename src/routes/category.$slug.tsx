import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = CATEGORIES.find((x) => x.slug === params.slug);
    return { meta: [{ title: `${c?.name ?? "Category"} — IT Gadget Hub Banepa` }, { name: "description", content: c?.desc ?? "" }] };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) throw notFound();
  const items = PRODUCTS.filter((p) => p.category === slug);
  return (
    <div>
      <div className="relative overflow-hidden">
        <img src={cat.image} alt={cat.name} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <Link to="/shop" className="text-xs text-muted-foreground hover:text-primary">← All categories</Link>
          <div className="mt-3 text-xs uppercase tracking-[0.3em] text-primary">{cat.desc}</div>
          <h1 className="mt-2 font-display text-5xl md:text-7xl font-bold tracking-tighter">{cat.name}</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {cat.sub.map((s) => <span key={s} className="px-3 py-1.5 rounded-full glass text-xs">{s}</span>)}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
