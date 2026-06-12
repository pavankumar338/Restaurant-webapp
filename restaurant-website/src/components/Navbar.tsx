import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import type { PageTab } from "../context/AppContext";
import { Menu, X, Sun, Moon, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, activeTab, setActiveTab } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for sticky shadow/height changes and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (offset / docHeight) * 100 : 0;

      setScrollProgress(progress);
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { label: string; tab: PageTab }[] = [
    { label: "Home", tab: "home" },
    { label: "About", tab: "about" },
    { label: "Menu", tab: "menu" },
    { label: "Gallery", tab: "gallery" },
    { label: "Contact", tab: "contact" },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? theme === "dark"
            ? "py-3 bg-stone-950/90 border-b border-gold-500/10 shadow-2xl backdrop-blur-md"
            : "py-3 bg-stone-50/90 border-b border-gold-500/20 shadow-xl backdrop-blur-md"
          : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => setActiveTab("home")}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="relative p-1.5 rounded-lg border border-gold-500/30 group-hover:border-gold-500/80 transition-colors duration-300">
                <img
                  src="LOGO.jpg"
                  alt="logo"
                  className="w-8 h-8 object-cover rounded-lg"
                />
              </div>
              <span className="font-serif text-2xl tracking-widest font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 dark:from-gold-200 dark:via-gold-400 dark:to-gold-500">
                FRY DADDY
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => setActiveTab(link.tab)}
                  className={`relative px-4 py-2 text-sm font-sans tracking-wide transition-colors duration-300 font-medium ${activeTab === link.tab
                    ? "text-gold-500"
                    : theme === "dark"
                      ? "text-stone-300 hover:text-white"
                      : "text-stone-700 hover:text-stone-950"
                    }`}
                >
                  <span>{link.label}</span>
                  {activeTab === link.tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-gold-500 to-amber-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Utilities (Theme + Reservation CTA) */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 ${theme === "dark"
                  ? "border-stone-800 text-gold-400 bg-stone-900/60 hover:bg-stone-900"
                  : "border-stone-200 text-stone-700 bg-stone-100 hover:bg-stone-200/80"
                  }`}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Explore Menu CTA Button */}
              <button
                onClick={() => setActiveTab("menu")}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-stone-950 text-sm font-sans font-bold uppercase tracking-wider rounded border border-gold-400 shadow-md hover:shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <Utensils size={16} />
                <span>Explore Menu</span>
              </button>
            </div>

            {/* Mobile Actions Menu (Hamburger & Theme) */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border ${theme === "dark"
                  ? "border-stone-800 text-gold-400 bg-stone-900/60"
                  : "border-stone-200 text-stone-700 bg-stone-100"
                  }`}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${theme === "dark"
                  ? "text-stone-300 hover:text-gold-400 hover:bg-stone-900/60"
                  : "text-stone-700 hover:text-gold-600 hover:bg-stone-100"
                  }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t mt-3 overflow-hidden ${theme === "dark"
                ? "bg-stone-950/95 border-stone-900"
                : "bg-stone-50/95 border-stone-200"
                }`}
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.tab}
                    onClick={() => {
                      setActiveTab(link.tab);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-md text-base font-sans font-medium transition-colors ${activeTab === link.tab
                      ? "bg-gold-500/10 text-gold-500 font-semibold border-l-2 border-gold-500"
                      : theme === "dark"
                        ? "text-stone-300 hover:bg-stone-900/50 hover:text-white"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                      }`}
                  >
                    {link.label}
                  </button>
                ))}

                <div className="pt-4 px-4">
                  <button
                    onClick={() => {
                      setActiveTab("menu");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider rounded border border-gold-400 shadow-md cursor-pointer"
                  >
                    <Utensils size={18} />
                    <span>Explore Menu</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
