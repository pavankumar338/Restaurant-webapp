import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Contact: React.FC = () => {
  const { theme } = useApp();
  
  // Message Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [sent, setSent] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate sending message
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 4500);
  };

  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* 1. Header Section */}
      <section className={`py-12 border-b transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950/20 border-stone-900" : "bg-stone-50 border-stone-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl dark:text-stone-100 text-stone-950 mt-2 font-normal">
            Contact & Timings
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Details (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Top info cards */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl dark:text-stone-100 text-stone-950 font-normal">
                Direct Enquiries
              </h2>
              <div className="w-10 h-0.5 bg-gold-500" />
              
              <div className="space-y-4 font-sans text-sm leading-relaxed">
                 <a 
                  href="https://maps.google.com/?q=FrydaddyVNK,+Vinukonda,+Andhra+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex gap-3 p-4 rounded-xl border hover:scale-[1.01] transition-transform ${
                    theme === "dark" ? "bg-stone-900 border-stone-850 text-stone-300" : "bg-stone-50 border-stone-200 text-stone-750"
                  }`}
                >
                  <MapPin className="text-gold-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-white text-stone-955">Cafe Address</h4>
                    <p className="text-xs text-stone-500 mt-1">Faisal Complex, Kalva Katta, Karampudi Road, beside Sri Satya, Vinukonda, AP 522647</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+917947425249"
                  className={`flex gap-3 p-4 rounded-xl border hover:scale-[1.01] transition-transform ${
                    theme === "dark" ? "bg-stone-900 border-stone-850 text-stone-300" : "bg-stone-50 border-stone-200 text-stone-750"
                  }`}
                >
                  <Phone className="text-gold-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-white text-stone-955">Phone Support (Call)</h4>
                    <p className="text-xs text-stone-500 mt-1">+91 79474 25249</p>
                  </div>
                </a>

                <a 
                  href="mailto:support@frydaddyvnk.com"
                  className={`flex gap-3 p-4 rounded-xl border hover:scale-[1.01] transition-transform ${
                    theme === "dark" ? "bg-stone-900 border-stone-850 text-stone-300" : "bg-stone-50 border-stone-200 text-stone-750"
                  }`}
                >
                  <Mail className="text-gold-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-white text-stone-955">Email Support</h4>
                    <p className="text-xs text-stone-500 mt-1">support@frydaddyvnk.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Timings Visual Grid */}
            <div className={`p-6 rounded-xl border space-y-4 ${
              theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-stone-50 border-stone-200"
            }`}>
              <h3 className="font-serif text-lg font-bold dark:text-white text-stone-950 flex items-center gap-2">
                <Clock className="text-gold-500" size={18} />
                <span>Operating Timings</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-stone-500 uppercase block font-semibold">Monday – Sunday</span>
                  <span className="font-medium mt-1 block dark:text-stone-300 text-stone-850">11:00 – 23:00</span>
                </div>
                <div>
                  <span className="text-stone-500 uppercase block font-semibold">Peak Hours</span>
                  <span className="font-medium mt-1 block dark:text-stone-300 text-stone-850">18:00 – 21:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-10 rounded-2xl border text-center space-y-4 shadow-xl h-full flex flex-col justify-center items-center ${
                    theme === "dark" ? "bg-stone-900 border-gold-500/20" : "bg-white border-gold-500/30"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 mb-4 animate-pulse">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-normal dark:text-white text-stone-950">Message Dispatched</h3>
                  <p className="text-sm dark:text-stone-300 text-stone-650 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your inquiry has been forwarded to our administration desk. We will answer your email at <strong>{email}</strong> within 12 business hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleMessageSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-6 sm:p-10 rounded-2xl border shadow-xl h-full space-y-6 ${
                    theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
                  }`}
                >
                  <h3 className="font-serif text-xl font-bold dark:text-white text-stone-950">
                    Send Direct Message
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Pavan Kumar"
                        className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                          theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="pavan@gmail.com"
                        className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                          theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Catering Quote, Table Booking..."
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Message Body</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your request in detail..."
                      className={`w-full px-4 py-3 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>Send Message</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. Maps Embed */}
      <section className="w-full h-96 relative border-t dark:border-stone-900 border-stone-200">
        <iframe
          title="Frydaddy Bottom Contact Map"
          src="https://maps.google.com/maps?q=FrydaddyVNK,%20Vinukonda,%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale dark:invert-[0.9] dark:opacity-80"
        />
      </section>
    </div>
  );
};
