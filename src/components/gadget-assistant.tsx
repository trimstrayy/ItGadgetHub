import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageCircle, Plus, Send, Bot, User } from "lucide-react";
import { waLink } from "@/data/products";

const FAQS = [
  { q: "Do you offer warranty on all products?", a: "Yes — every product carries an authentic manufacturer warranty plus our 7-day no-questions return policy." },
  { q: "Can I visit the store in Banepa?", a: "Absolutely. Visit us on Araniko Highway, Banepa-05. Open 10am – 7pm daily." },
  { q: "Do you deliver across Nepal?", a: "Yes. Free delivery within Kathmandu Valley. Pan-Nepal courier available." },
  { q: "Which payment methods do you accept?", a: "Cash on delivery, eSewa, Khalti, IME Pay, FonePay and bank transfer." },
  { q: "Are products genuine and brand-new?", a: "100%. All items are sealed, original and traceable via serial number." },
];

type Msg = { id: string; role: "user" | "bot"; text: string };

const SUGGESTIONS = ["Show me gaming laptops", "Track my order", "Warranty info", "Talk to a human"];

export function GadgetAssistant() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "faq">("chat");
  const [active, setActive] = useState<number | null>(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: "welcome", role: "bot", text: "Hi! I'm the IT Gadget Hub assistant. Ask about products, prices, warranty or delivery — or tap a suggestion below." },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, tab]);

  const send = (raw?: string) => {
    const text = (raw ?? message).trim();
    if (!text) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setMessage("");
    setTyping(true);
    // Placeholder bot reply — replace with real backend call later
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "Thanks for your message! Our team will respond shortly. For an instant reply, you can also reach us on WhatsApp.",
        },
      ]);
    }, 900);
  };

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
              className="fixed z-[91] inset-x-4 bottom-4 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] sm:h-[600px] max-h-[calc(100vh-2rem)] glass-strong rounded-2xl shadow-[var(--shadow-elev)] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-br from-foreground/10 to-foreground/[0.02] border-b border-white/5 shrink-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full bg-foreground text-background grid place-items-center">
                      <Bot className="h-5 w-5" />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-background" />
                    </div>
                    <div>
                      <div className="font-display font-bold leading-tight">Gadget Assistant</div>
                      <div className="text-[11px] text-muted-foreground">Online · replies instantly</div>
                    </div>
                  </div>
                  <button onClick={() => setOpen(false)} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/10"><X className="h-4 w-4" /></button>
                </div>
                <div className="mt-3 flex gap-1 p-1 rounded-lg bg-white/5 w-fit">
                  {(["chat", "faq"] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                      {t === "chat" ? "Chat" : "FAQ"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body */}
              {tab === "chat" ? (
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`h-7 w-7 shrink-0 rounded-full grid place-items-center ${m.role === "user" ? "bg-foreground text-background" : "bg-white/10 text-foreground"}`}>
                        {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                      </div>
                      <div className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-foreground text-background rounded-br-md" : "bg-white/5 border border-white/10 rounded-bl-md"}`}>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                  {typing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                      <div className="h-7 w-7 shrink-0 rounded-full bg-white/10 grid place-items-center"><Bot className="h-3.5 w-3.5" /></div>
                      <div className="px-3.5 py-3 rounded-2xl rounded-bl-md bg-white/5 border border-white/10 flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {messages.length <= 1 && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full glass hover:border-foreground/40 transition">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
              )}

              {/* Composer */}
              <div className="p-3 border-t border-white/5 space-y-2 shrink-0">
                <form
                  onSubmit={(e) => { e.preventDefault(); send(); }}
                  className="flex items-end gap-2 glass rounded-xl p-2"
                >
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Type a message…"
                    rows={1}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground resize-none max-h-32 px-2 py-1.5"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="h-9 w-9 grid place-items-center rounded-lg bg-foreground text-background disabled:opacity-40 hover:opacity-90 transition"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                <a href={waLink("Hi IT Gadget Hub, I have a question…")} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition">
                  <MessageCircle className="h-3 w-3" /> Prefer WhatsApp? Tap to open
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
