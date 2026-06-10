import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Award, QrCode, CreditCard, X, ShieldCheck, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LoyaltyBanner: React.FC = () => {
  const { theme } = useApp();
  const [modalType, setModalType] = useState<"none" | "loyalty" | "giftcard" | "qr">("none");
  const [giftAmount, setGiftAmount] = useState<number>(250);
  const [giftRecipient, setGiftRecipient] = useState("");
  const [giftName, setGiftName] = useState("");
  const [giftSuccess, setGiftSuccess] = useState(false);
  const [qrDownloaded, setQrDownloaded] = useState(false);

  const handleBuyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftRecipient || !giftName) return;
    setGiftSuccess(true);
    setTimeout(() => {
      setGiftSuccess(false);
      setGiftRecipient("");
      setGiftName("");
      setModalType("none");
    }, 4000);
  };

  const triggerQrDownload = () => {
    setQrDownloaded(true);
    setTimeout(() => setQrDownloaded(false), 3000);
  };

  return (
    <>
      {/* Loyalty Banner Strip */}
      <div
        className={`w-full py-8 border-y transition-all duration-500 ${
          theme === "dark"
            ? "bg-stone-900/40 border-stone-900 text-stone-300"
            : "bg-stone-100/50 border-stone-200 text-stone-700"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Loyalty Club Section */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold dark:text-stone-100 text-stone-950">
                  L'Ambroisie Club
                </h4>
                <p className="text-sm mt-1 leading-relaxed">
                  Earn points on reservations and bespoke catering. Unlock private chef invitations.
                </p>
                <button
                  onClick={() => setModalType("loyalty")}
                  className="text-xs text-gold-500 font-semibold hover:underline mt-2 tracking-wide block"
                >
                  Discover Rewards →
                </button>
              </div>
            </div>

            {/* Gift Card Section */}
            <div className="flex items-start gap-4 border-t lg:border-t-0 lg:border-x dark:border-stone-900 border-stone-200 py-6 lg:py-0 lg:px-6">
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500">
                <CreditCard size={24} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold dark:text-stone-100 text-stone-950">
                  Epircurean Gift Cards
                </h4>
                <p className="text-sm mt-1 leading-relaxed">
                  Gift a memorable dining journey. Digital cards are delivered instantly.
                </p>
                <button
                  onClick={() => setModalType("giftcard")}
                  className="text-xs text-gold-500 font-semibold hover:underline mt-2 tracking-wide block"
                >
                  Purchase Gift Card →
                </button>
              </div>
            </div>

            {/* QR Code Menu Section */}
            <div className="flex items-start gap-4 border-t lg:border-t-0 py-6 lg:py-0 lg:pl-6">
              <div className="p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500">
                <QrCode size={24} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold dark:text-stone-100 text-stone-950">
                  Digital QR Menu
                </h4>
                <p className="text-sm mt-1 leading-relaxed">
                  Instant, touch-free table menu for smartphones. Always updated with daily pairings.
                </p>
                <button
                  onClick={() => setModalType("qr")}
                  className="text-xs text-gold-500 font-semibold hover:underline mt-2 tracking-wide block"
                >
                  Access QR Code →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modals */}
      <AnimatePresence>
        {modalType !== "none" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType("none")}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border ${
                theme === "dark"
                  ? "bg-stone-900 border-gold-500/20 text-white"
                  : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setModalType("none")}
                className="absolute top-4 right-4 p-1 rounded-full dark:hover:bg-stone-850 hover:bg-stone-100 transition-colors"
              >
                <X size={20} className="text-stone-500" />
              </button>

              {/* LOYALTY CLUB INFORMATION */}
              {modalType === "loyalty" && (
                <div>
                  <div className="flex items-center gap-3 mb-4 text-gold-500">
                    <Award size={28} />
                    <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-950">
                      Club Membership
                    </h3>
                  </div>
                  <p className="text-sm font-sans dark:text-stone-300 text-stone-700 leading-relaxed mb-4">
                    Membership is complimentary. Registering your telephone number during a reservation automatically links your visits.
                  </p>
                  <ul className="space-y-3 mb-6 text-sm font-sans">
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Tier 1 (Epicure):</strong> 1 point per $1 spent. Complimentary dessert on birthdays.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Tier 2 (Gourmand):</strong> At 1000 points, receive 10% off cellar wines and priority table booking.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Tier 3 (Grand Cru):</strong> Exclusive invitations to tasting dinners with Head Chef Vincent.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setModalType("none")}
                    className="w-full py-3 bg-gradient-to-r from-gold-650 to-gold-500 text-stone-950 font-sans font-semibold uppercase tracking-wider text-xs rounded border border-gold-450 hover:shadow-lg transition-all"
                  >
                    Got It
                  </button>
                </div>
              )}

              {/* GIFT CARD SHOP */}
              {modalType === "giftcard" && (
                <div>
                  <div className="flex items-center gap-3 mb-4 text-gold-500">
                    <CreditCard size={28} />
                    <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-950">
                      Purchase Gift Card
                    </h3>
                  </div>
                  
                  {giftSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 mx-auto mb-4">
                        <Check size={32} />
                      </div>
                      <h4 className="font-serif text-xl font-bold mb-2 text-stone-900 dark:text-white">Purchase Complete!</h4>
                      <p className="text-sm text-stone-600 dark:text-stone-300">
                        An email containing the digital voucher has been sent to <strong>{giftRecipient}</strong>.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBuyGiftCard} className="space-y-4">
                      {/* Price Selection */}
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Select Amount</label>
                        <div className="grid grid-cols-4 gap-2 mt-1.5">
                          {[100, 250, 500, 1000].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setGiftAmount(val)}
                              className={`py-2 text-sm font-semibold rounded border transition-all ${
                                giftAmount === val
                                  ? "bg-gold-500 border-gold-500 text-stone-950 shadow-md"
                                  : "border-stone-250 dark:border-stone-800 dark:hover:bg-stone-850 hover:bg-stone-50 text-stone-500 dark:text-stone-400"
                              }`}
                            >
                              ${val}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recipient Details */}
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={giftName}
                          onChange={(e) => setGiftName(e.target.value)}
                          placeholder="e.g. Charlotte Dubois"
                          className="w-full mt-1.5 px-3 py-2 rounded-lg border outline-none bg-transparent text-sm dark:border-stone-800 border-stone-200"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Recipient Email</label>
                        <input
                          type="email"
                          required
                          value={giftRecipient}
                          onChange={(e) => setGiftRecipient(e.target.value)}
                          placeholder="e.g. charlotte@example.com"
                          className="w-full mt-1.5 px-3 py-2 rounded-lg border outline-none bg-transparent text-sm dark:border-stone-800 border-stone-200"
                        />
                      </div>

                      {/* Buy Button */}
                      <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow-md hover:shadow-gold-500/15 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles size={14} />
                        <span>Confirm Purchase - ${giftAmount}</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* QR MENU DOWNLOAD */}
              {modalType === "qr" && (
                <div className="text-center py-4">
                  <div className="flex items-center justify-center gap-3 mb-4 text-gold-500">
                    <QrCode size={28} />
                    <h3 className="font-serif text-2xl font-semibold dark:text-stone-100 text-stone-950">
                      Digital QR Menu
                    </h3>
                  </div>
                  
                  <p className="text-sm font-sans dark:text-stone-300 text-stone-700 leading-relaxed mb-6">
                    Scan or download our digital menu. Complete with nutritional cards, allergens, and local wine pairings updated this morning by the chef.
                  </p>

                  {/* QR Image Mock */}
                  <div className="w-48 h-48 bg-stone-100 dark:bg-stone-800 rounded-xl p-3 mx-auto mb-6 flex items-center justify-center border-2 border-dashed dark:border-stone-700 border-stone-300">
                    <div className="w-full h-full bg-white dark:bg-stone-950 rounded border border-stone-250 p-2 flex flex-col justify-center items-center">
                      {/* Styled SVG QR Code */}
                      <svg className="w-36 h-36 text-stone-900 dark:text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15h.008v.008H15V15zm0 2.25h.008v.008H15v-.008zM15 19.5h.008v.008H15v-.008zm2.25-2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM19.5 15h.008v.008H19.5V15zm0 2.25h.008v.008H19.5v-.008zM19.5 19.5h.008v.008H19.5v-.008zM13.5 13.5h.008v.008H13.5V13.5zm0 2.25H15M13.5 18h2.25M18 13.5h1.5" />
                      </svg>
                      <span className="text-[10px] text-stone-500 font-mono mt-1">L'Ambroisie QR-Menu</span>
                    </div>
                  </div>

                  <button
                    onClick={triggerQrDownload}
                    className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow-md hover:shadow-gold-500/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {qrDownloaded ? (
                      <>
                        <Check size={16} />
                        <span>Downloaded Menu PDF!</span>
                      </>
                    ) : (
                      <>
                        <QrCode size={16} />
                        <span>Download QR Menu PDF</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
