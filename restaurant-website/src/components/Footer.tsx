import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import type { PageTab } from "../context/AppContext";
import { Send, CheckCircle, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { theme, setActiveTab } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mock subscription
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const links: { label: string; tab: PageTab }[] = [
    { label: "Home", tab: "home" },
    { label: "Our Story", tab: "about" },
    { label: "Curated Menu", tab: "menu" },
    { label: "Atmosphere Gallery", tab: "gallery" },
    { label: "Contact Us", tab: "contact" },
  ];

  return (
    <footer
      className={`border-t transition-colors duration-500 ${
        theme === "dark"
          ? "bg-stone-950 border-stone-900 text-stone-400"
          : "bg-stone-50 border-stone-200 text-stone-600"
      }`}
    >
      {/* Top Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-dashed dark:border-stone-900 border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-900 tracking-wide">
              Club FrydaddyVNK
            </h3>
            <p className="mt-2 text-sm font-sans">
              Subscribe to receive exclusive coupons, new dish alerts, and weekend special updates.
            </p>
          </div>
          <div className="lg:col-span-2">
            <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for exclusive invites"
                  required
                  disabled={subscribed}
                  className={`w-full pl-12 pr-4 py-3.5 bg-transparent border rounded font-sans text-sm outline-none transition-all duration-300 ${
                    theme === "dark"
                      ? "border-stone-800 text-white placeholder-stone-500 focus:border-gold-500/50 focus:bg-stone-900/30"
                      : "border-stone-200 text-stone-950 placeholder-stone-400 focus:border-gold-500/50 focus:bg-white"
                  }`}
                />
              </div>
              
              <button
                type="submit"
                disabled={subscribed}
                className="px-8 py-3.5 bg-stone-900 text-gold-500 hover:bg-stone-850 border border-gold-500/30 hover:border-gold-500 font-sans font-semibold uppercase tracking-wider rounded text-xs transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-500">Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl tracking-widest font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                FRY DADDY
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Serving Palnadu's best crispy fried chicken, gourmet burgers, wood-fired pizzas, and thick milkshakes. Made fresh with premium ingredients, full of flavor and passion.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-gold-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gold-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gold-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold dark:text-stone-100 text-stone-900 tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setActiveTab(link.tab)}
                    className="text-sm font-sans hover:text-gold-500 hover:translate-x-1 transition-all duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold dark:text-stone-100 text-stone-900 tracking-wider mb-6">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li className="flex justify-between border-b border-dashed dark:border-stone-900 border-stone-200 pb-1.5">
                <span>Monday – Sunday</span>
                <span className="font-medium dark:text-stone-300 text-stone-850">11:00 AM – 11:00 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 text-stone-500">
                <span>Dine-in & Takeaway</span>
                <span className="italic">Open Daily</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold dark:text-stone-100 text-stone-900 tracking-wider mb-6">
              Contect Info
            </h4>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Faisal Complex, Kalva Katta, Karampudi Road, Vinukonda, AP 522647</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <a href="tel:+917947425249" className="hover:text-gold-500 transition-colors">
                  +91 79474 25249
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <a href="mailto:info@frydaddyvnk.com" className="hover:text-gold-500 transition-colors">
                  info@frydaddyvnk.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div
        className={`border-t py-8 text-center text-xs font-sans tracking-wider transition-colors duration-500 ${
          theme === "dark"
            ? "bg-black/40 border-stone-900 text-stone-500"
            : "bg-stone-150 border-stone-200 text-stone-500"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} FrydaddyVNK. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold-500" />
              <span>Palnadu's Favorite Gourmet Fast Food & Cafe</span>
            </span>
            <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms of Dining</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
