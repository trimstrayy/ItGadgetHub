import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Sparkles } from "lucide-react";
import { CATEGORIES, WHATSAPP_NUMBER } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold">IT GADGET HUB</div>
                <div className="text-[10px] tracking-widest text-muted-foreground">BANEPA · NEPAL</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Banepa's premier destination for curated, certified premium tech.</p>
            <div className="mt-4 flex gap-2">
              {[Instagram, Facebook, Twitter].map((I, idx) => (
                <a key={idx} href="#" className="h-9 w-9 grid place-items-center glass rounded-lg hover:border-primary/40 transition">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.map((c) => (
                <li key={c.slug}><Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-foreground">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Warranty</Link></li>
              <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Visit Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> Araniko Highway, Banepa-05, Nepal</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> +977 {WHATSAPP_NUMBER.slice(3)}</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> hello@itgadgethub.np</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} IT Gadget Hub Banepa. Crafted with precision.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
