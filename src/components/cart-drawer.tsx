import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { formatNPR } from "@/data/products";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();
  const navigate = useNavigate();
  const sub = subtotal();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close} className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 z-[81] h-full w-full sm:w-[440px] glass-strong border-l border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div>
                <div className="font-display text-lg font-bold">Your Cart</div>
                <div className="text-xs text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</div>
              </div>
              <button onClick={close} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-white/5"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-20">
                  <div className="h-16 w-16 rounded-2xl glass grid place-items-center"><ShoppingBag className="h-6 w-6 text-muted-foreground" /></div>
                  <div className="font-display">Your cart is empty</div>
                  <p className="text-sm text-muted-foreground">Discover our handpicked premium gadgets.</p>
                  <Link to="/shop" onClick={close} className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Browse Shop</Link>
                </div>
              )}
              {items.map((i) => (
                <motion.div key={i.product.id} layout className="glass rounded-xl p-3 flex gap-3">
                  <img src={i.product.image} alt={i.product.name} className="h-20 w-20 rounded-lg object-cover bg-muted" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground">{i.product.brand}</div>
                    <div className="text-sm font-medium line-clamp-2">{i.product.name}</div>
                    <div className="mt-1 text-sm text-primary font-semibold">{formatNPR(i.product.price)}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center glass rounded-lg">
                        <button onClick={() => setQty(i.product.id, i.qty - 1)} className="h-7 w-7 grid place-items-center"><Minus className="h-3 w-3" /></button>
                        <span className="text-xs w-6 text-center">{i.qty}</span>
                        <button onClick={() => setQty(i.product.id, i.qty + 1)} className="h-7 w-7 grid place-items-center"><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { navigate({ to: "/checkout", search: `?single=${i.product.id}&qty=${i.qty}` }); close(); }} className="text-xs px-3 py-1 rounded-lg bg-primary text-primary-foreground">Checkout</button>
                        <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="p-5 border-t border-white/5 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatNPR(sub)}</span></div>
                <div className="flex justify-between text-xs text-muted-foreground"><span>Shipping</span><span>Calculated at checkout</span></div>
                <Link to="/checkout" onClick={close} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition">
                  Checkout All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
