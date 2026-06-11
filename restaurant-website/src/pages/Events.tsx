import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { CheckCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Events: React.FC = () => {
  const { theme } = useApp();
  
  // Inquiry Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Private Dinner");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(20);
  const [description, setDescription] = useState("");
  
  const [inquired, setInquired] = useState(false);

  const eventServices = [
    {
      title: "Birthday Parties & Celebrations",
      desc: "Book our spacious lounge area for unforgettable birthday celebrations. We provide customized combo packages, refreshing mocktails, custom decorations, and lively music setups.",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Corporate & Team Gatherings",
      desc: "Impress your coworkers and host business meetups in our comfortable AC lounge. Get custom group deals on our delicious burgers, pizzas, and mocktail pitchers.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Outdoor Catering Services",
      desc: "Frydaddy's kitchen team will travel directly to your party venue, setting up live frying and mocktail counters. Complete with professional servers and clean presentation.",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) return;

    // Simulate sending inquiry
    setInquired(true);
    setTimeout(() => {
      setInquired(false);
      setName("");
      setEmail("");
      setPhone("");
      setEventType("Private Dinner");
      setDate("");
      setGuests(20);
      setDescription("");
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
            Bespoke Gatherings
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl dark:text-stone-100 text-stone-950 mt-2 font-normal">
            Events & Catering
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
      </section>

      {/* 2. Services Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {eventServices.map((service, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image (Left/Right) */}
              <div className={`lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border dark:border-stone-900 border-stone-200 ${
                idx % 2 === 1 ? "lg:order-2" : ""
              }`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 object-cover hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Text details (Right/Left) */}
              <div className={`lg:col-span-6 space-y-4 ${
                idx % 2 === 1 ? "lg:order-1" : ""
              }`}>
                <h3 className="font-serif text-2xl sm:text-3xl dark:text-stone-100 text-stone-950 font-normal">
                  {service.title}
                </h3>
                <div className="w-10 h-0.5 bg-gold-500" />
                <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Inquiry Form Section */}
      <section className={`py-16 transition-colors duration-500 border-t ${
        theme === "dark" ? "bg-stone-900/40 border-stone-900" : "bg-stone-50 border-stone-200"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
              Plan Your Affair
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl dark:text-stone-100 text-stone-950 font-normal mt-1">
              Events Booking Inquiry
            </h2>
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mt-3" />
          </div>

          <AnimatePresence mode="wait">
            {inquired ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-10 rounded-2xl border text-center space-y-4 shadow-xl ${
                  theme === "dark" ? "bg-stone-900 border-gold-500/20" : "bg-white border-gold-500/30"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 mx-auto mb-4 animate-pulse">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-2xl font-normal dark:text-white text-stone-955">Inquiry Logged</h3>
                <p className="text-sm dark:text-stone-300 text-stone-650 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. An event manager from Frydaddy will call your contact number within 24 business hours to discuss menu packages and catering details.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleInquirySubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-6 sm:p-10 rounded-2xl border shadow-xl ${
                  theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Contact Name</label>
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

                  {/* Phone */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Event Tier</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark"
                          ? "border-stone-800 focus:border-gold-500 text-white [&>option]:bg-stone-900"
                          : "border-stone-250 focus:border-gold-500 text-stone-950 [&>option]:bg-white"
                      }`}
                    >
                      {["Wedding Reception", "Corporate Banquet", "Birthday Party", "Private Chef Table", "Art Gallery Event"].map(
                        (type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Proposed Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>

                  {/* Guest count */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Est. Attendance</label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={200}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">Aesthetic Instructions & Tasting Preferences</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Specific menu items needed, decoration requests, or spice levels..."
                    className={`w-full px-4 py-3 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                      theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>File Booking Inquiry</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
