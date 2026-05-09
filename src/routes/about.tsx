import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Shield, Award, Cpu } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — IT Gadget Hub Banepa" }, { name: "description", content: "The story behind Banepa's premier tech boutique." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Our Story</div>
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">A boutique built<br />for <span className="text-gradient">enthusiasts.</span></h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
        IT Gadget Hub started in 2018 with a simple obsession: to make truly premium technology accessible in Banepa.
        We spend hours benchmarking, unboxing and stress-testing every SKU we sell — so you don't have to.
      </p>
      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {[
          { I: Sparkles, t: "Curated, not cluttered", d: "We sell only what we'd buy ourselves." },
          { I: Shield, t: "Authenticity, guaranteed", d: "Every device traceable to its source." },
          { I: Award, t: "Service that scales", d: "Pre-sale guidance, post-sale care." },
          { I: Cpu, t: "Engineers in-house", d: "Real technicians, real diagnostics." },
        ].map(({ I, t, d }) => (
          <div key={t} className="glass rounded-2xl p-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-3"><I className="h-4 w-4 text-primary" /></div>
            <div className="font-display font-bold text-lg">{t}</div>
            <p className="text-sm text-muted-foreground mt-1">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
