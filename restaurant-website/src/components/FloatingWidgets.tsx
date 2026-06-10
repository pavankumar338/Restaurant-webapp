import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { ArrowUp, Calendar, MessageSquare, Send, X, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export const FloatingWidgets: React.FC = () => {
  const { theme, setActiveTab } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Welcome to L'Ambroisie. I am Jean, your virtual Sommelier & Booking host. How may I assist you with your dining arrangements today?",
      time: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, time: "Just now" },
    ]);
    setChatInput("");
    setIsTyping(true);

    // Simulated automated sommelier replies
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Thank you for reaching out. A booking manager will respond to you via WhatsApp shortly.";
      
      if (userMsg.toLowerCase().includes("reserve") || userMsg.toLowerCase().includes("table") || userMsg.toLowerCase().includes("book")) {
        replyText = "For direct bookings, you can use our interactive reservation system! Shall I navigate you to our online reservation page? Just click the button at the top right of the website.";
      } else if (userMsg.toLowerCase().includes("wine") || userMsg.toLowerCase().includes("drink") || userMsg.toLowerCase().includes("sommelier")) {
        replyText = "I highly recommend pairing our signature Imperial Caviar with a vintage Dom Pérignon 2012. Our cellars stock over 400 labels of grand cru classes.";
      } else if (userMsg.toLowerCase().includes("menu") || userMsg.toLowerCase().includes("food") || userMsg.toLowerCase().includes("dish")) {
        replyText = "Our signature menu features truffle fettuccine, wagyu ribeye, and our famous Valrhona chocolate soufflé. You can view full details under the 'Menu' section.";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: replyText, time: "Just now" },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* WhatsApp Chat Window */}
      <AnimatePresence>
        {showWhatsAppChat && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`w-80 sm:w-96 rounded-2xl shadow-2xl border overflow-hidden flex flex-col mb-4 ${
              theme === "dark"
                ? "bg-stone-900 border-gold-500/20 text-white"
                : "bg-white border-stone-200 text-stone-900"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gold-600 to-gold-500 p-4 text-stone-950 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-stone-900 border-2 border-white flex items-center justify-center font-serif text-lg font-bold text-gold-500">
                    J
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-serif font-bold tracking-wide">Jean-Luc</h4>
                  <p className="text-[10px] uppercase font-semibold text-stone-800">Sommelier & Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsAppChat(false)}
                className="p-1 rounded-full hover:bg-black/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow h-64 overflow-y-auto p-4 space-y-3 bg-stone-950/5 dark:bg-black/20 no-scrollbar">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gold-500 text-stone-950 rounded-br-none"
                        : theme === "dark"
                        ? "bg-stone-800 text-stone-100 rounded-bl-none border border-stone-700"
                        : "bg-stone-100 text-stone-850 rounded-bl-none border border-stone-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                    {msg.time}
                    {msg.sender === "user" && <CheckCheck size={12} className="text-gold-500" />}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 max-w-[80%] mr-auto">
                  <div className={`p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 border rounded-bl-none flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t dark:border-stone-800 border-stone-200 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about wines, reservations..."
                className={`flex-grow px-3 py-2 text-sm rounded-lg border outline-none bg-transparent ${
                  theme === "dark"
                    ? "border-stone-800 text-white placeholder-stone-500 focus:border-gold-500"
                    : "border-stone-200 text-stone-900 placeholder-stone-400 focus:border-gold-500"
                }`}
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-gold-500 text-stone-950 hover:bg-gold-400 transition-colors flex items-center justify-center cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Reservation Quick Button (Desktop only, hidden on mobile if navbar exists) */}
        <button
          onClick={() => setActiveTab("reservation")}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 border border-gold-400 shadow-xl hover:shadow-gold-500/25 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer lg:flex"
          title="Quick Booking"
        >
          <Calendar size={20} />
        </button>

        {/* WhatsApp Chat Toggle */}
        <button
          onClick={() => setShowWhatsAppChat(!showWhatsAppChat)}
          className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            showWhatsAppChat
              ? "bg-stone-950 text-gold-500 border-gold-500/50"
              : "bg-stone-900 border-gold-500/20 text-gold-500 hover:border-gold-500"
          }`}
          title="Chat Concierge"
        >
          <MessageSquare size={20} />
        </button>

        {/* Scroll Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                theme === "dark"
                  ? "bg-stone-900 border-stone-800 text-stone-300 hover:text-white"
                  : "bg-white border-stone-200 text-stone-700 hover:text-stone-950"
              }`}
              title="Back to Top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
