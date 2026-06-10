import React from "react";
import { useApp } from "../context/AppContext";
import { Shield, Sparkles, Heart, Compass, Wine, Star, Award, Landmark } from "lucide-react";

export const About: React.FC = () => {
  const { theme } = useApp();

  const milestones = [
    {
      year: "1994",
      title: "The Founding",
      desc: "Chef Vincent opens a modest 8-table salon in Rue de Furstemberg, focusing on heritage French plating.",
      icon: <Landmark size={18} />
    },
    {
      year: "2002",
      title: "First Michelin Recognition",
      desc: "Our unwavering commitment to pure, unadulterated flavors is honored with our first Michelin star.",
      icon: <Star size={18} />
    },
    {
      year: "2009",
      title: "The Subterranean Vaults",
      desc: "Construction completes on our temperature-controlled wine cellar, acquiring rare vintages from Bordeaux estates.",
      icon: <Wine size={18} />
    },
    {
      year: "2016",
      title: "The Third Michelin Star",
      desc: "L'Ambroisie achieves the highest culinary rank under Chef Vincent's signature reduction-sauce innovations.",
      icon: <Award size={18} />
    },
    {
      year: "2026",
      title: "Sustainable Gastronomy",
      desc: "We launch our direct-farm partnership network, ensuring 100% traceabilty of all vegetables and fowl.",
      icon: <Compass size={18} />
    }
  ];

  const team = [
    {
      name: "Vincent L'Ambroisie",
      role: "Head Chef & Founder",
      bio: "Thirty-five years of kitchen mastery. Vincent believes in pure, woodfired reductions and simple, exquisite pairings.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Amandine Dubois",
      role: "Head Pastry Chef",
      bio: "Formerly under Pierre Hermé. Amandine constructs light, geometric sugar structures and delicate soufflés.",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Marc Chevalier",
      role: "Chef Sommelier",
      bio: "Curates our 400+ label wine vault. Marc travels quarterly across France to acquire boutique vintages.",
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="pt-24 overflow-hidden">
      {/* 1. Heritage Story Header */}
      <section className={`py-16 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
              Our Journey
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl tracking-wide dark:text-stone-100 text-stone-950 mt-2 font-normal">
              Heritage & Craftsmanship
            </h1>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Text */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl dark:text-stone-100 text-stone-900 font-normal">
                Thirty Years of Gastronomic Sincerity
              </h2>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                L'Ambroisie was founded in 1994 on a singular philosophy: culinary simplicity is the ultimate expression of sophistication. Nestled in a quiet courtyard in the historic 6th arrondissement of Paris, we have spent three decades perfecting the art of French cuisine.
              </p>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                We do not strive to follow fleeting trends. Instead, we honor the elements. The heat of embers, the cold sweep of cellar vaults, the exact chemical reactions of vintage reduction pans. It is this dedication that has earned us a permanent residence among the world's most acclaimed fine dining institutions.
              </p>

              {/* Core Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-3">
                  <div className="p-2 rounded bg-gold-500/10 border border-gold-500/20 text-gold-500 h-fit">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm dark:text-white text-stone-950">Absolute Origin</h4>
                    <p className="text-xs text-stone-500 mt-1">Direct provenance tracing for every meat, fish, and herb.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 rounded bg-gold-500/10 border border-gold-500/20 text-gold-500 h-fit">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm dark:text-white text-stone-950">Michelin Standards</h4>
                    <p className="text-xs text-stone-500 mt-1">Every plate inspected by the Chef before presentation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collage Images */}
            <div className="grid grid-cols-12 gap-4 items-stretch relative">
              <div className="col-span-8 overflow-hidden rounded-xl shadow-xl h-[380px]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                  alt="L'Ambroisie Dining Room Atmosphere"
                  className="w-full h-full object-cover parallax-zoom"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="overflow-hidden rounded-xl shadow-xl flex-grow h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80"
                    alt="Wine Selection"
                    className="w-full h-full object-cover parallax-zoom"
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-xl flex-grow h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80"
                    alt="Caviar appetizer"
                    className="w-full h-full object-cover parallax-zoom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className={`py-16 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-900/40" : "bg-stone-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-2xl border ${
              theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
            }`}>
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 w-fit mb-4">
                <Compass size={24} />
              </div>
              <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-950 mb-3">Our Mission</h3>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-650 leading-relaxed">
                To capture the raw soul of seasonal ingredients and elevate them through French classical technique, providing an immersive multisensory dining journey that transforms simple meals into memorable lifetme histories.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
            }`}>
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 w-fit mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-950 mb-3">Our Vision</h3>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-650 leading-relaxed">
                To stand as an eternal beacon of standard-bearing French gastronomy, blending the precision of historical culinary systems with forward-thinking local agriculture partnerships to preserve earth's finest flavors for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Timeline Animation */}
      <section className={`py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950" : "bg-white"
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
              Chronology
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl dark:text-stone-100 text-stone-950 font-normal mt-1">
              Historical Milestones
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          {/* Timeline Tree */}
          <div className="relative border-l border-gold-500/35 ml-4 sm:ml-8 md:mx-auto md:w-3/4 space-y-12">
            {milestones.map((m, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline Dot Icon */}
                <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-stone-950 border border-gold-500 text-gold-500 flex items-center justify-center shadow-lg">
                  {m.icon}
                </div>
                
                {/* Milestone Details */}
                <div className={`p-6 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${
                  theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-stone-50 border-stone-200"
                }`}>
                  <span className="font-serif text-xl font-bold text-gold-500 block mb-1">{m.year}</span>
                  <h3 className="font-serif text-xl font-semibold dark:text-stone-100 text-stone-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Members */}
      <section className={`py-24 transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-955" : "bg-stone-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
              Our Artisans
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl dark:text-stone-100 text-stone-950 font-normal mt-1">
              Meet The Brigade
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, index) => (
              <div
                key={index}
                className={`rounded-2xl border overflow-hidden shadow-xl hover:translate-y-[-4px] transition-transform duration-300 ${
                  theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
                }`}
              >
                <div className="h-80 overflow-hidden relative group">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 text-center space-y-2">
                  <span className="text-xs font-bold tracking-widest text-gold-500 uppercase font-sans">
                    {t.role}
                  </span>
                  <h3 className="font-serif text-xl font-bold dark:text-stone-100 text-stone-900">
                    {t.name}
                  </h3>
                  <p className="font-sans text-xs dark:text-stone-400 text-stone-600 leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
