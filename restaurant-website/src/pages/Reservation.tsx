import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Calendar, User, Clock, Utensils, CheckCircle, Info, CalendarPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Reservation: React.FC = () => {
  const { theme, addReservation } = useApp();
  
  // Form States
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preference, setPreference] = useState("Window View");
  const [requests, setRequests] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Success Confirmation State
  const [bookingRef, setBookingRef] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Load promo code from session storage if claimed
  useEffect(() => {
    const code = sessionStorage.getItem("claimedPromoCode");
    if (code === "AMBROISIE-VIP") {
      setPromoApplied(true);
      setRequests("Complimentary Sommelier champagne reception (AMBROISIE-VIP).");
      // Remove it so it doesn't apply to multiple reservation forms if they book again
      sessionStorage.removeItem("claimedPromoCode");
    }
  }, []);

  const timeSlots = {
    Lunch: ["12:00", "12:30", "13:00", "13:30"],
    Dinner: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
  };

  const seatingPreferences = ["Window View", "Private Salon", "Chef's Table", "Bar Counter", "No Preference"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) return;

    // Create reservation record via context
    addReservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      preference,
      specialRequests: requests,
    });

    const refCode = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(refCode);
    setIsBooked(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setGuests(2);
    setPreference("Window View");
    setRequests("");
    setPromoApplied(false);
    setIsBooked(false);
    setBookingRef("");
  };

  // Set minimum date to today
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* 1. Header Section */}
      <section className={`py-12 border-b transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950/20 border-stone-900" : "bg-stone-50 border-stone-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
            Secure Your Table
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl dark:text-stone-100 text-stone-950 mt-2 font-normal">
            Online Reservation
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
      </section>

      {/* 2. Interactive Booking Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          {isBooked ? (
            /* Successful Booking View */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-8 sm:p-12 rounded-2xl border text-center space-y-6 shadow-2xl ${
                theme === "dark" ? "bg-stone-900 border-gold-500/20" : "bg-white border-gold-500/30"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 mx-auto mb-4 animate-bounce">
                <CheckCircle size={36} />
              </div>
              
              <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl font-normal dark:text-stone-100 text-stone-900">
                Your Table Awaits
              </h2>
              
              <div className={`py-4 px-6 rounded-xl inline-block font-mono text-lg border max-w-sm mx-auto ${
                theme === "dark" ? "bg-stone-950 border-stone-800 text-gold-400" : "bg-stone-50 border-stone-200 text-gold-600"
              }`}>
                REFERENCE: {bookingRef}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left font-sans text-xs border-y dark:border-stone-850 border-stone-200 py-6 my-6">
                <div>
                  <span className="text-stone-500 uppercase block font-semibold">Guests</span>
                  <span className="text-sm font-bold mt-1 dark:text-stone-250 text-stone-850">{guests} Diners</span>
                </div>
                <div>
                  <span className="text-stone-500 uppercase block font-semibold">Date</span>
                  <span className="text-sm font-bold mt-1 dark:text-stone-250 text-stone-850">{date}</span>
                </div>
                <div>
                  <span className="text-stone-500 uppercase block font-semibold">Time Slot</span>
                  <span className="text-sm font-bold mt-1 dark:text-stone-250 text-stone-850">{time}</span>
                </div>
                <div>
                  <span className="text-stone-500 uppercase block font-semibold">Seating</span>
                  <span className="text-sm font-bold mt-1 dark:text-stone-250 text-stone-850">{preference}</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed max-w-lg mx-auto">
                A validation digest has been dispatched to <strong>{email}</strong>. If you require scheduling updates, please reference your code when contacting the concierge desk at +33 1 42 78 56 30.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                <button
                  onClick={() => {
                    // Mock add to calendar alerts
                    alert("Calendar event (.ics file) generated. Added to local schedule.");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarPlus size={14} />
                  <span>Add to Calendar</span>
                </button>
                <button
                  onClick={resetForm}
                  className={`px-6 py-3 border font-sans font-semibold uppercase tracking-wider text-xs rounded transition-colors ${
                    theme === "dark"
                      ? "border-stone-800 hover:bg-stone-850 text-stone-300"
                      : "border-stone-200 hover:bg-stone-100 text-stone-700"
                  }`}
                >
                  Book Another Table
                </button>
              </div>
            </motion.div>
          ) : (
            /* Reservation Form View */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 sm:p-10 rounded-2xl border shadow-xl ${
                theme === "dark" ? "bg-stone-900 border-stone-850 text-white" : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              {/* Capacity Warning Info banner */}
              <div className="mb-8 p-4 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-start gap-3 text-gold-500">
                <Info size={18} className="flex-shrink-0 mt-0.5" />
                <div className="text-xs font-sans leading-relaxed">
                  <strong>Notice on Seating Capacity:</strong> Walk-ins are highly restricted. Due to fine dining preparations, online reservation books close 3 hours prior to service. There are currently <strong>8 vacant tables</strong> for dinner service tonight.
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* 1. Date, Guests & Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Date Input */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-2">
                      <Calendar size={14} className="text-gold-500" />
                      <span>Select Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={getTodayDateString()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark"
                          ? "border-stone-800 focus:border-gold-500 text-white"
                          : "border-stone-250 focus:border-gold-500 text-stone-950"
                      }`}
                    />
                  </div>

                  {/* Guests Input */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-2">
                      <User size={14} className="text-gold-500" />
                      <span>Guests</span>
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className={`w-full px-4 py-3 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark"
                          ? "border-stone-800 focus:border-gold-500 text-white [&>option]:bg-stone-900"
                          : "border-stone-250 focus:border-gold-500 text-stone-950 [&>option]:bg-white"
                      }`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-2">
                      <Utensils size={14} className="text-gold-500" />
                      <span>Seating Preference</span>
                    </label>
                    <select
                      value={preference}
                      onChange={(e) => setPreference(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark"
                          ? "border-stone-800 focus:border-gold-500 text-white [&>option]:bg-stone-900"
                          : "border-stone-250 focus:border-gold-500 text-stone-950 [&>option]:bg-white"
                      }`}
                    >
                      {seatingPreferences.map((pref) => (
                        <option key={pref} value={pref}>
                          {pref}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Time Slots */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-3">
                    <Clock size={14} className="text-gold-500" />
                    <span>Select Service Hour</span>
                  </label>
                  
                  <div className="space-y-4">
                    {/* Lunch Hour chips */}
                    <div>
                      <span className="text-[10px] text-stone-500 font-bold uppercase block mb-2">Lunch Service</span>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.Lunch.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`px-4 py-2 text-xs font-sans font-semibold rounded-lg border transition-all cursor-pointer ${
                              time === slot
                                ? "bg-gold-500 border-gold-500 text-stone-950 font-bold shadow"
                                : theme === "dark"
                                ? "border-stone-800 text-stone-300 dark:hover:bg-stone-850"
                                : "border-stone-200 text-stone-700 hover:bg-stone-50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dinner Hour chips */}
                    <div>
                      <span className="text-[10px] text-stone-500 font-bold uppercase block mb-2">Dinner Service</span>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.Dinner.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`px-4 py-2 text-xs font-sans font-semibold rounded-lg border transition-all cursor-pointer ${
                              time === slot
                                ? "bg-gold-500 border-gold-500 text-stone-950 font-bold shadow"
                                : theme === "dark"
                                ? "border-stone-800 text-stone-300 dark:hover:bg-stone-850"
                                : "border-stone-200 text-stone-700 hover:bg-stone-50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Customer Bio Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t dark:border-stone-850 border-stone-100">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Lord Evelyn Sinclair"
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="evelyn@sinclair.co.uk"
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5 block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7911 123456"
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                        theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                      }`}
                    />
                  </div>
                </div>

                {/* 4. Special Requests */}
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">Dietary Restrictions & Special Requests</label>
                    {promoApplied && (
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                        Champagne Offer Applied!
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="e.g. Birthday celebrations, gluten allergy constraints, preferred corner tables..."
                    className={`w-full px-4 py-3 rounded-lg border outline-none bg-transparent text-sm font-sans ${
                      theme === "dark" ? "border-stone-800 focus:border-gold-500" : "border-stone-250 focus:border-gold-500"
                    }`}
                  />
                </div>

                {/* Submit Booking */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow-xl hover:shadow-gold-500/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar size={14} />
                  <span>Secure Reservation Ticket</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
