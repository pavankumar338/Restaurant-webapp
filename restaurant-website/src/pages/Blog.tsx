import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Calendar, Clock, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Recipes" | "Cellar Guides" | "Culinary Secrets";
  date: string;
  readTime: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Physics of the Perfect Soufflé",
    excerpt: "Head Chef Vincent explains the thermal dynamics of whipped egg whites and how clay dishes retain structural integrity.",
    content: "A soufflé is not merely a recipe; it is an architectural contract between heat and egg whites. To construct our signature Valrhona Soufflé, we double-butter our ceramic molds, brushing upwards to establish guide rails for the ascending batter. The core must remain liquid — we introduce a frozen sphere of Grand Marnier and dark chocolate ganache at the center just before baking. The oven must maintain a constant 195°C with zero humidity. In this comprehensive essay, Vincent discusses the exact chemistry behind air trapping and why standard ovens struggle to retain the necessary pressure structures.",
    category: "Culinary Secrets",
    date: "June 08, 2026",
    readTime: "6 min read",
    author: "Chef Vincent",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "b2",
    title: "Pairing Grand Cru Bordeaux Vintages",
    excerpt: "Chef Sommelier Marc explores the deep violet notes of Château Margaux 2015 and how high iron soils balance rich fats.",
    content: "When pairing an A5 Miyazaki Wagyu ribeye, one must select a wine that does not compete with the heavy marbling but instead cleanses the palate between bites. The 2015 Château Margaux, a legendary vintage, features structured, silky tannins and notes of blackcurrant, cedar, and violet. The high iron content of the Margaux soil lends a slight mineral acidity that binds beautifully with Miyazaki fats, cutting through the richness while highlighting the beef's natural sweetness. In this article, Marc maps out the quarterly Bordeaux estate acquisitions and gives tips for aging vintages in home vaults.",
    category: "Cellar Guides",
    date: "May 24, 2026",
    readTime: "8 min read",
    author: "Marc Chevalier",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "b3",
    title: "Vincent's Truffle Reduction Secret",
    excerpt: "Revealing the slow reduction technique behind our classic white-truffle honey sauce used on Atlantic Salmon.",
    content: "Truffle honey reduction is a fragile element. If boiled, the delicate volatile oils that give Périgord truffles their signature earthy musk evaporate entirely. Chef Vincent details the water-bath reduction method. We start with wild thyme honey, heating it slowly in copper double-boilers to 45°C. Freshly grated winter truffle peels are added, steeping for exactly six hours. We then emulsify cold chive oil and a splash of Chardonnay vinegar to achieve a balanced viscosity. Follow these step-by-step cooking temperatures to replicate this legendary sauce in your personal dining salon.",
    category: "Recipes",
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Chef Vincent",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
  }
];

export const Blog: React.FC = () => {
  const { theme } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* 1. Header Section */}
      <section className={`py-12 border-b transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950/20 border-stone-900" : "bg-stone-50 border-stone-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
            Epicurean Insights
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl dark:text-stone-100 text-stone-950 mt-2 font-normal">
            The Culinary Blog
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
      </section>

      {/* 2. Blog Post Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className={`rounded-2xl overflow-hidden border shadow-xl flex flex-col justify-between group transition-all duration-300 ${
                theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
              }`}
            >
              {/* Image */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-75 group-hover:scale-103"
                />
                <div className="absolute top-4 left-4 py-1 px-2.5 rounded bg-gold-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider shadow">
                  {post.category}
                </div>
              </div>

              {/* Text Summary */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex gap-4 text-[10px] text-stone-500 font-sans uppercase font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold dark:text-stone-100 text-stone-950 group-hover:text-gold-500 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs font-sans dark:text-stone-400 text-stone-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t dark:border-stone-850 border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-sans italic">By {post.author}</span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 group cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Detailed Reading Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border max-h-[85vh] overflow-y-auto no-scrollbar ${
                theme === "dark"
                  ? "bg-stone-900 border-gold-500/20 text-white"
                  : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-1 rounded-full dark:hover:bg-stone-850 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X size={20} className="text-stone-500" />
              </button>

              <span className="text-xs font-sans uppercase font-bold text-gold-500">
                {selectedPost.category}
              </span>
              <h3 className="font-serif text-3xl font-medium tracking-wide mt-1 mb-2 dark:text-stone-100 text-stone-950">
                {selectedPost.title}
              </h3>

              <div className="flex gap-4 text-xs text-stone-550 border-b dark:border-stone-850 border-stone-150 pb-4 mb-4 font-sans uppercase">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              {/* Photo */}
              <div className="w-full h-64 overflow-hidden rounded-xl mb-6">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <p className="font-sans text-sm dark:text-stone-300 text-stone-750 leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
