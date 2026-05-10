import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, ShoppingBag, MapPin, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { PRODUCTS, formatNPR } from "@/data/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — IT Gadget Hub Banepa" }] }),
  component: CheckoutPage,
});

const STEPS = [
  { k: "shipping", l: "Shipping", I: MapPin },
  { k: "payment", l: "Payment", I: CreditCard },
  { k: "review", l: "Review", I: ShieldCheck },
];

function CheckoutPage() {
  const { items, subtotal, clear, remove } = useCart();
  const [step, setStep] = useState(0);
  const [singleMode, setSingleMode] = useState(false);
  const [singleItem, setSingleItem] = useState<{ product: any; qty: number } | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "Kathmandu", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    if (p.has("single")) {
      const id = p.get("single")!;
      const qty = Number(p.get("qty") || "1");
      const prod = PRODUCTS.find((x) => x.id === id || x.slug === id);
      if (prod) {
        setSingleMode(true);
        setSingleItem({ product: prod, qty: isNaN(qty) ? 1 : Math.max(1, qty) });
      }
    }
  }, []);
  const sub = singleMode && singleItem ? singleItem.product.price * singleItem.qty : subtotal();
  const shipping = sub > 50000 ? 0 : 500;
  const total = sub + shipping;

  if (items.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <div className="h-16 w-16 mx-auto rounded-2xl glass grid place-items-center mb-4"><ShoppingBag className="h-6 w-6 text-muted-foreground" /></div>
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add a few premium gadgets and come back.</p>
        <Link to="/shop" className="inline-flex mt-6 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">Browse Shop</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center shadow-[var(--shadow-glow)]">
          <Check className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <h1 className="mt-6 font-display text-4xl font-bold">Order placed!</h1>
        <p className="mt-3 text-muted-foreground">We'll WhatsApp you a confirmation shortly. Thanks for trusting IT Gadget Hub.</p>
        <Link to="/" className="inline-flex mt-8 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Stepper */}
          <div className="glass-strong rounded-2xl p-4 flex gap-2">
            {STEPS.map((s, i) => (
              <div key={s.k} className={`flex-1 flex items-center gap-3 p-3 rounded-xl ${i === step ? "bg-primary/10" : ""}`}>
                <div className={`h-8 w-8 grid place-items-center rounded-lg ${i <= step ? "bg-primary text-primary-foreground" : "glass"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : <s.I className="h-4 w-4" />}
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground">Step {i + 1}</div>
                  <div className="text-sm font-semibold">{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-strong rounded-2xl p-6 mt-4">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="ship" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="font-display text-xl font-bold">Shipping address</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Full name" value={form.name} onChange={(v) => { setForm((s) => ({ ...s, name: v })); setErrors((p) => { const n = { ...p }; delete n.name; return n; }); }} error={errors.name} />
                    <Field label="Phone" value={form.phone} onChange={(v) => { setForm((s) => ({ ...s, phone: v })); setErrors((p) => { const n = { ...p }; delete n.phone; return n; }); }} error={errors.phone} inputProps={{ inputMode: "numeric", maxLength: 10 }} />
                    <Field label="Email" type="email" value={form.email} onChange={(v) => { setForm((s) => ({ ...s, email: v })); setErrors((p) => { const n = { ...p }; delete n.email; return n; }); }} error={errors.email} />
                    <Field label="City" defaultValue="Kathmandu" value={form.city} onChange={(v) => { setForm((s) => ({ ...s, city: v })); setErrors((p) => { const n = { ...p }; delete n.city; return n; }); }} />
                    <Field label="Address" full value={form.address} onChange={(v) => { setForm((s) => ({ ...s, address: v })); setErrors((p) => { const n = { ...p }; delete n.address; return n; }); }} error={errors.address} />
                    <Field label="Notes (optional)" full value={form.notes} onChange={(v) => { setForm((s) => ({ ...s, notes: v })); setErrors((p) => { const n = { ...p }; delete n.notes; return n; }); }} />
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="font-display text-xl font-bold">Payment method</h2>
                  {["Cash on Delivery", "eSewa", "Khalti", "FonePay / Bank Transfer"].map((m, i) => (
                    <label key={m} className="glass rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-primary/40">
                      <input type="radio" name="pay" defaultChecked={i === 0} className="accent-primary" />
                      <span className="font-medium">{m}</span>
                    </label>
                  ))}
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="rev" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <h2 className="font-display text-xl font-bold">Review your order</h2>
                  {(singleMode && singleItem ? [singleItem] : items).map((i) => (
                    <div key={i.product.id} className="flex gap-3 glass rounded-xl p-3 items-center">
                      <img src={i.product.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{i.product.name}</div>
                        <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
                      </div>
                      <div className="font-semibold">{formatNPR(i.product.price * i.qty)}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-6 flex justify-between gap-3">
              <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass disabled:opacity-40">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={() => {
                    // validate shipping step before advancing
                    if (step === 0) {
                      const ok = validateShipping(form, setErrors);
                      if (!ok) { toast.error("Please fix errors in the form."); return; }
                    }
                    setStep(step + 1);
                  }} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={() => {
                    setDone(true);
                    if (singleMode && singleItem) {
                      remove(singleItem.product.id);
                    } else {
                      clear();
                    }
                    toast.success("Order placed!");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-4 w-4" /> Place Order
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="glass-strong rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="font-display font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <Row l="Subtotal" v={formatNPR(sub)} />
            <Row l="Shipping" v={shipping === 0 ? "Free" : formatNPR(shipping)} />
            <div className="h-px bg-white/10 my-2" />
            <Row l="Total" v={formatNPR(total)} bold />
          </div>
          <div className="mt-4 text-[10px] text-muted-foreground">By placing your order you agree to our terms.</div>
        </aside>
      </div>
    </div>
  );
}

function Row({ l, v, bold }: { l: string; v: string; bold?: boolean }) {
  return <div className={`flex justify-between ${bold ? "text-base font-bold" : "text-muted-foreground"}`}><span>{l}</span><span className={bold ? "text-gradient" : "text-foreground"}>{v}</span></div>;
}

function validateShipping(form: { name: string; phone: string; email: string; city: string; address: string; notes?: string }, setErrors: (e: Record<string,string>) => void) {
  const e: Record<string,string> = {};
  if (!form.name || form.name.trim().length < 2) e.name = "Please enter your full name.";
  const phone = (form.phone || "").replace(/\D/g, "");
  if (!phone) e.phone = "Phone is required.";
  else if (phone.length !== 10) e.phone = "Phone must be exactly 10 digits.";
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(form.email)) e.email = "Enter a valid email (must contain @ and a domain).";
  if (!form.address || form.address.trim().length < 5) e.address = "Enter a shipping address.";
  setErrors(e);
  return Object.keys(e).length === 0;
}

function Field({
  label,
  full,
  type = "text",
  defaultValue,
  value,
  onChange,
  error,
  inputProps,
}: {
  label: string;
  full?: boolean;
  type?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & { maxLength?: number };
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (inputProps?.inputMode === "numeric") {
      v = v.replace(/\D/g, "");
      if (inputProps?.maxLength) v = v.slice(0, inputProps.maxLength as number);
    }
    onChange?.(v);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (inputProps?.inputMode === "numeric") {
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
      e.preventDefault();
      onChange?.(inputProps?.maxLength ? pasted.slice(0, inputProps.maxLength as number) : pasted);
    }
  };

  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value ?? defaultValue ?? ""}
        onChange={handleChange}
        onPaste={handlePaste}
        {...(inputProps ?? {})}
        className={`mt-1 w-full bg-transparent border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary ${error ? "border-rose-400" : ""}`}
      />
      {error ? <div className="text-xs text-rose-400 mt-1">{error}</div> : null}
    </label>
  );
}
