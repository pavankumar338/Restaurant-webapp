import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Star, MessageSquare, CheckCircle2, ArrowLeft, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Feedback: React.FC = () => {
  const { theme, addFeedback, setActiveTab } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [ambianceRating, setAmbianceRating] = useState(0);
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [comments, setComments] = useState("");

  // Hover states for stars
  const [hoverRating, setHoverRating] = useState(0);
  const [hoverFood, setHoverFood] = useState(0);
  const [hoverService, setHoverService] = useState(0);
  const [hoverAmbiance, setHoverAmbiance] = useState(0);

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (rating === 0) newErrors.rating = "Please select an overall rating.";
    if (foodRating === 0) newErrors.foodRating = "Please rate the food quality.";
    if (serviceRating === 0) newErrors.serviceRating = "Please rate our service.";
    if (ambianceRating === 0) newErrors.ambianceRating = "Please rate the ambiance.";
    if (recommend === null) newErrors.recommend = "Please let us know if you would recommend us.";
    if (!comments.trim()) newErrors.comments = "Please share your experience with us.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(`err-${firstError}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      addFeedback({
        name,
        phone: phone || undefined,
        rating,
        foodRating,
        serviceRating,
        ambianceRating,
        recommend: recommend ?? true,
        comments,
      });
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  // Star Rating input component
  const renderStarInput = (
    label: string,
    currentVal: number,
    setVal: (v: number) => void,
    hoverVal: number,
    setHoverVal: (v: number) => void,
    errorKey: string
  ) => {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-sans font-medium dark:text-stone-300 text-stone-700">{label}</label>
          <span className="text-xs font-serif italic text-gold-500">
            {currentVal === 5 ? "Excellent!" : currentVal === 4 ? "Very Good" : currentVal === 3 ? "Average" : currentVal === 2 ? "Below Average" : currentVal === 1 ? "Disappointed" : "Select rating"}
          </span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setVal(star)}
              onMouseEnter={() => setHoverVal(star)}
              onMouseLeave={() => setHoverVal(0)}
              className="p-1 transition-transform active:scale-95 duration-200 hover:scale-110 cursor-pointer"
            >
              <Star
                size={28}
                className={`transition-colors duration-250 ${
                  star <= (hoverVal || currentVal)
                    ? "fill-gold-500 text-gold-500 text-shadow-md"
                    : "text-stone-400 dark:text-stone-700 fill-transparent"
                }`}
              />
            </button>
          ))}
        </div>
        {errors[errorKey] && (
          <p id={`err-${errorKey}`} className="text-red-500 text-xs font-sans mt-1">
            {errors[errorKey]}
          </p>
        )}
      </div>
    );
  };

  // Confetti Pieces for Success State
  const confettiShapes = Array.from({ length: 40 });

  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Navigation back helper */}
        <button
          onClick={() => setActiveTab("home")}
          className={`group mb-6 flex items-center gap-2 text-xs uppercase tracking-wider font-semibold font-sans hover:text-gold-500 transition-colors duration-300 ${
            theme === "dark" ? "text-stone-400" : "text-stone-600"
          }`}
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="feedback-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className={`p-6 sm:p-8 rounded-3xl shadow-2xl border ${
                theme === "dark" ? "glass-dark" : "glass-light"
              }`}
            >
              {/* Header */}
              <div className="text-center mb-8 border-b border-dashed dark:border-stone-900 border-stone-200 pb-6">
                <div className="inline-flex p-3 rounded-full bg-gold-500/10 mb-4 text-gold-500">
                  <MessageSquare size={28} />
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                  Guest Experience Review
                </h1>
                <p className="mt-2 text-sm font-sans dark:text-stone-400 text-stone-600 max-w-md mx-auto">
                  Thank you for visiting <span className="font-semibold text-gold-500">FRY DADDY VNK</span>! Your review helps us craft the perfect gourmet experience.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Star Ratings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl dark:bg-stone-950/40 bg-stone-100/50 border dark:border-stone-900 border-stone-200">
                  <div className="md:col-span-2">
                    <h3 className="font-serif text-lg font-semibold text-gold-500 mb-2 flex items-center gap-1.5">
                      <Sparkles size={16} />
                      <span>Rate Your Experience</span>
                    </h3>
                  </div>

                  {renderStarInput(
                    "Overall Experience",
                    rating,
                    setRating,
                    hoverRating,
                    setHoverRating,
                    "rating"
                  )}

                  {renderStarInput(
                    "Food Quality",
                    foodRating,
                    setFoodRating,
                    hoverFood,
                    setHoverFood,
                    "foodRating"
                  )}

                  {renderStarInput(
                    "Customer Service",
                    serviceRating,
                    setServiceRating,
                    hoverService,
                    setHoverService,
                    "serviceRating"
                  )}

                  {renderStarInput(
                    "Ambiance & Cleanliness",
                    ambianceRating,
                    setAmbianceRating,
                    hoverAmbiance,
                    setHoverAmbiance,
                    "ambianceRating"
                  )}
                </div>

                {/* 2. Recommendation */}
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-sans font-medium dark:text-stone-300 text-stone-700">
                    Would you recommend Fry Daddy to others?
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl dark:bg-stone-950/50 bg-stone-100 border dark:border-stone-900 border-stone-200">
                    <button
                      type="button"
                      onClick={() => setRecommend(true)}
                      className={`py-2 text-xs font-sans font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                        recommend === true
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold"
                          : "dark:text-stone-400 text-stone-600 hover:text-emerald-500"
                      }`}
                    >
                      Yes, absolutely!
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommend(false)}
                      className={`py-2 text-xs font-sans font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                        recommend === false
                          ? "bg-red-500/10 text-red-500 border border-red-500/20 font-bold"
                          : "dark:text-stone-400 text-stone-600 hover:text-red-500"
                      }`}
                    >
                      No
                    </button>
                  </div>
                  {errors.recommend && (
                    <p id="err-recommend" className="text-red-500 text-xs font-sans">
                      {errors.recommend}
                    </p>
                  )}
                </div>

                {/* 3. Personal Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-gold-500 border-b dark:border-stone-900 border-stone-200 pb-2">
                    About You
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-sans font-semibold dark:text-stone-400 text-stone-600 uppercase">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-stone-950/60 border-stone-850 text-white focus:border-gold-500 focus:bg-stone-950"
                            : "bg-white border-stone-200 text-stone-900 focus:border-gold-500"
                        }`}
                      />
                      {errors.name && (
                        <p id="err-name" className="text-red-500 text-xs font-sans mt-0.5">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-sans font-semibold dark:text-stone-400 text-stone-600 uppercase">
                        Phone Number <span className="text-stone-500 lowercase">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="For custom offers & updates"
                        className={`w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-stone-950/60 border-stone-850 text-white focus:border-gold-500 focus:bg-stone-950"
                            : "bg-white border-stone-200 text-stone-900 focus:border-gold-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Comments / Suggestion Text */}
                <div className="space-y-1">
                  <label className="text-xs font-sans font-semibold dark:text-stone-400 text-stone-600 uppercase flex items-center justify-between">
                    <span>What did you love or how can we improve? <span className="text-red-500">*</span></span>
                    <span className="text-stone-500 italic text-[10px]">Min 5 characters</span>
                  </label>
                  <textarea
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Tell us about the dishes you tried, our staff service, or anything else on your mind..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-300 resize-none ${
                      theme === "dark"
                        ? "bg-stone-950/60 border-stone-850 text-white focus:border-gold-500 focus:bg-stone-950"
                        : "bg-white border-stone-200 text-stone-900 focus:border-gold-500"
                    }`}
                  />
                  {errors.comments && (
                    <p id="err-comments" className="text-red-500 text-xs font-sans mt-0.5">
                      {errors.comments}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-stone-950 font-sans font-bold uppercase tracking-wider rounded-xl border border-gold-400 shadow-md hover:shadow-xl hover:shadow-gold-500/25 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-stone-950 border-t-transparent animate-spin" />
                      <span>Recording Experience...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="feedback-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className={`p-8 rounded-3xl shadow-2xl border text-center relative overflow-hidden ${
                theme === "dark" ? "glass-dark" : "glass-light"
              }`}
            >
              {/* Confetti Animation Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {confettiShapes.map((_, i) => {
                  const randomX = Math.random() * 100; // start percent
                  const randomDelay = Math.random() * 3; // delay
                  const randomDuration = 3 + Math.random() * 4; // fall duration
                  const randomRotation = Math.random() * 360;
                  const randomScale = 0.5 + Math.random() * 0.8;
                  const colors = ["#d4af37", "#f6edd0", "#ecd79c", "#dfbc61", "#10b981", "#3b82f6"];
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];

                  return (
                    <motion.div
                      key={i}
                      initial={{ y: -20, x: `${randomX}%`, rotate: 0, opacity: 1 }}
                      animate={{ y: "100vh", rotate: randomRotation + 720, opacity: 0 }}
                      transition={{
                        duration: randomDuration,
                        delay: randomDelay,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                      }}
                      className="absolute w-2 h-4 rounded-sm"
                      style={{
                        backgroundColor: randomColor,
                        scale: randomScale,
                        top: -10,
                      }}
                    />
                  );
                })}
              </div>

              {/* Success content */}
              <div className="relative z-10 max-w-md mx-auto space-y-6">
                <div className="inline-flex p-3.5 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
                
                <h1 className="font-serif text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                  Thank You, {name}!
                </h1>
                
                <p className="text-sm font-sans dark:text-stone-300 text-stone-700 leading-relaxed">
                  Your feedback has been saved successfully. We appreciate your valuable suggestions and look forward to welcoming you back to Fry Daddy soon!
                </p>


                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveTab("menu")}
                    className="flex-1 py-3 px-5 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider rounded-xl hover:from-gold-500 hover:to-gold-400 text-xs shadow-md transition-all duration-300 cursor-pointer"
                  >
                    Browse Our Menu
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setRating(0);
                      setFoodRating(0);
                      setServiceRating(0);
                      setAmbianceRating(0);
                      setRecommend(null);
                      setComments("");
                    }}
                    className={`flex-1 py-3 px-5 border rounded-xl font-sans font-bold uppercase tracking-wider text-xs transition-all duration-300 cursor-pointer ${
                      theme === "dark"
                        ? "border-stone-850 hover:bg-stone-900 text-white"
                        : "border-stone-200 hover:bg-stone-100 text-stone-850"
                    }`}
                  >
                    Submit Another Response
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
