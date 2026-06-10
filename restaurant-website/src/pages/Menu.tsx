import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Search, Heart, ShoppingBag, Plus, Minus, X, Info, Check, AlertCircle, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "Appetizers" | "Entrées" | "Desserts" | "Cellar Selection";
  image: string;
  isPopular?: boolean;
  isVegetarian: boolean;
  ingredients: string[];
  pairing: string;
  allergens: string[];
}

const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Imperial Osetra Caviar",
    price: 240,
    description: "Chilled gold-leaf blinis, whipped farm crème fraîche, and chives.",
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["Osetra Caviar", "Buckwheat Blinis", "Edible Gold Leaf", "Crème Fraîche", "Chives"],
    pairing: "Champagne Dom Pérignon 2012 Vintage",
    allergens: ["Fish/Seafood", "Gluten", "Dairy"],
  },
  {
    id: "m2",
    name: "Glazed Truffle Salmon",
    price: 75,
    description: "Atlantic salmon loin glaze in white truffle honey, served with braised heirloom asparagus.",
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    isVegetarian: false,
    ingredients: ["Atlantic Salmon", "White Truffle Honey", "Heirloom Asparagus", "Chive Infused Oil"],
    pairing: "Chablis Premier Cru 2019",
    allergens: ["Fish/Seafood"],
  },
  {
    id: "m3",
    name: "Truffle Fettuccine",
    price: 65,
    description: "House-made artisanal pasta, double-churned Alpine butter, and freshly shaved Périgord black truffles.",
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isVegetarian: true,
    ingredients: ["Artisanal Fettuccine", "Alpine Butter", "Black Périgord Truffle", "Parmigiano Reggiano 36M"],
    pairing: "Barolo Rocche dell'Annunziata 2015",
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: "m4",
    name: "Dry-Aged Wagyu Ribeye",
    price: 180,
    description: "A5 Miyazaki Wagyu seasoned with fleur de sel, served with roasted chanterelles and marrow bone.",
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["A5 Miyazaki Wagyu Ribeye", "Chanterelle Mushrooms", "Roasted Marrow Bone", "Fleur de Sel"],
    pairing: "Château Margaux 2015 Vintage",
    allergens: [],
  },
  {
    id: "m5",
    name: "Pan-Seared Duck Foie Gras",
    price: 85,
    description: "Hudson Valley foie gras, dark cherry port reduction, served over toasted brioche.",
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80", // secondary culinary placeholder
    isVegetarian: false,
    ingredients: ["Duck Foie Gras", "Bing Cherries", "Port Wine Reduction", "Toasted Brioche"],
    pairing: "Sauternes Chateau d'Yquem 2011",
    allergens: ["Gluten"],
  },
  {
    id: "m6",
    name: "Valrhona Soufflé",
    price: 25,
    description: "Double-chocolate soufflé, warm Grand Marnier liquid core, and Madagascar vanilla bean gelato.",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isVegetarian: true,
    ingredients: ["Valrhona Dark Chocolate", "Grand Marnier", "Madagascar Vanilla Bean", "Organic Cream"],
    pairing: "Tawny Port 20 Years Old",
    allergens: ["Dairy", "Eggs", "Gluten"],
  },
  {
    id: "m7",
    name: "Heirloom Beet Salad",
    price: 45,
    description: "Roasted gold and ruby beets, whipped goat cheese mousse, crushed pistachios, white balsamic glaze.",
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80", // placeholder
    isVegetarian: true,
    ingredients: ["Gold Beets", "Ruby Beets", "Goat Cheese Mousse", "Pistachios", "White Balsamic Vinegar"],
    pairing: "Sancerre Blanc 2020",
    allergens: ["Dairy", "Nuts"],
  },
  {
    id: "m8",
    name: "Wild Mushroom Risotto",
    price: 60,
    description: "Acquerello carnaroli rice simmered in mushroom broth, porcini ragout, aged Parmigiano.",
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80",
    isVegetarian: true,
    ingredients: ["Carnaroli Rice", "Porcini Mushrooms", "Chanterelle Mushrooms", "Parmigiano Reggiano"],
    pairing: "Meursault Chardonnay 2018",
    allergens: ["Dairy"],
  },
  {
    id: "m9",
    name: "Château Margaux 2015",
    price: 850,
    description: "Bottle. Grand Cru Classé Margaux. Full-bodied, silky tannins, deep blackberry and violet nose.",
    category: "Cellar Selection",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    isVegetarian: true,
    ingredients: ["Fermented Wine Grapes (Cabernet Sauvignon, Merlot)"],
    pairing: "Dry-Aged Wagyu Ribeye",
    allergens: ["Sulfites"],
  },
  {
    id: "m10",
    name: "Dom Pérignon 2012 Vintage",
    price: 450,
    description: "Bottle. Legendary Prestige Cuvée. Vibrant notes of stone fruits, toasted brioche, and clean minerals.",
    category: "Cellar Selection",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    isVegetarian: true,
    ingredients: ["Pinot Noir", "Chardonnay Grapes"],
    pairing: "Imperial Osetra Caviar",
    allergens: ["Sulfites"],
  }
];

export const Menu: React.FC = () => {
  const { theme, favorites, toggleFavorite, cart, addToCart, updateCartQuantity, addOrder } = useApp();
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Detail Modal State
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItem | null>(null);

  // Cart Drawer State
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  
  // Checkout Form State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const categories = ["All", "Appetizers", "Entrées", "Desserts", "Cellar Selection"];

  // Filter Logic
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegetarianOnly || item.isVegetarian;
    const matchesFav = !showFavoritesOnly || favorites.includes(item.id);

    return matchesCategory && matchesSearch && matchesVeg && matchesFav;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;
    
    // Call Context action to place order
    addOrder(customerName, phone, address);
    setCheckoutSuccess(true);
    
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCheckingOut(false);
      setShowCartDrawer(false);
      setCustomerName("");
      setPhone("");
      setAddress("");
    }, 4000);
  };

  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* 1. Header Hero */}
      <section className={`py-12 border-b transition-colors duration-500 ${
        theme === "dark" ? "bg-stone-950/20 border-stone-900" : "bg-stone-50 border-stone-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-widest font-sans">
            La Carte Du Jour
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl dark:text-stone-100 text-stone-950 mt-2 font-normal">
            Our Curated Menu
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />

          {/* Cart Float Button on Menu page */}
          {cart.length > 0 && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setShowCartDrawer(true)}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-4 py-2.5 bg-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded-full border border-gold-400 shadow-xl cursor-pointer"
            >
              <ShoppingBag size={14} className="animate-pulse" />
              <span>Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
            </motion.button>
          )}
        </div>
      </section>

      {/* 2. Filters & Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Categories Tab slider */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-gold-500 border-gold-500 text-stone-950 shadow-md font-bold"
                    : theme === "dark"
                    ? "border-stone-850 hover:bg-stone-900 text-stone-400"
                    : "border-stone-200 hover:bg-stone-100 text-stone-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar & Veg switch */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search caviar, steaks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-xs rounded-full border outline-none bg-transparent ${
                  theme === "dark"
                    ? "border-stone-800 text-white placeholder-stone-500 focus:border-gold-500"
                    : "border-stone-200 text-stone-950 placeholder-stone-400 focus:border-gold-500"
                }`}
              />
            </div>

            {/* Veg Switch */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={vegetarianOnly}
                onChange={(e) => setVegetarianOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-stone-300 dark:bg-stone-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-stone-600 peer-checked:bg-emerald-500 relative" />
              <span className="text-xs font-sans font-medium dark:text-stone-300 text-stone-700">Vegetarian</span>
            </label>

            {/* Wishlist toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                showFavoritesOnly
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                  : theme === "dark"
                  ? "border-stone-850 text-stone-400"
                  : "border-stone-200 text-stone-600"
              }`}
            >
              <Heart size={14} fill={showFavoritesOnly ? "currentColor" : "none"} />
              <span>Favorites</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Items Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto text-stone-500 h-12 w-12 mb-4" />
            <h3 className="font-serif text-xl dark:text-stone-300 text-stone-850">No Plates Match Filters</h3>
            <p className="text-sm text-stone-500 mt-2">Try clearing search phrases or choosing another food tier.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl overflow-hidden border shadow-xl flex flex-col justify-between group transition-all duration-300 ${
                  theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
                }`}
              >
                {/* Image Section */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                    {item.isPopular && (
                      <span className="py-1 px-2.5 rounded bg-gold-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider shadow">
                        Popular
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="py-1 px-2.5 rounded bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        Veg
                      </span>
                    )}
                  </div>
                  {/* Heart button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/45 hover:bg-black/60 text-white transition-colors cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={favorites.includes(item.id) ? "text-rose-500 fill-rose-500" : "text-white"}
                    />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-xl font-semibold dark:text-stone-100 text-stone-950">
                        {item.name}
                      </h3>
                      <span className="font-serif text-lg font-bold text-gold-500">${item.price}</span>
                    </div>
                    <p className="text-xs font-sans dark:text-stone-400 text-stone-600 leading-relaxed mt-2.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-3 pt-4 border-t dark:border-stone-800 border-stone-100">
                    <button
                      onClick={() => setActiveDetailItem(item)}
                      className={`p-2 rounded-lg border flex items-center justify-center dark:hover:bg-stone-850 hover:bg-stone-100 transition-colors cursor-pointer ${
                        theme === "dark" ? "border-stone-800 text-stone-400" : "border-stone-250 text-stone-600"
                      }`}
                      title="Pairing Info"
                    >
                      <Info size={16} />
                    </button>
                    <button
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      className="flex-grow flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-stone-950 text-xs font-sans font-bold uppercase tracking-wider rounded border border-gold-400 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Order Plate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Details Modal */}
      <AnimatePresence>
        {activeDetailItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailItem(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border ${
                theme === "dark"
                  ? "bg-stone-900 border-gold-500/20 text-white"
                  : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              <button
                onClick={() => setActiveDetailItem(null)}
                className="absolute top-4 right-4 p-1 rounded-full dark:hover:bg-stone-850 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X size={20} className="text-stone-500" />
              </button>

              <h3 className="font-serif text-2xl font-semibold mb-2 pr-6 dark:text-stone-100 text-stone-950">
                {activeDetailItem.name}
              </h3>
              <span className="text-xs font-sans uppercase font-bold text-gold-500">
                {activeDetailItem.category} • ${activeDetailItem.price}
              </span>
              
              <div className="w-full h-48 overflow-hidden rounded-xl my-4">
                <img
                  src={activeDetailItem.image}
                  alt={activeDetailItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm font-sans">
                <div>
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Description</h4>
                  <p className="dark:text-stone-300 text-stone-750 mt-1">{activeDetailItem.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Curated Sommelier Pairing</h4>
                  <p className="text-gold-500 font-semibold italic mt-1">{activeDetailItem.pairing}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Ingredients</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activeDetailItem.ingredients.map((ing, i) => (
                        <span key={i} className="text-[10px] bg-stone-100 dark:bg-stone-850 px-2 py-0.5 rounded border dark:border-stone-800">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Allergen Safety</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activeDetailItem.allergens.length > 0 ? (
                        activeDetailItem.allergens.map((alg, i) => (
                          <span key={i} className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded">
                            {alg}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-emerald-500 font-semibold">None detected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Online Ordering Cart Drawer */}
      <AnimatePresence>
        {showCartDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCartDrawer(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sliding Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className={`w-screen max-w-md border-l flex flex-col h-full justify-between shadow-2xl relative ${
                  theme === "dark" ? "bg-stone-900 border-stone-800 text-white" : "bg-white border-stone-200 text-stone-900"
                }`}
              >
                {/* Drawer Header */}
                <div className="p-6 border-b dark:border-stone-800 border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gold-500">
                    <ShoppingCart size={22} />
                    <h3 className="font-serif text-xl font-bold dark:text-white text-stone-950">Your Curated Order</h3>
                  </div>
                  <button
                    onClick={() => setShowCartDrawer(false)}
                    className="p-1 rounded-full dark:hover:bg-stone-850 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <X size={20} className="text-stone-500" />
                  </button>
                </div>

                {/* Checkout Success Block */}
                {checkoutSuccess ? (
                  <div className="flex-grow flex flex-col justify-center items-center p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                      <Check size={32} />
                    </div>
                    <h4 className="font-serif text-2xl font-bold dark:text-white text-stone-955 mb-2">Order Confirmed!</h4>
                    <p className="text-sm text-stone-650 dark:text-stone-300 leading-relaxed mb-4">
                      Our kitchen has received your ticket. Preparing your selections using artisanal reduction speeds.
                    </p>
                    <p className="text-xs text-gold-500 font-mono">ESTIMATED FULFILLMENT: 45 MINUTES</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                      {cart.length === 0 ? (
                        <div className="text-center py-16 space-y-3">
                          <ShoppingBag className="mx-auto text-stone-500 h-10 w-10" />
                          <h4 className="font-serif text-lg text-stone-550">Your Cart is Empty</h4>
                          <p className="text-xs text-stone-500">Explore the menu and add plates to get started.</p>
                        </div>
                      ) : (
                        cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 py-3 border-b dark:border-stone-850 border-stone-100"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg border dark:border-stone-800"
                            />
                            <div className="flex-grow">
                              <h4 className="font-serif text-sm font-semibold dark:text-stone-100 text-stone-950">
                                {item.name}
                              </h4>
                              <span className="text-xs text-gold-500 font-semibold">${item.price}</span>
                            </div>
                            
                            {/* Qty adjustments */}
                            <div className="flex items-center gap-2 border dark:border-stone-800 border-stone-200 rounded-lg p-1">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="p-0.5 rounded text-stone-500 dark:hover:bg-stone-800 hover:bg-stone-100 cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-0.5 rounded text-stone-500 dark:hover:bg-stone-800 hover:bg-stone-100 cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Checkout Billing Section */}
                    {cart.length > 0 && (
                      <div className="p-6 border-t dark:border-stone-800 border-stone-200 bg-stone-950/5 dark:bg-black/10">
                        {isCheckingOut ? (
                          <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                            <h4 className="font-serif text-base font-bold dark:text-stone-250 text-stone-900 border-b dark:border-stone-800 border-stone-200 pb-2">
                              Fulfillment Details
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Name</label>
                                <input
                                  type="text"
                                  required
                                  value={customerName}
                                  onChange={(e) => setCustomerName(e.target.value)}
                                  placeholder="Jane Dubois"
                                  className="w-full mt-1 px-3 py-2 text-xs rounded border outline-none bg-transparent dark:border-stone-800 border-stone-250"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Phone</label>
                                <input
                                  type="tel"
                                  required
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="+33 6..."
                                  className="w-full mt-1 px-3 py-2 text-xs rounded border outline-none bg-transparent dark:border-stone-800 border-stone-250"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Delivery Suite / Hotel Address</label>
                              <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Suite 404, The Ritz Paris"
                                className="w-full mt-1 px-3 py-2 text-xs rounded border outline-none bg-transparent dark:border-stone-800 border-stone-250"
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => setIsCheckingOut(false)}
                                className="w-1/3 py-2.5 border dark:border-stone-800 border-stone-200 text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                className="flex-grow py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 text-xs font-sans font-bold uppercase tracking-wider rounded border border-gold-400 shadow shadow-gold-500/10 cursor-pointer"
                              >
                                Place Order - ${cartTotal}
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm font-sans">
                              <span>Subtotal</span>
                              <span className="font-semibold">${cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm font-sans">
                              <span>Service Gratuity (10%)</span>
                              <span className="font-semibold">${Math.round(cartTotal * 0.1)}</span>
                            </div>
                            <div className="flex justify-between text-base font-serif border-t dark:border-stone-800 border-stone-200 pt-3 text-gold-500 font-bold">
                              <span>Total Amount</span>
                              <span>${Math.round(cartTotal * 1.1)}</span>
                            </div>

                            <button
                              onClick={() => setIsCheckingOut(true)}
                              className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow-md hover:shadow-gold-500/15 cursor-pointer flex items-center justify-center gap-2"
                            >
                              <ShoppingBag size={14} />
                              <span>Proceed to Checkout</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
