import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageCircle, Plus } from "lucide-react";
import { waLink } from "@/data/products";

const FAQS = [
  { q: "Do you offer warranty on all products?", a: "Yes — every product carries an authentic manufacturer warranty plus our 7-day no-questions return policy." },
  { q: "Can I visit the store in Banepa?", a: "Absolutely. Visit us on Araniko Highway, Banepa-05. Open 10am – 7pm daily." },
  { q: "Do you deliver across Nepal?", a: "Yes. Free delivery within Kathmandu Valley. Pan-Nepal courier available." },
  { q: "Which payment methods do you accept?", a: "Cash on delivery, eSewa, Khalti, IME Pay, FonePay and bank transfer." },
  { q: "Are products genuine and brand-new?", a: "100%. All items are sealed, original and traceable via serial number." },
];

export function GadgetAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(0);
  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[70] group"
        aria-label="Open Gadget Assistant"
      >
        <span className="absolute inset-0 rounded-full animate-pulse-glow" />
        <span className="relative flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-[var(--shadow-glow)]">
          <span className="h-9 w-9 rounded-full bg-background/20 grid place-items-center">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline text-sm">Gadget Assistant</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", damping: 26 }}
              className="fixed z-[91] inset-x-4 bottom-4 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] glass-strong rounded-2xl shadow-[var(--shadow-elev)] overflow-hidden"
            >
              <div className="p-5 bg-gradient-to-br from-primary/20 to-accent/10 border-b border-white/5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary">Gadget Assistant</div>
                    <div className="font-display text-lg font-bold mt-1">How can we help you today?</div>
                    <div className="text-xs text-muted-foreground mt-1">Browse FAQs or chat with us live on WhatsApp.</div>
                  </div>
                  <button onClick={() => setOpen(false)} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/10"><X className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="p-4 max-h-[50vh] overflow-y-auto space-y-2">
                {FAQS.map((f, i) => (
                  <div key={i} className="glass rounded-xl">
                    <button onClick={() => setActive(active === i ? null : i)} className="w-full flex items-center justify-between text-left p-3 gap-3">
                      <span className="text-sm font-medium">{f.q}</span>
                      <Plus className={`h-4 w-4 shrink-0 transition-transform ${active === i ? "rotate-45" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-3 pb-3 text-xs text-muted-foreground leading-relaxed">{f.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/5">
                <a href={waLink("Hi IT Gadget Hub, I have a question…")} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
