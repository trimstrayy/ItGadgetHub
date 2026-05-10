import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { Link } from "@tanstack/react-router";

const AUTO_FLIP_MS = 4500;

function pickTopForCategory(slug: string) {
  return PRODUCTS.find((p) => p.category === slug) || PRODUCTS[0];
}

function shuffleArray<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroGallery() {
  const initial = useMemo(() => [
    { key: "laptops", title: "Editor's Pick", subtitle: "Laptops", image: CATEGORIES[0].image, product: pickTopForCategory("laptops") },
    { key: "mobile", title: "Editor's Pick", subtitle: "Mobile", image: CATEGORIES[3].image, product: pickTopForCategory("mobile") },
    { key: "components", title: "Featured", subtitle: "PC Components", image: CATEGORIES[1].image, product: pickTopForCategory("components") },
    { key: "accessories", title: "Featured", subtitle: "Accessories", image: CATEGORIES[2].image, product: pickTopForCategory("accessories") },
  ], []);

  const [slides, setSlides] = useState(initial);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const start = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), AUTO_FLIP_MS);
    };
    start();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, slides.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
    const onLeave = () => { timerRef.current = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), AUTO_FLIP_MS); };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [slides.length]);

  useEffect(() => {
    // compute direction for animation
    const prev = prevRef.current;
    let dir = 0;
    if (index === prev) dir = 0;
    else if (index === 0 && prev === slides.length - 1) dir = 1;
    else if (index === slides.length - 1 && prev === 0) dir = -1;
    else dir = index > prev ? 1 : -1;
    setDirection(dir);
    prevRef.current = index;
  }, [index, slides.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 1.02 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.98 }),
  };

  function shuffleSlides() {
    setSlides((s) => shuffleArray(s));
    setIndex(0);
  }

  return (
    <div ref={containerRef} className="relative" style={{ perspective: 1400 }}>
      <div className="absolute -inset-10 bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl rounded-full" />
      <div className="relative rounded-3xl overflow-hidden border-white/10 h-[340px] md:h-[520px]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {slides.map((s, i) => i === index && (
            <motion.div
              key={s.key + i}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img src={s.image} alt={s.subtitle} className="w-full h-full object-cover" style={{ backfaceVisibility: "hidden" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <motion.div
                initial={{ y: 20, opacity: 0, rotateY: 6 }}
                animate={{ y: 0, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.06 }}
                className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-3 flex items-center gap-3"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground"><path d="M12 2l2.5 6.5L21 9l-5 3.7L17 21l-5-3.1L7 21l1-8.3L3 9l6.5-.5L12 2z" fill="currentColor"/></svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{s.title}</div>
                  <div className="text-sm font-semibold" style={{ transform: "translateZ(40px) rotateY(-6deg)" }}>{s.product.name}</div>
                </div>
                <Link to="/product/$slug" params={{ slug: s.product.slug }} className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground">View</Link>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="absolute top-3 left-3">
          <button onClick={shuffleSlides} title="Shuffle slides" className="glass rounded-full p-2 hover:scale-105 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 3h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 21H3v-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 3l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 21l9-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
