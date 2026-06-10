import React, { createContext, useContext, useState, useEffect } from "react";

export type PageTab =
  | "home"
  | "about"
  | "menu"
  | "reservation"
  | "gallery"
  | "events"
  | "blog"
  | "contact"
  | "admin";

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
    name: "Lord Evelyn Sinclair",
    email: "evelyn@sinclair.co.uk",
    phone: "+44 7911 123456",
    date: "2026-06-12",
    time: "20:00",
    guests: 4,
    preference: "Chef's Table",
    specialRequests: "Aniversary celebration. Prefer a quiet booth and premium wine pairing recommendation.",
    status: "approved",
    createdAt: "2026-06-10T11:00:00Z",
  },
  {
    id: "RES-7022",
    name: "Dr. Genevieve Moreau",
    email: "g.moreau@sorbonne.fr",
    phone: "+33 6 1234 5678",
    date: "2026-06-12",
    time: "21:30",
    guests: 2,
    preference: "Window View",
    specialRequests: "Gluten allergy for one guest.",
    status: "pending",
    createdAt: "2026-06-10T12:30:00Z",
  },
  {
    id: "RES-7023",
    name: "Marcus Aurelius",
    email: "marcus@meditations.org",
    phone: "+39 06 123456",
    date: "2026-06-13",
    time: "19:00",
    guests: 6,
    preference: "Private Salon",
    specialRequests: "No music in the background.",
    status: "pending",
    createdAt: "2026-06-10T14:15:00Z",
  },
  {
    id: "RES-7020",
    name: "Charlotte Laurent",
    email: "charlotte@laurent.com",
    phone: "+1 (555) 019-2834",
    date: "2026-06-09",
    time: "19:30",
    guests: 2,
    preference: "Bar Counter",
    status: "completed",
    createdAt: "2026-06-08T18:00:00Z",
  }
];

const initialOrders: OrderRecord[] = [
  {
    id: "ORD-9081",
    customerName: "Vivienne Westwood",
    phone: "+44 7911 888777",
    address: "Royal Suite 304, The Savoy, London",
    items: [
      {
        id: "m1",
        name: "Imperial Osetra Caviar",
        price: 240,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "m4",
        name: "Dry-Aged Wagyu Ribeye",
        price: 180,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80",
      }
    ],
    total: 600,
    date: "2026-06-10T15:20:00Z",
    status: "preparing",
  },
  {
    id: "ORD-9080",
    customerName: "Alistair Cook",
    phone: "+1 (555) 902-1200",
    address: "742 Evergreen Terrace, Springfield",
    items: [
      {
        id: "m2",
        name: "Glazed Truffle Salmon",
        price: 75,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "m6",
        name: "Valrhona Soufflé",
        price: 25,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80",
      }
    ],
    total: 125,
    date: "2026-06-10T14:05:00Z",
    status: "delivered",
  },
  {
    id: "ORD-9079",
    customerName: "Serena Williams",
    phone: "+1 (555) 304-4903",
    address: "Ocean Drive Penthouse B, Miami",
    items: [
      {
        id: "m3",
        name: "Truffle Fettuccine",
        price: 65,
        quantity: 4,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80",
      }
    ],
    total: 260,
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
    const tabs: PageTab[] = ["home", "about", "menu", "reservation", "gallery", "events", "blog", "contact", "admin"];
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
      const tabs: PageTab[] = ["home", "about", "menu", "reservation", "gallery", "events", "blog", "contact", "admin"];
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
