import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { X, Sparkles, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SpecialDiscountPopup: React.FC = () => {
  const { theme, setActiveTab } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check session storage so we don't annoy the user on every tab switch
    const hasSeenPopup = sessionStorage.getItem("hasSeenPromoPopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3500); // 3.5 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenPromoPopup", "true");
  };

  const handleClaim = () => {
    // Save promotion in session storage so checkout page can check it
    sessionStorage.setItem("claimedPromoCode", "FRYDADDY-VIP");
    sessionStorage.setItem("hasSeenPromoPopup", "true");
    setIsVisible(false);
    setActiveTab("menu");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", duration: 0.6 }}
            className={`relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border text-center p-8 sm:p-10 ${
              theme === "dark"
                ? "bg-stone-900 border-gold-500/30 text-white"
                : "bg-stone-50 border-gold-500/40 text-stone-900"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                theme === "dark" ? "hover:bg-stone-800 text-stone-400" : "hover:bg-stone-200 text-stone-600"
              }`}
            >
              <X size={20} />
            </button>

            {/* Sparkle icons */}
            <div className="flex justify-center mb-4 text-gold-500">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Sparkles size={36} />
              </motion.div>
            </div>

            {/* Content */}
            <span className="text-xs font-sans font-bold tracking-widest text-gold-500 uppercase">
              Exclusive Diner Offer
            </span>
            <h3 className="font-serif text-3xl font-medium tracking-wide mt-2 mb-4 dark:text-stone-100 text-stone-900">
              Complimentary Mojito & Fries
            </h3>
            
            <p className="font-sans text-sm dark:text-stone-300 text-stone-700 leading-relaxed mb-6">
              Mention this VIP promo code during your visit today and get a complimentary <strong>Mint Mojito Mocktail</strong> or a portion of crispy <strong>Masala Fries</strong> with your delicious meal.
            </p>

            {/* Promo Code Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/10 border border-gold-500/25 mb-8">
              <Gift size={16} className="text-gold-500 animate-pulse" />
              <span className="font-mono text-sm font-semibold tracking-wider text-gold-500">
                CODE: FRYDADDY-VIP
              </span>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleClaim}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow-lg hover:shadow-gold-500/20 hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                Claim Offer & Explore Menu
              </button>
              <button
                onClick={handleClose}
                className={`w-full sm:w-auto px-8 py-3.5 border font-sans font-semibold uppercase tracking-wider text-xs rounded transition-all duration-300 ${
                  theme === "dark"
                    ? "border-stone-850 hover:bg-stone-850 text-stone-300 hover:text-white"
                    : "border-stone-200 hover:bg-stone-200/50 text-stone-700 hover:text-stone-950"
                }`}
              >
                No, Thank You
              </button>
            </div>
            
            <p className="text-[10px] text-stone-500 mt-4 italic">
              * Valid for dining orders of ₹300 or more.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
