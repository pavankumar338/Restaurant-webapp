import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Maximize2, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  category: "Food" | "Interior" | "Events" | "Video";
  title: string;
  description: string;
  url: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    category: "Food",
    title: "Fry Daddy Fried Chicken",
    description: "Perfect golden crispy fried chicken seasoned with local spices.",
    url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    category: "Interior",
    title: "Modern Cafe Seating",
    description: "Cozy lighting and comfortable family booths.",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    category: "Food",
    title: "Frydaddy Secret Sauce Burger",
    description: "Juicy cheese chicken burger smothered in our house garlic mayo.",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g4",
    category: "Interior",
    title: "The Prep Kitchen",
    description: "Clean and hygienic station where the magic happens.",
    url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g5",
    category: "Events",
    title: "Outdoor Catering Setup",
    description: "Perfect food tables and live mocktail stations for parties.",
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g6",
    category: "Interior",
    title: "AC Lounge & Drinks Counter",
    description: "Cool lounge seating to enjoy fresh shakes and pizzas.",
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g7",
    category: "Food",
    title: "Crispy Fried Momos",
    description: "Tasty local momos served with fiery red chili dipping chutney.",
    url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g8",
    category: "Events",
    title: "Birthday Party Celebrations",
    description: "Creating memorable birthday bashes with custom combo buckets.",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g9",
    category: "Events",
    title: "Live Mocktail Counter",
    description: "Serving refreshing Mint Mojitos and Blue Curacao mocktails live.",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g10",
    category: "Video",
    title: "A Day at Frydaddy",
    description: "Virtual cinematic walkthrough of the Vinukonda cafe vibe.",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", // poster
  }
];

export const Gallery: React.FC = () => {
  const { theme } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Food", "Interior", "Events", "Video"];

  const filteredItems = galleryItems.filter(
    (item) => selectedFilter === "All" || item.category === selectedFilter
  );

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* 1. Header Section */}
      <section className={`py-12 border-b transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950/20 border-stone-900" : "bg-stone-50 border-stone-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
            Visual Ambiance
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl dark:text-stone-100 text-stone-950 mt-2 font-normal">
            Atmosphere Gallery
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
      </section>

      {/* 2. Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedFilter === cat
                  ? "bg-gold-500 border-gold-500 text-stone-950 font-bold"
                  : theme === "dark"
                  ? "border-stone-850 text-stone-400 hover:bg-stone-900"
                  : "border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Masonry/Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`break-inside-avoid relative rounded-xl overflow-hidden shadow-lg border group cursor-pointer transition-all duration-300 ${
                theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
              }`}
            >
              {/* Media Container */}
              <div className="relative overflow-hidden w-full">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-stone-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] text-gold-500 uppercase font-bold font-sans tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg text-white font-medium mt-1">{item.title}</h3>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed mt-1">
                    {item.description}
                  </p>
                  
                  {item.category === "Video" ? (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-500 text-stone-950 flex items-center justify-center shadow-lg">
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 text-stone-300 hover:text-white">
                      <Maximize2 size={14} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lightbox Popup overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-900/60 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-800"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Back Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-stone-900/60 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-800"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Visual */}
            <div className="max-w-4xl max-h-[80vh] flex flex-col justify-center items-center">
              {filteredItems[lightboxIndex].category === "Video" ? (
                /* Cinematic video player layout */
                <div className="w-full max-w-2xl aspect-video bg-stone-950 border border-gold-500/20 rounded-xl overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${filteredItems[lightboxIndex].url}')` }} />
                  <div className="relative z-10 flex flex-col items-center gap-3 text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-gold-500 text-stone-950 flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold">Launch Ambiance Film</span>
                    <p className="text-xs text-stone-400 max-w-sm mt-1">Simulated HD video stream loading. Audio output optimized for stereo configurations.</p>
                  </div>
                </div>
              ) : (
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />
              )}

              {/* Text Info */}
              <div className="text-center mt-4 max-w-md">
                <span className="text-gold-500 text-[10px] uppercase font-bold font-sans tracking-widest">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-xl text-white font-medium mt-1">{filteredItems[lightboxIndex].title}</h3>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-stone-900/60 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-800"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
