import React from "react";
import { useApp } from "../context/AppContext";
import { Shield, Sparkles, Heart, Compass, Wine, Star, Award, Landmark, Phone, Copy, Check } from "lucide-react";

export const About: React.FC = () => {
  const { theme } = useApp();
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const milestones = [
    {
      year: "2025",
      title: "The Founding",
      desc: "Frydaddy opens its first small kitchen in Vinukonda, introducing locals to premium crispy fried chicken and quality fast food.",
      icon: <Landmark size={18} />
    },
    {
      year: "2025",
      title: "Expanding the Menu",
      desc: "We introduced our popular steamed and fried Momos alongside delicious Chinese food, quickly becoming a local favorite.",
      icon: <Star size={18} />
    },
    {
      year: "2026",
      title: "Fried Chicken & Burgers",
      desc: "Added a vibrant range of signature Fried Chicken, Chinese food specialties, and gourmet fast food burgers, attracting food lovers from all across Palnadu.",
      icon: <Wine size={18} />
    },
    {
      year: "2026",
      title: "New Flagship Cafe",
      desc: "Moved to our current spacious Faisal Complex branch on Karampudi Road, serving a wider array of Chinese food and fast food in a premium ambiance.",
      icon: <Award size={18} />
    }
  ];

  return (
    <div className="pt-24 overflow-hidden">
      {/* 1. Heritage Story Header */}
      <section className={`py-16 transition-colors duration-500 ${theme === "dark" ? "bg-stone-950" : "bg-white"
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
                Gourmet Fast Food Crafted with Passion
              </h2>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                FRY DADDY was founded in Vinukonda with a simple goal: to serve the crispiest, most delicious fried chicken, authentic Chinese food, and gourmet fast food in Andhra Pradesh. Located in Faisal Complex on Karampudi Road, we have become the go-to spot for food lovers seeking premium quality and incredible taste.
              </p>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                We believe in fresh preparation. Every fast food item and Chinese delicacy is prepared and cooked to perfection only when you order. From our house-made secret sauces to fresh veggies, Chinese noodles, fried chicken, and mocktails, we focus on serving high-quality fast food and Chinese dishes in a vibrant, friendly cafe environment.
              </p>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-600 leading-relaxed">
                We believe that taste is the gateway to memory. Every recipe at Fry Daddy is crafted to evoke nostalgia, bringing back the joy of shared fast food meals, celebrations, and cozy cafe moments with loved ones. Through our unique blend of fresh ingredients and signature spices, we make sure every dining experience stays with you long after the meal is over.
              </p>

              {/* Core Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-3">
                  <div className="p-2 rounded bg-gold-500/10 border border-gold-500/20 text-gold-500 h-fit">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm dark:text-white text-stone-955">Fresh Ingredients</h4>
                    <p className="text-xs text-stone-500 mt-1">Fresh chicken, authentic Chinese food spices, and locally sourced veggies delivered daily.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 rounded bg-gold-500/10 border border-gold-500/20 text-gold-500 h-fit">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm dark:text-white text-stone-955">Quality Standards</h4>
                    <p className="text-xs text-stone-500 mt-1">Every fast food and Chinese food dish is cooked to order and inspected for perfect quality.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collage Images */}
            <div className="grid grid-cols-12 gap-4 items-stretch relative">
              <div className="col-span-8 overflow-hidden rounded-xl shadow-xl h-[380px]">
                <img
                  src="Image3.jpg"
                  alt="Frydaddy Cafe Atmosphere"
                  className="w-full h-full object-cover parallax-zoom"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="overflow-hidden rounded-xl shadow-xl flex-grow h-[180px]">
                  <img
                    src="Image6.jpg"
                    alt="Refreshing Mocktails"
                    className="w-full h-full object-cover parallax-zoom"
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-xl flex-grow h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80"
                    alt="Crispy Chicken Popcorn"
                    className="w-full h-full object-cover parallax-zoom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className={`py-16 transition-colors duration-500 ${theme === "dark" ? "bg-stone-900/40" : "bg-stone-50"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-2xl border ${theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
              }`}>
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 w-fit mb-4">
                <Compass size={24} />
              </div>
              <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-955 mb-3">Our Mission</h3>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-650 leading-relaxed">
                To bring premium, high-quality, and delicious fast food and authentic Chinese food to Vinukonda, providing an inviting space where friends and families can share great food and happy memories.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
              }`}>
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 w-fit mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-955 mb-3">Our Vision</h3>
              <p className="font-sans text-sm dark:text-stone-400 text-stone-650 leading-relaxed">
                To become Palnadu's leading fast food and Chinese food destination, known for unmatched chicken quality, signature sauces, and a commitment to fresh local ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Timeline Animation */}
      <section className={`py-24 transition-colors duration-500 ${theme === "dark" ? "bg-stone-950" : "bg-white"
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
                <div className={`p-6 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-stone-50 border-stone-200"
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
      <section className={`py-24 transition-colors duration-500 ${theme === "dark" ? "bg-stone-955" : "bg-stone-50"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl dark:text-stone-100 text-stone-950 font-normal mt-1">
              Meet The Founders
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Group Photo */}
            <div className="lg:col-span-6">
              <div className={`relative rounded-2xl overflow-hidden border shadow-2xl h-[450px] group transition-all duration-500 ${theme === "dark" ? "border-stone-850" : "border-stone-200"
                }`}>
                <img
                  src="WhatsApp Image 2026-06-13 at 8.29.04 PM.jpeg"
                  alt="Fry Daddy Founders"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />

                {/* Default gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-955/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />

                {/* Default Bottom badge */}
                <div className="absolute bottom-6 left-6 z-10 group-hover:opacity-0 transition-opacity duration-500">
                  <span className="bg-gold-500/90 text-stone-955 font-sans text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                    The Founders
                  </span>
                </div>

                {/* Hover Text Overlay */}
                <div className="absolute inset-0 bg-stone-955/90 flex flex-col justify-center items-center p-8 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md z-20 translate-y-2 group-hover:translate-y-0">
                  <p className="text-gold-500 font-sans text-xs font-bold tracking-widest uppercase mb-2">
                    Our Vision
                  </p>
                  <h4 className="font-serif text-3xl font-normal text-white mb-4">
                    Subhani, Subhani & Subhani
                  </h4>
                  <p className="font-sans text-sm text-stone-300 leading-relaxed max-w-xs">
                    "United by a shared passion to serve Vinukonda with the finest Chinese food, gourmet fast food, and a premium dining experience built on quality and hospitality."
                  </p>
                  <div className="w-12 h-0.5 bg-gold-500 mt-6" />
                </div>
              </div>
            </div>

            {/* Right Column: Name and Phone Number beside image */}
            <div className="lg:col-span-6 space-y-6">
              {[
                { name: "Subhani", phone: "+91 81253 38776" },
                { name: "Subhani", phone: "+91 99855 57876" },
                { name: "Subhani", phone: "+91 86882 20115" }
              ].map((member, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${theme === "dark"
                    ? "bg-stone-900/60 border-stone-850 hover:border-gold-500/30 hover:bg-stone-900/80 glass-dark"
                    : "bg-white border-stone-200 hover:border-gold-500/30 hover:shadow-lg glass-light"
                    }`}
                >
                  {/* Name and Pulse indicator */}
                  <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <h3 className="font-serif text-2xl font-normal dark:text-stone-100 text-stone-955">
                      {member.name}
                    </h3>
                  </div>

                  {/* Phone and Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Call Link */}
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold font-sans bg-stone-100/50 dark:bg-stone-950/50 dark:text-stone-300 text-stone-700 hover:text-gold-500 dark:hover:text-gold-500 hover:bg-gold-500/10 dark:hover:bg-gold-500/10 border border-stone-200/40 dark:border-stone-800/40 transition-all duration-300"
                    >
                      <Phone size={14} className="text-gold-500" />
                      <span>{member.phone}</span>
                    </a>

                    {/* WhatsApp button */}
                    <a
                      href={`https://wa.me/${member.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-gold-500/20 bg-gold-500/5 hover:bg-gold-500 text-gold-500 hover:text-stone-950 transition-all duration-300"
                      title="WhatsApp Chat"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.41 1.451 5.328 0 9.66-4.333 9.664-9.666.002-2.585-1.005-5.01-2.839-6.846-1.833-1.834-4.26-2.845-6.843-2.845-5.33 0-9.663 4.333-9.667 9.667-.001 1.93.501 3.81 1.456 5.426l-.991 3.616 3.702-.97.008-.007zm11.238-6.16c-.301-.15-1.782-.88-2.06-.98-.278-.1-.48-.15-.68.15-.2.3-.778.98-.953 1.18-.175.2-.35.225-.65.075-1.127-.566-1.884-1.004-2.636-2.292-.2-.345.2-.32.572-1.065.075-.15.038-.281-.018-.381-.056-.1-.48-1.156-.658-1.58-.174-.422-.365-.363-.5-.37l-.427-.008c-.15 0-.395.056-.6.281-.205.225-.78.762-.78 1.86 0 1.097.8 2.156.91 2.306.11.15 1.574 2.404 3.812 3.376.533.23 1.01.383 1.356.493.536.17 1.024.146 1.41.089.43-.064 1.782-.729 2.035-1.433.254-.704.254-1.306.178-1.433-.076-.127-.278-.202-.58-.352z" />
                      </svg>
                    </a>

                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(member.phone, index)}
                      className={`p-2.5 rounded-xl border transition-all duration-300 relative group cursor-pointer ${copiedIndex === index
                        ? "bg-green-500/10 border-green-500/30 text-green-500"
                        : "border-stone-200 dark:border-stone-850 hover:border-gold-500/40 dark:hover:border-gold-500/40 text-stone-500 dark:text-stone-400 hover:text-gold-500 dark:hover:text-gold-500"
                        }`}
                      title="Copy Number"
                    >
                      {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-stone-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                        {copiedIndex === index ? "Copied!" : "Copy Number"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
