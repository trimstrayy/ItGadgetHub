import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, MessageCircle, Eye, Star } from "lucide-react";
import { type Product, formatNPR, waLink } from "@/data/products";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -6 }}
      className="group relative glass rounded-2xl overflow-hidden flex flex-col"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-card">
        <motion.img
          src={product.image} alt={product.name} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground">
            {product.badge}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold bg-destructive text-destructive-foreground">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
          <button
            onClick={(e) => { e.preventDefault(); add(product); toast.success("Added to cart"); }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold backdrop-blur"
          ><ShoppingBag className="h-3.5 w-3.5" /> Add</button>
          <a
            href={waLink(`Hi IT Gadget Hub, I am interested in ${product.name}...`)} target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="h-9 w-9 grid place-items-center rounded-lg bg-[#25D366] text-white"
          ><MessageCircle className="h-4 w-4" /></a>
          <span className="h-9 w-9 grid place-items-center rounded-lg glass-strong"><Eye className="h-4 w-4" /></span>
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.brand}</span>
          <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{product.rating}</span>
        </div>
        <Link to="/product/$slug" params={{ slug: product.slug }} className="mt-1 font-medium text-sm line-clamp-2 hover:text-primary transition">
          {product.name}
        </Link>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-gradient">{formatNPR(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatNPR(product.oldPrice)}</span>}
        </div>
      </div>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 skeleton rounded" />
        <div className="h-4 w-3/4 skeleton rounded" />
        <div className="h-5 w-1/2 skeleton rounded" />
      </div>
    </div>
  );
}
