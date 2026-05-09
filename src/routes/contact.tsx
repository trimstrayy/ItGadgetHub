import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { waLink } from "@/data/products";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — IT Gadget Hub Banepa" }, { name: "description", content: "Visit our showroom in Banepa or reach us on WhatsApp." }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Reach out</div>
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">Talk to <span className="text-gradient">a human.</span></h1>
      <div className="mt-12 grid md:grid-cols-3 gap-4">
        {[
          { I: MapPin, t: "Showroom", d: "Araniko Highway, Banepa-05" },
          { I: Phone, t: "Call us", d: "+977 9800000000" },
          { I: Mail, t: "Email", d: "hello@itgadgethub.np" },
        ].map(({ I, t, d }) => (
          <div key={t} className="glass rounded-2xl p-6">
            <I className="h-5 w-5 text-primary mb-3" />
            <div className="font-display font-bold">{t}</div>
            <div className="text-sm text-muted-foreground mt-1">{d}</div>
          </div>
        ))}
      </div>
      <a href={waLink("Hi IT Gadget Hub, I'd like to know more...")} target="_blank" rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold">
        <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
      </a>
    </div>
  );
}
