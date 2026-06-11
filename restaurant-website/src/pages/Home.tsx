import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { ChevronLeft, ChevronRight, Star, Instagram, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simple CountUp helper component to fulfill counter animations requirement
const Counter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

export const Home: React.FC = () => {
  const { theme, setActiveTab } = useApp();
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  const featuredDishes = [
    {
      id: "fd1",
      name: "Fry Daddy Special Mix Pizza",
      description: "Delicious pizza topped with custom cheese blend, sweet corn, chilis, and grilled chicken or fresh veggies.",
      price: 129,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
      category: "Pizza"
    },
    {
      id: "fd2",
      name: "Fry Daddy Fried Chicken Popcorn",
      description: "Crunchy bite-sized chicken popcorn, seasoned with our secret spices blend. Perfect for snacking.",
      price: 129,
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1000&q=80",
      category: "Chicken"
    },
    {
      id: "fd3",
      name: "Double Cheese Patty Burger",
      description: "Perfectly grilled juicy patty with double melting cheddar cheese, fresh tomatoes, and custom burger sauce.",
      price: 119,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
      category: "Burger"
    },
    {
      id: "fd4",
      name: "Oreo Shake with Brownie",
      description: "Creamy, rich milkshake blended with crushed Oreos and finished with a hot chocolate brownie slice.",
      price: 100,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80",
      category: "Milkshake"
    }
  ];

  const testimonials = [
    {
      name: "Pavan Kumar",
      role: "Vinukonda Foodie",
      text: "Frydaddy's fried chicken is the absolute best in town! Crispy, juicy, and the spice blend is perfect.",
      stars: 5,
    },
    {
      name: "Sneha Latha",
      role: "Local Guide",
      text: "I love their burgers and Mint Mojito. Super cozy ambiance in Faisal Complex, and the prices are very pocket-friendly!",
      stars: 5,
    },
    {
      name: "Rajesh Sharma",
      role: "Regular Diner",
      text: "Their pizzas and milkshakes are spectacular. The Oreo shake with brownie is a must-try for everyone visiting!",
      stars: 5,
    }
  ];

  const instaGrid = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&h=400&q=80", // dining room
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&h=400&q=80", // bar counter
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&h=400&q=80", // cocktails
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&h=400&q=80", // wine cellars
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&h=400&q=80", // chef cooking
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&h=400&q=80", // desserts
  ];

  const handleNextDish = () => {
    setActiveDishIndex((prev) => (prev + 1) % featuredDishes.length);
  };

  const handlePrevDish = () => {
    setActiveDishIndex((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
  };

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Parallax Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')`,
            transform: "translateY(0px)",
          }}
        />
        {/* Golden vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/70" />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold-500 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest block mb-4"
          >
            Palnadu's Favorite Fast Food & Cafe
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-wide text-white leading-tight"
          >
            FRY DADDY
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-0.5 bg-gold-500 mx-auto my-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif italic text-lg sm:text-2xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            "Palnadu's Best Crispy Chicken & Burgers"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button
              onClick={() => setActiveTab("menu")}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow-xl hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Order Online
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white font-sans font-semibold uppercase tracking-wider text-xs rounded border border-stone-700 hover:border-white transition-all duration-300 cursor-pointer"
            >
              View Curated Menu
            </button>
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] tracking-widest text-stone-400 uppercase font-sans">Scroll</span>
          <div className="w-1.5 h-6 rounded-full border border-stone-400 p-0.5 flex items-start justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-1.5 bg-gold-500 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className={`py-16 transition-colors duration-500 border-b ${
        theme === "dark" ? "bg-stone-950 border-stone-900" : "bg-white border-stone-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-semibold text-gold-500 flex justify-center items-center">
                <Counter target={4} suffix=".5" />
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-stone-500 font-sans font-semibold mt-2">
                Diner Rating
              </p>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-semibold text-gold-500 flex justify-center items-center">
                <Counter target={10000} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-stone-500 font-sans font-semibold mt-2">
                Happy Customers
              </p>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-semibold text-gold-500 flex justify-center items-center">
                <Counter target={3} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-stone-500 font-sans font-semibold mt-2">
                Years in Vinukonda
              </p>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-semibold text-gold-500 flex justify-center items-center">
                <Counter target={50} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-stone-500 font-sans font-semibold mt-2">
                Menu Varieties
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Dishes Slider Section */}
      <section className={`py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950" : "bg-stone-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
              House Specialties
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-wide dark:text-stone-100 text-stone-950 mt-1">
              Chef's Signatures
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          {/* Slider Layout */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Dish Image (Left) */}
              <div className="lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[4/3] group shadow-2xl border dark:border-stone-900 border-stone-200">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeDishIndex}
                    src={featuredDishes[activeDishIndex].image}
                    alt={featuredDishes[activeDishIndex].name}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </AnimatePresence>
                <div className="absolute top-4 left-4 py-1.5 px-3 rounded bg-gold-500 text-stone-950 text-xs font-bold uppercase tracking-wider">
                  {featuredDishes[activeDishIndex].category}
                </div>
              </div>

              {/* Dish Details (Right) */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDishIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <span className="text-gold-500 font-serif text-2xl font-medium block">
                      ₹{featuredDishes[activeDishIndex].price}
                    </span>
                    <h3 className="font-serif text-3xl font-normal tracking-wide text-stone-950 dark:text-stone-100">
                      {featuredDishes[activeDishIndex].name}
                    </h3>
                    <p className="font-sans text-sm dark:text-stone-300 text-stone-700 leading-relaxed">
                      {featuredDishes[activeDishIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t dark:border-stone-900 border-stone-200">
                  <button
                    onClick={() => setActiveTab("menu")}
                    className="flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 group cursor-pointer"
                  >
                    <span>View All Menu</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={handlePrevDish}
                      className="p-2.5 rounded-full border dark:border-stone-850 border-stone-250 dark:hover:bg-stone-900 hover:bg-stone-100 dark:text-stone-300 text-stone-700 cursor-pointer"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextDish}
                      className="p-2.5 rounded-full border dark:border-stone-850 border-stone-250 dark:hover:bg-stone-900 hover:bg-stone-100 dark:text-stone-300 text-stone-700 cursor-pointer"
                      aria-label="Next"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Chef Introduction Section */}
      <section className={`py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Chef Portrait (Left) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 border border-gold-500/30 translate-x-4 translate-y-4 rounded-2xl z-0" />
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
                alt="Head Chef Chef Pavan Kumar"
                className="relative z-10 w-full h-[450px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-8 right-0 z-20 bg-gradient-to-r from-gold-600 to-gold-500 p-4 shadow-xl rounded-l-xl text-stone-950 font-serif text-sm italic">
                Pavan Kumar, Founder & Head Chef
              </div>
            </div>

            {/* Chef Text & Philosophy (Right) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
                Culinary Philosophy
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl dark:text-stone-100 text-stone-950 font-normal">
                Taste is the Gateway to Memory
              </h2>
              <div className="w-12 h-0.5 bg-gold-500" />
              
              <blockquote className="font-serif italic text-lg sm:text-xl dark:text-stone-200 text-stone-850 leading-relaxed border-l-2 border-gold-500 pl-4">
                "Quality and flavor are at the heart of our kitchen. We select only the freshest local chicken, veggies, and spices to construct our crispy coatings and rich sauces, ensuring a mouthwatering experience in every single bite."
              </blockquote>
              
              <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                Chef Pavan founded FrydaddyVNK with a singular dream: to bring premium, high-quality, and delicious gourmet fast food to Vinukonda. Every patty and spice dredging is crafted with care.
              </p>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                Our kitchen operates with maximum hygiene and precision, delivering plates that honor classic fast-food comfort while weaving rich spices tailored to local tastes.
              </p>
              
              <button
                onClick={() => setActiveTab("about")}
                className="px-6 py-3 border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-stone-950 transition-all duration-300 font-sans font-semibold text-xs uppercase tracking-wider rounded cursor-pointer"
              >
                Meet The Full Kitchen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Special Weekly Offers Section */}
      <section className={`py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950" : "bg-stone-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
              Seasonal Curations
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-wide dark:text-stone-100 text-stone-950 mt-1">
              Midweek & Weekend Specials
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Offer 1 */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 ${
              theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
            }`}>
              <div>
                <span className="text-gold-500 text-xs font-semibold uppercase tracking-wider font-sans">
                  Wednesdays Only
                </span>
                <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-950 mt-1 mb-3">
                  Wednesday Wings Special
                </h3>
                <p className="font-sans text-sm dark:text-stone-400 text-stone-650 leading-relaxed">
                  Get a complimentary portion of crispy chicken strips or masala fries with any order value exceeding ₹300. Perfect midweek snack to enjoy with friends and family.
                </p>
              </div>
              <div className="flex items-center justify-between mt-8 pt-6 border-t dark:border-stone-800 border-stone-100">
                <span className="font-serif text-lg text-gold-500 font-bold">₹199 / Order</span>
                <button
                  onClick={() => setActiveTab("menu")}
                  className="px-5 py-2.5 bg-stone-950 text-gold-500 hover:bg-gold-500 hover:text-stone-950 border border-gold-500/35 hover:border-gold-500 font-sans font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>

            {/* Offer 2 */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 ${
              theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
            }`}>
              <div>
                <span className="text-gold-500 text-xs font-semibold uppercase tracking-wider font-sans">
                  Sundays 11:00 – 16:00
                </span>
                <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-950 mt-1 mb-3">
                  Sunday Family Feast Combo
                </h3>
                <p className="font-sans text-sm dark:text-stone-400 text-stone-650 leading-relaxed">
                  Bring the family down for a special combo deal including 1 Veg/Chicken Pizza, 2 Burgers, a large French Fries, and 2 refreshing Mint Mojito Mocktails. Great food, great vibes.
                </p>
              </div>
              <div className="flex items-center justify-between mt-8 pt-6 border-t dark:border-stone-800 border-stone-100">
                <span className="font-serif text-lg text-gold-500 font-bold">₹399 / Family</span>
                <button
                  onClick={() => setActiveTab("menu")}
                  className="px-5 py-2.5 bg-stone-950 text-gold-500 hover:bg-gold-500 hover:text-stone-950 border border-gold-500/35 hover:border-gold-500 font-sans font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  Order Feast
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className={`py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
              Reviews & Press
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-wide dark:text-stone-100 text-stone-950 mt-1">
              Epicurean Acclaim
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl border flex flex-col justify-between ${
                  theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-stone-50 border-stone-200"
                }`}
              >
                <div>
                  <div className="flex gap-1 mb-4 text-gold-500">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="font-serif italic text-base dark:text-stone-200 text-stone-850 leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-wide dark:text-stone-100 text-stone-900">
                    {t.name}
                  </h4>
                  <span className="text-xs text-stone-500 font-sans">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Instagram Grid */}
      <section className={`py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950" : "bg-stone-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans flex items-center justify-center gap-1.5">
              <Instagram size={14} />
              <span>@frydaddyvnk</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-wide dark:text-stone-100 text-stone-950 mt-1">
              Visions of the Table
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instaGrid.map((img, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-square group shadow-md border border-stone-250 dark:border-stone-800">
                <img
                  src={img}
                  alt={`FrydaddyVNK Instagram Post ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="text-gold-500 h-8 w-8 scale-75 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Google Maps Location Section */}
      <section className={`py-24 transition-colors duration-500 border-t ${
        theme === "dark" ? "bg-stone-950 border-stone-900" : "bg-white border-stone-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Address Details (Left) */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
              <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
                Location
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl dark:text-stone-100 text-stone-950 font-normal">
                Visit FrydaddyVNK
              </h2>
              <div className="w-12 h-0.5 bg-gold-500" />

              <div className="space-y-4 font-sans text-sm leading-relaxed">
                <div className="flex gap-3">
                  <MapPin className="text-gold-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-white text-stone-900">Address</h4>
                    <p className="dark:text-stone-400 text-stone-600">Faisal Complex, Kalva Katta, Karampudi Road, Vinukonda, AP 522647</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Phone className="text-gold-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-white text-stone-900">Telephone</h4>
                    <p className="dark:text-stone-400 text-stone-600">+91 79474 25249</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="text-gold-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-white text-stone-900">Email Enquiries</h4>
                    <p className="dark:text-stone-400 text-stone-600">info@frydaddyvnk.com</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="text-gold-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-white text-stone-900">Operating Hours</h4>
                    <p className="dark:text-stone-400 text-stone-600">Daily: 11:00 AM – 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Google Maps Container (Right) */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden min-h-[350px] shadow-2xl border dark:border-stone-900 border-stone-250">
              <iframe
                title="FrydaddyVNK Google Map"
                src="https://maps.google.com/maps?q=FrydaddyVNK,%20Vinukonda,%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
