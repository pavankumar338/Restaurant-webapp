import React, { createContext, useContext, useState, useEffect } from "react";

export type PageTab =
  | "home"
  | "about"
  | "menu"
  | "gallery"
  | "contact";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ReservationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  preference: string;
  specialRequests?: string;
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  address?: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "pending" | "preparing" | "delivered" | "completed";
}

interface AppContextProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  reservations: ReservationRecord[];
  addReservation: (record: Omit<ReservationRecord, "id" | "status" | "createdAt">) => void;
  updateReservationStatus: (id: string, status: ReservationRecord["status"]) => void;
  orders: OrderRecord[];
  addOrder: (customerName: string, phone: string, address: string) => void;
  updateOrderStatus: (id: string, status: OrderRecord["status"]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Premium Seed Data
const initialReservations: ReservationRecord[] = [
  {
    id: "RES-7021",
    name: "Pavan Kumar",
    email: "pavan@gmail.com",
    phone: "+91 98480 22338",
    date: "2026-06-12",
    time: "20:00",
    guests: 4,
    preference: "Window Table",
    specialRequests: "Birthday celebration. Prefer a quiet corner and recommendation for premium mocktails.",
    status: "approved",
    createdAt: "2026-06-10T11:00:00Z",
  },
  {
    id: "RES-7022",
    name: "Dr. Anusha Reddy",
    email: "anusha.reddy@gmail.com",
    phone: "+91 98765 43210",
    date: "2026-06-12",
    time: "21:30",
    guests: 2,
    preference: "Regular Seating",
    specialRequests: "No onions or garlic in the preparation.",
    status: "pending",
    createdAt: "2026-06-10T12:30:00Z",
  },
  {
    id: "RES-7023",
    name: "Rajesh Sharma",
    email: "rajesh@gmail.com",
    phone: "+91 99887 76655",
    date: "2026-06-13",
    time: "19:00",
    guests: 6,
    preference: "VIP Table",
    specialRequests: "Need high-speed Wi-Fi access.",
    status: "pending",
    createdAt: "2026-06-10T14:15:00Z",
  },
  {
    id: "RES-7020",
    name: "Sneha Latha",
    email: "sneha@gmail.com",
    phone: "+91 94401 23456",
    date: "2026-06-09",
    time: "19:30",
    guests: 2,
    preference: "Regular Seating",
    status: "completed",
    createdAt: "2026-06-08T18:00:00Z",
  }
];

const initialOrders: OrderRecord[] = [
  {
    id: "ORD-9081",
    customerName: "Pavan Kumar",
    phone: "+91 98480 22338",
    address: "Srinagar, Vinukonda, Palnadu",
    items: [
      {
        id: "m4",
        name: "Chicken Patty Burger",
        price: 99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "m1",
        name: "French Fries Masala",
        price: 69,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=300&q=80",
      }
    ],
    total: 267,
    date: "2026-06-10T15:20:00Z",
    status: "preparing",
  },
  {
    id: "ORD-9080",
    customerName: "Gopi Krishna",
    phone: "+91 91234 56789",
    address: "Beside RTC Bus Stand, Vinukonda",
    items: [
      {
        id: "m2",
        name: "Paneer Burger",
        price: 99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "m5",
        name: "Mint Mojito Mocktail",
        price: 59,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
      }
    ],
    total: 217,
    date: "2026-06-10T14:05:00Z",
    status: "delivered",
  },
  {
    id: "ORD-9079",
    customerName: "Kavitha Rani",
    phone: "+91 95500 12345",
    address: "Kothapeta, Vinukonda",
    items: [
      {
        id: "m3",
        name: "Veg Pizza (8\")",
        price: 179,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
      }
    ],
    total: 179,
    date: "2026-06-10T11:45:00Z",
    status: "completed",
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light" ? "light" : "dark";
  });

  const [activeTab, setActiveTabState] = useState<PageTab>(() => {
    // Read from window hash if available, else default to 'home'
    const hash = window.location.hash.replace("#", "") as PageTab;
    const tabs: PageTab[] = ["home", "about", "menu", "gallery", "contact"];
    return tabs.includes(hash) ? hash : "home";
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : ["m1", "m3"]; // default favorites
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [reservations, setReservations] = useState<ReservationRecord[]>(() => {
    const saved = localStorage.getItem("reservations");
    return saved ? JSON.parse(saved) : initialReservations;
  });
  
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Watch hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as PageTab;
      const tabs: PageTab[] = ["home", "about", "menu", "gallery", "contact"];
      if (tabs.includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const setActiveTab = (tab: PageTab) => {
    setActiveTabState(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sync theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Sync reservations
  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  // Sync orders
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const addReservation = (record: Omit<ReservationRecord, "id" | "status" | "createdAt">) => {
    const newRecord: ReservationRecord = {
      ...record,
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newRecord, ...prev]);
  };

  const updateReservationStatus = (id: string, status: ReservationRecord["status"]) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const addOrder = (customerName: string, phone: string, address?: string) => {
    if (cart.length === 0) return;
    const newOrder: OrderRecord = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      address,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (id: string, status: OrderRecord["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        favorites,
        toggleFavorite,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        reservations,
        addReservation,
        updateReservationStatus,
        orders,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
