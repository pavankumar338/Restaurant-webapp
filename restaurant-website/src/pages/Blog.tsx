import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Calendar, Clock, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Recipes" | "Drinks & Shakes" | "Culinary Secrets";
  date: string;
  readTime: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Physics of the Perfect Crispy Chicken",
    excerpt: "Chef Pavan explains the thermal dynamics of dredging flour, frying temperatures, and locking in juicy moisture.",
    content: "Creating the ultimate crispy fried chicken is an architectural contract between dredge thickness and oil temperature. To achieve our signature crunch, we double-dredge our seasoned chicken in spiced flour, then flash-fry at exactly 175°C. This instantly seals the outer layer, trapping the natural juices inside and ensuring the chicken remains incredibly tender. We use high-smoke-point oil to prevent any bitter residue. In this guide, Chef Pavan breaks down the exact chemistry of breading adhesion and how home kitchens can replicate this golden crunch.",
    category: "Culinary Secrets",
    date: "June 08, 2026",
    readTime: "4 min read",
    author: "Chef Pavan",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "b2",
    title: "The Art of the Thick & Creamy Milkshake",
    excerpt: "Chef Raj explores the science of blending dairy fats and why correct temperature makes the shake smooth.",
    content: "A great milkshake is all about consistency. To construct our thick shakes, we balance premium vanilla ice cream with fresh, cold milk at a 3:1 ratio. The blending speed must be high enough to aerate the milk, creating micro-bubbles that give the shake its velvety texture, but slow enough to avoid melting the fats. Adding toppings like crushed oreos or fudge brownies at the very end ensures every sip contains delightful crunchy bits. Chef Raj shares his favorite syrups, milk fat percentages, and blending secrets.",
    category: "Drinks & Shakes",
    date: "May 24, 2026",
    readTime: "5 min read",
    author: "Chef Raj",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "b3",
    title: "Unveiling the Frydaddy Secret Sauce",
    excerpt: "Revealing the slow emulsification technique behind our signature spicy garlic mayo dip.",
    content: "A signature sauce holds a cafe's identity. Our secret Frydaddy sauce blends creamy mayonnaise with a slow infusion of local Palnadu red chilis and fresh garlic paste. The secret is the emulsification process. We slowly drip lemon juice and olive oil into the egg yolk base to create a perfectly thick texture. Freshly ground pepper and a dash of mustard powder are added, letting the flavors marry in cold storage for exactly 12 hours. Follow these tips to create a rich, spicy dip for your crispy chicken.",
    category: "Recipes",
    date: "May 12, 2026",
    readTime: "4 min read",
    author: "Chef Pavan",
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
