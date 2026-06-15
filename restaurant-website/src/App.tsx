import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWidgets } from "./components/FloatingWidgets";


import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Menu } from "./pages/Menu";
import { Contact } from "./pages/Contact";
import { Feedback } from "./pages/Feedback";

import { motion, AnimatePresence } from "framer-motion";

const AppContent: React.FC = () => {
  const { activeTab, theme } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case "home":
        return <Home key="home" />;
      case "about":
        return <About key="about" />;
      case "menu":
        return <Menu key="menu" />;
      case "contact":
        return <Contact key="contact" />;
      case "feedback":
        return <Feedback key="feedback" />;
      default:
        return <Home key="home" />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${theme === "dark"
        ? "bg-stone-950 text-stone-100"
        : "bg-stone-50 text-stone-900"
        }`}
    >
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main content container with smooth Framer Motion Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 5. Floating Interactive Widgets */}
      <FloatingWidgets />


    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;