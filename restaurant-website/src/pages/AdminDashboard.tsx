import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Users, Calendar, DollarSign, Check, X, Plus, Trash2, ShoppingCart } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const {
    theme,
    reservations,
    updateReservationStatus,
    orders,
    updateOrderStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<"reservations" | "orders" | "menu" | "customers">("reservations");

  // Menu Management Mock State (CRUD Demo)
  const [mockMenuItems, setMockMenuItems] = useState([
    { id: "m1", name: "Imperial Osetra Caviar", price: 240, category: "Appetizers" },
    { id: "m2", name: "Glazed Truffle Salmon", price: 75, category: "Entrées" },
    { id: "m3", name: "Truffle Fettuccine", price: 65, category: "Entrées" },
    { id: "m4", name: "Dry-Aged Wagyu Ribeye", price: 180, category: "Entrées" },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Entrées");

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    const item = {
      id: `m-${Date.now()}`,
      name: newItemName,
      price: Number(newItemPrice),
      category: newItemCategory,
    };
    setMockMenuItems([...mockMenuItems, item]);
    setNewItemName("");
    setNewItemPrice("");
  };

  const handleDeleteMenuItem = (id: string) => {
    setMockMenuItems(mockMenuItems.filter((item) => item.id !== id));
  };

  // Performance calculations
  const pendingReservations = reservations.filter((r) => r.status === "pending").length;
  const activeOrdersCount = orders.filter((o) => o.status === "pending" || o.status === "preparing").length;
  const totalRevenue = orders.reduce((sum, o) => o.status === "completed" || o.status === "delivered" ? sum + o.total : sum, 0) + 1240; // seed base

  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 1. Header & Quick Analytics */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl dark:text-stone-100 text-stone-950 font-normal">
              Managerial Dashboard
            </h1>
            <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider font-semibold">
              Live Restaurant Operations Monitor
            </p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>System Operational</span>
            </span>
          </div>
        </div>

        {/* 2. Analytics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue */}
          <div className={`p-6 rounded-2xl border flex items-center justify-between shadow-lg ${
            theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
          }`}>
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wide font-semibold">Fulfillment Revenue</span>
              <h3 className="font-serif text-2xl font-bold dark:text-white text-stone-950 mt-1">${totalRevenue}</h3>
              <p className="text-[10px] text-emerald-500 mt-1 font-semibold">▲ +14% compared to yesterday</p>
            </div>
            <div className="p-3.5 rounded-xl bg-gold-500/10 text-gold-500">
              <DollarSign size={22} />
            </div>
          </div>

          {/* Pending Reservations */}
          <div className={`p-6 rounded-2xl border flex items-center justify-between shadow-lg ${
            theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
          }`}>
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wide font-semibold">Pending Bookings</span>
              <h3 className="font-serif text-2xl font-bold dark:text-white text-stone-950 mt-1">{pendingReservations}</h3>
              <p className="text-[10px] text-stone-500 mt-1 font-semibold">Needs attention</p>
            </div>
            <div className="p-3.5 rounded-xl bg-gold-500/10 text-gold-500">
              <Calendar size={22} />
            </div>
          </div>

          {/* Active Orders */}
          <div className={`p-6 rounded-2xl border flex items-center justify-between shadow-lg ${
            theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
          }`}>
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wide font-semibold">Active Orders</span>
              <h3 className="font-serif text-2xl font-bold dark:text-white text-stone-950 mt-1">{activeOrdersCount}</h3>
              <p className="text-[10px] text-gold-500 mt-1 font-semibold">In preparation queue</p>
            </div>
            <div className="p-3.5 rounded-xl bg-gold-500/10 text-gold-500">
              <ShoppingCart size={22} />
            </div>
          </div>

          {/* Diners database */}
          <div className={`p-6 rounded-2xl border flex items-center justify-between shadow-lg ${
            theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
          }`}>
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wide font-semibold">Loyal Database</span>
              <h3 className="font-serif text-2xl font-bold dark:text-white text-stone-950 mt-1">{reservations.length * 3 + 12}</h3>
              <p className="text-[10px] text-emerald-500 mt-1 font-semibold">▲ +2 registered today</p>
            </div>
            <div className="p-3.5 rounded-xl bg-gold-500/10 text-gold-500">
              <Users size={22} />
            </div>
          </div>
        </div>

        {/* 3. Analytics Charts (SVG Lines & Bars) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Sparkline Graph */}
          <div className={`lg:col-span-8 p-6 rounded-2xl border shadow-lg flex flex-col justify-between ${
            theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
          }`}>
            <div>
              <h3 className="font-serif text-lg font-bold dark:text-stone-100 text-stone-950">Revenue Analytics</h3>
              <p className="text-xs text-stone-500 font-sans">Hourly credit card receipts breakdown</p>
            </div>
            
            {/* Custom SVG Line Chart */}
            <div className="w-full h-48 mt-6">
              <svg className="w-full h-full text-gold-500" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(212,175,55,0.2)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,130 C50,110 80,70 120,80 C160,90 200,40 240,50 C280,60 320,10 360,20 C400,30 450,110 500,100 L500,150 L0,150 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,130 C50,110 80,70 120,80 C160,90 200,40 240,50 C280,60 320,10 360,20 C400,30 450,110 500,100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Horizontal grid guide lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(128,128,128,0.1)" strokeDasharray="5,5" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(128,128,128,0.1)" strokeDasharray="5,5" />
              </svg>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-stone-500 uppercase tracking-widest font-sans mt-4 font-semibold">
              <span>12:00</span>
              <span>15:00</span>
              <span>18:00</span>
              <span>21:00</span>
              <span>23:00</span>
            </div>
          </div>

          {/* Bookings Capacity Bar Chart */}
          <div className={`lg:col-span-4 p-6 rounded-2xl border shadow-lg flex flex-col justify-between ${
            theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
          }`}>
            <div>
              <h3 className="font-serif text-lg font-bold dark:text-stone-100 text-stone-950">Bookings Load</h3>
              <p className="text-xs text-stone-500 font-sans">Reservations booked per service day</p>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="w-full h-48 mt-6 flex items-end justify-between px-2">
              {[60, 80, 45, 95, 30].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-8">
                  <div
                    className="w-full rounded bg-gradient-to-t from-gold-600 to-gold-500 transition-all duration-1000"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-stone-500 uppercase tracking-widest font-sans mt-4 font-semibold">
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* 4. Tab selection */}
        <div className="flex gap-2 border-b dark:border-stone-950 border-stone-200 pb-2">
          {[
            { label: "Bookings", id: "reservations" },
            { label: "Live Orders", id: "orders" },
            { label: "Menu CRUD", id: "menu" },
            { label: "Loyalty Register", id: "customers" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? "border-gold-500 text-gold-500"
                  : "border-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 5. Active Tab Details */}
        <div className="w-full">
          
          {/* TAB 1: RESERVATIONS LIST */}
          {activeTab === "reservations" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b dark:border-stone-850 border-stone-200 text-stone-500 uppercase tracking-wider font-bold">
                    <th className="pb-3">Reference</th>
                    <th className="pb-3">Guest Name</th>
                    <th className="pb-3">Date/Time</th>
                    <th className="pb-3">Diners</th>
                    <th className="pb-3">Seating</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-stone-850 divide-stone-150">
                  {reservations.map((r) => (
                    <tr key={r.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/20">
                      <td className="py-4 font-mono font-semibold text-gold-500">{r.id}</td>
                      <td className="py-4 font-semibold dark:text-stone-250 text-stone-850">
                        <div>{r.name}</div>
                        <div className="text-[10px] text-stone-500 font-normal mt-0.5">{r.phone}</div>
                      </td>
                      <td className="py-4 font-medium">
                        {r.date} @ {r.time}
                      </td>
                      <td className="py-4 font-semibold">{r.guests} Guests</td>
                      <td className="py-4">{r.preference}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          r.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : r.status === "rejected"
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : r.status === "completed"
                            ? "bg-stone-500/10 text-stone-400 border-stone-500/20"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {r.status === "pending" && (
                          <div className="flex gap-1 justify-end">
                            <button
                              onClick={() => updateReservationStatus(r.id, "approved")}
                              className="p-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white cursor-pointer"
                              title="Approve"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => updateReservationStatus(r.id, "rejected")}
                              className="p-1 rounded bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white cursor-pointer"
                              title="Reject"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: LIVE ORDERS OVERVIEW */}
          {activeTab === "orders" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className={`p-6 rounded-xl border flex flex-col justify-between space-y-4 shadow-md ${
                    theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
                  }`}
                >
                  <div className="flex justify-between items-baseline border-b dark:border-stone-850 border-stone-100 pb-3">
                    <span className="font-mono text-sm font-bold text-gold-500">{o.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      o.status === "preparing"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        : o.status === "delivered"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : o.status === "completed"
                        ? "bg-stone-500/10 text-stone-400 border-stone-500/20"
                        : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    }`}>
                      {o.status}
                    </span>
                  </div>

                  <div className="space-y-2 font-sans text-xs">
                    <div>
                      <span className="text-stone-500 font-semibold uppercase">Customer</span>
                      <p className="font-bold mt-0.5 dark:text-stone-300 text-stone-850">{o.customerName}</p>
                    </div>
                    {o.address && (
                      <div>
                        <span className="text-stone-500 font-semibold uppercase">Delivery Address</span>
                        <p className="mt-0.5 text-stone-400">{o.address}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-stone-500 font-semibold uppercase">Dishes Ordered</span>
                      <ul className="mt-1 list-disc pl-4 space-y-1">
                        {o.items.map((i, idx) => (
                          <li key={idx} className="dark:text-stone-300 text-stone-750">
                            {i.name} <strong className="text-gold-500">x{i.quantity}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t dark:border-stone-850 border-stone-100">
                    <span className="font-serif text-base font-bold text-gold-500">${o.total}</span>
                    
                    <div className="flex gap-2">
                      {o.status === "pending" && (
                        <button
                          onClick={() => updateOrderStatus(o.id, "preparing")}
                          className="px-3 py-1.5 bg-amber-500 text-stone-950 font-semibold rounded text-[10px] uppercase tracking-wider cursor-pointer"
                        >
                          Prepare
                        </button>
                      )}
                      {o.status === "preparing" && (
                        <button
                          onClick={() => updateOrderStatus(o.id, "delivered")}
                          className="px-3 py-1.5 bg-blue-505 text-white bg-blue-650 font-semibold rounded text-[10px] uppercase tracking-wider cursor-pointer"
                        >
                          Ship
                        </button>
                      )}
                      {o.status === "delivered" && (
                        <button
                          onClick={() => updateOrderStatus(o.id, "completed")}
                          className="px-3 py-1.5 bg-emerald-500 text-stone-950 font-semibold rounded text-[10px] uppercase tracking-wider cursor-pointer"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MENU CRUD MANAGEMENT */}
          {activeTab === "menu" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Insert Form */}
              <form
                onSubmit={handleAddMenuItem}
                className={`lg:col-span-4 p-6 rounded-xl border space-y-4 shadow-md ${
                  theme === "dark" ? "bg-stone-900 border-stone-850" : "bg-white border-stone-200"
                }`}
              >
                <h3 className="font-serif text-lg font-bold dark:text-stone-100 text-stone-950 mb-3">Add Menu Plate</h3>
                
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Plate Name</label>
                  <input
                    type="text"
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Truffled Foie Gras"
                    className="w-full mt-1.5 px-3 py-2 text-xs rounded border outline-none bg-transparent dark:border-stone-800 border-stone-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="85"
                    className="w-full mt-1.5 px-3 py-2 text-xs rounded border outline-none bg-transparent dark:border-stone-800 border-stone-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 text-xs rounded border outline-none bg-transparent dark:border-stone-800 border-stone-200 text-white"
                  >
                    {["Appetizers", "Entrées", "Desserts", "Cellar Selection"].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-stone-950 font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-400 shadow shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus size={14} />
                  <span>Insert Dish</span>
                </button>
              </form>

              {/* Items List */}
              <div className="lg:col-span-8 overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b dark:border-stone-850 border-stone-200 text-stone-500 uppercase tracking-wider font-bold">
                      <th className="pb-3">Dish Name</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-stone-850 divide-stone-150">
                    {mockMenuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/20">
                        <td className="py-4 font-semibold dark:text-stone-250 text-stone-850">{item.name}</td>
                        <td className="py-4 text-stone-500">{item.category}</td>
                        <td className="py-4 font-bold text-gold-500">${item.price}</td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => handleDeleteMenuItem(item.id)}
                            className="p-1 rounded bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS DATABASE */}
          {activeTab === "customers" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b dark:border-stone-850 border-stone-200 text-stone-500 uppercase tracking-wider font-bold">
                    <th className="pb-3">Diner Name</th>
                    <th className="pb-3">Contact Email</th>
                    <th className="pb-3">Joined Program</th>
                    <th className="pb-3">Loyalty Level</th>
                    <th className="pb-3 text-right">Loyalty Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-stone-850 divide-stone-150">
                  {reservations.map((r, i) => (
                    <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-900/20">
                      <td className="py-4 font-semibold dark:text-stone-250 text-stone-850 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center font-bold text-gold-500">
                          {r.name[0]}
                        </div>
                        <span>{r.name}</span>
                      </td>
                      <td className="py-4">{r.email}</td>
                      <td className="py-4">{r.createdAt.split("T")[0]}</td>
                      <td className="py-4 font-semibold">
                        {r.guests > 4 ? (
                          <span className="text-gold-500 uppercase tracking-wide">Grand Cru Gold</span>
                        ) : (
                          <span className="text-stone-400">Epicure Bronze</span>
                        )}
                      </td>
                      <td className="py-4 text-right font-mono font-bold dark:text-stone-200 text-stone-850">
                        {r.guests * 120} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
