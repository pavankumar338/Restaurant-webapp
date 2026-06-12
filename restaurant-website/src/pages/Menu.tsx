import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Search, Heart, ShoppingBag, Plus, Minus, X, Info, Check, AlertCircle, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "Fried Chicken" | "Pizzas & Rolls" | "Combos" | "Desserts & Drinks";
  image: string;
  isPopular?: boolean;
  isVegetarian: boolean;
  ingredients: string[];
  pairing: string;
  allergens: string[];
}

const menuItems: MenuItem[] = [
  // --- FRIED CHICKEN ---
  {
    id: "fc1",
    name: "Popcorn (Small)",
    price: 129,
    description: "Crispy bite-sized pieces of chicken breast seasoned in our signature spices.",
    category: "Fried Chicken",
    image: "menu/popcorn_chicken.png",
    isVegetarian: false,
    ingredients: ["Fresh Chicken Chunks", "Crispy Coating", "Special Seasoning Spice"],
    pairing: "Mint Mojito Mocktail",
    allergens: ["Gluten"],
  },
  {
    id: "fc2",
    name: "Popcorn (Medium)",
    price: 239,
    description: "Crispy bite-sized pieces of chicken breast seasoned in our signature spices.",
    category: "Fried Chicken",
    image: "menu/popcorn_chicken.png",
    isVegetarian: false,
    ingredients: ["Fresh Chicken Chunks", "Crispy Coating", "Special Seasoning Spice"],
    pairing: "Mint Mojito Mocktail",
    allergens: ["Gluten"],
  },
  {
    id: "fc3",
    name: "Popcorn (Large)",
    price: 329,
    description: "Crispy bite-sized pieces of chicken breast seasoned in our signature spices.",
    category: "Fried Chicken",
    image: "menu/popcorn_chicken.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["Fresh Chicken Chunks", "Crispy Coating", "Special Seasoning Spice"],
    pairing: "Mint Mojito Mocktail",
    allergens: ["Gluten"],
  },
  {
    id: "fc4",
    name: "Strips (4 Pcs)",
    price: 119,
    description: "Crispy seasoned tender chicken breast strips deep-fried to perfection.",
    category: "Fried Chicken",
    image: "menu/chicken_strips.png",
    isVegetarian: false,
    ingredients: ["Tender Chicken Breast Strips", "Flour Dredging", "Secret Spices"],
    pairing: "Ferro Automatic Shake",
    allergens: ["Gluten"],
  },
  {
    id: "fc5",
    name: "Strips (8 Pcs)",
    price: 229,
    description: "Crispy seasoned tender chicken breast strips deep-fried to perfection.",
    category: "Fried Chicken",
    image: "menu/chicken_strips.png",
    isVegetarian: false,
    ingredients: ["Tender Chicken Breast Strips", "Flour Dredging", "Secret Spices"],
    pairing: "Ferro Automatic Shake",
    allergens: ["Gluten"],
  },
  {
    id: "fc6",
    name: "Strips (12 Pcs)",
    price: 339,
    description: "Crispy seasoned tender chicken breast strips deep-fried to perfection.",
    category: "Fried Chicken",
    image: "menu/chicken_strips.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["Tender Chicken Breast Strips", "Flour Dredging", "Secret Spices"],
    pairing: "Ferro Automatic Shake",
    allergens: ["Gluten"],
  },
  {
    id: "fc7",
    name: "Wings (5 Pcs)",
    price: 129,
    description: "Crispy crunchy double-breaded chicken wings, perfect for sharing.",
    category: "Fried Chicken",
    image: "menu/chicken_wings.png",
    isVegetarian: false,
    ingredients: ["Juicy Chicken Wings", "Crispy Breadcrumbs Coating", "Chili Seasoning"],
    pairing: "Kit Kat Shake with Brownie",
    allergens: ["Gluten"],
  },
  {
    id: "fc8",
    name: "Wings (10 Pcs)",
    price: 249,
    description: "Crispy crunchy double-breaded chicken wings, perfect for sharing.",
    category: "Fried Chicken",
    image: "menu/chicken_wings.png",
    isVegetarian: false,
    ingredients: ["Juicy Chicken Wings", "Crispy Breadcrumbs Coating", "Chili Seasoning"],
    pairing: "Kit Kat Shake with Brownie",
    allergens: ["Gluten"],
  },
  {
    id: "fc9",
    name: "Wings (15 Pcs)",
    price: 359,
    description: "Crispy crunchy double-breaded chicken wings, perfect for sharing.",
    category: "Fried Chicken",
    image: "menu/chicken_wings.png",
    isVegetarian: false,
    ingredients: ["Juicy Chicken Wings", "Crispy Breadcrumbs Coating", "Chili Seasoning"],
    pairing: "Kit Kat Shake with Brownie",
    allergens: ["Gluten"],
  },
  {
    id: "fc10",
    name: "Lollipops (4 Pcs)",
    price: 119,
    description: "Indo-Chinese style crispy deep-fried chicken lollipops.",
    category: "Fried Chicken",
    image: "menu/chicken_lollipops.png",
    isVegetarian: false,
    ingredients: ["Chicken Lollipop Wings", "Corn Flour", "Spicy Indo-Chinese Ginger-Garlic Sauce"],
    pairing: "Oreo Shake",
    allergens: ["Gluten", "Soy"],
  },
  {
    id: "fc11",
    name: "Lollipops (8 Pcs)",
    price: 229,
    description: "Indo-Chinese style crispy deep-fried chicken lollipops.",
    category: "Fried Chicken",
    image: "menu/chicken_lollipops.png",
    isVegetarian: false,
    ingredients: ["Chicken Lollipop Wings", "Corn Flour", "Spicy Indo-Chinese Ginger-Garlic Sauce"],
    pairing: "Oreo Shake",
    allergens: ["Gluten", "Soy"],
  },
  {
    id: "fc12",
    name: "Lollipops (12 Pcs)",
    price: 339,
    description: "Indo-Chinese style crispy deep-fried chicken lollipops.",
    category: "Fried Chicken",
    image: "menu/chicken_lollipops.png",
    isVegetarian: false,
    ingredients: ["Chicken Lollipop Wings", "Corn Flour", "Spicy Indo-Chinese Ginger-Garlic Sauce"],
    pairing: "Oreo Shake",
    allergens: ["Gluten", "Soy"],
  },
  {
    id: "fc13",
    name: "Legs (2 Pcs)",
    price: 139,
    description: "Super crunchy golden chicken drumsticks.",
    category: "Fried Chicken",
    image: "menu/chicken_legs.png",
    isVegetarian: false,
    ingredients: ["Meaty Chicken Drumsticks", "Spicy Flour Coating", "Fry Daddy Seasoning"],
    pairing: "Belgium Chocolate Shake",
    allergens: ["Gluten"],
  },
  {
    id: "fc14",
    name: "Legs (4 Pcs)",
    price: 269,
    description: "Super crunchy golden chicken drumsticks.",
    category: "Fried Chicken",
    image: "menu/chicken_legs.png",
    isVegetarian: false,
    ingredients: ["Meaty Chicken Drumsticks", "Spicy Flour Coating", "Fry Daddy Seasoning"],
    pairing: "Belgium Chocolate Shake",
    allergens: ["Gluten"],
  },
  {
    id: "fc15",
    name: "Legs (6 Pcs)",
    price: 399,
    description: "Super crunchy golden chicken drumsticks.",
    category: "Fried Chicken",
    image: "menu/chicken_legs.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["Meaty Chicken Drumsticks", "Spicy Flour Coating", "Fry Daddy Seasoning"],
    pairing: "Belgium Chocolate Shake",
    allergens: ["Gluten"],
  },

  // --- PIZZAS & ROLLS ---
  {
    id: "pz1",
    name: "Veg Pizza (4\")",
    price: 99,
    description: "Hot 4-inch personal pizza loaded with onions, tomatoes, sweet corn, green peppers, and rich mozzarella cheese.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Onions", "Tomatoes", "Capsicum", "Sweet Corn", "Mozzarella Cheese"],
    pairing: "Mango Allophone Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz2",
    name: "Veg Pizza (8\")",
    price: 179,
    description: "Hot 8-inch medium pizza loaded with onions, tomatoes, sweet corn, green peppers, and rich mozzarella cheese.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Onions", "Tomatoes", "Capsicum", "Sweet Corn", "Mozzarella Cheese"],
    pairing: "Mango Allophone Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz3",
    name: "Onion Pizza (4\")",
    price: 109,
    description: "Fresh 4-inch personal-sized pizza topped with sweet onions and melted cheese.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Red Onions", "Pizza Sauce", "Double Mozzarella Cheese"],
    pairing: "Butterscotch Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz4",
    name: "Onion Pizza (8\")",
    price: 179,
    description: "Fresh 8-inch medium-sized pizza topped with sweet onions and melted cheese.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Red Onions", "Pizza Sauce", "Double Mozzarella Cheese"],
    pairing: "Butterscotch Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz5",
    name: "Corn Pizza (4\")",
    price: 109,
    description: "Personal 4-inch pizza topped with sweet golden corn kernels and loaded mozzarella.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Golden Sweet Corn", "Pizza Sauce", "Mozzarella Cheese"],
    pairing: "Kit Kat Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz6",
    name: "Corn Pizza (8\")",
    price: 199,
    description: "Medium 8-inch pizza topped with sweet golden corn kernels and loaded mozzarella.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Golden Sweet Corn", "Pizza Sauce", "Mozzarella Cheese"],
    pairing: "Kit Kat Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz7",
    name: "Paneer Pizza (4\")",
    price: 119,
    description: "Personal 4-inch pizza loaded with fresh paneer cubes, capsicum, and premium cheese.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Paneer Cubes", "Capsicum", "Tandoori Sauce", "Mozzarella Cheese"],
    pairing: "Oreo Shake with Brownie",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz8",
    name: "Paneer Pizza (8\")",
    price: 209,
    description: "Medium 8-inch pizza loaded with fresh paneer cubes, capsicum, and premium cheese.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Pizza Dough", "Paneer Cubes", "Capsicum", "Tandoori Sauce", "Mozzarella Cheese"],
    pairing: "Oreo Shake with Brownie",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz9",
    name: "Chicken Pizza (4\")",
    price: 119,
    description: "Personal 4-inch pizza loaded with seasoned shredded chicken and melted mozzarella.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Grilled Chicken Pieces", "Onions", "Mozzarella Cheese"],
    pairing: "Belgium Chocolate Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz10",
    name: "Chicken Pizza (8\")",
    price: 209,
    description: "Medium 8-inch pizza loaded with seasoned shredded chicken and melted mozzarella.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Grilled Chicken Pieces", "Onions", "Mozzarella Cheese"],
    pairing: "Belgium Chocolate Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz11",
    name: "Kaju Chicken Pizza (4\")",
    price: 139,
    description: "Personal 4-inch pizza loaded with premium cashew nuts (kaju), spiced grilled chicken, and extra cheese.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Spiced Chicken Chunks", "Toasted Cashew Nuts (Kaju)", "Onions", "Mozzarella Cheese"],
    pairing: "Coffee on the Rock",
    allergens: ["Gluten", "Dairy", "Nuts"],
  },
  {
    id: "pz12",
    name: "Kaju Chicken Pizza (8\")",
    price: 229,
    description: "Medium 8-inch pizza loaded with premium cashew nuts (kaju), spiced grilled chicken, and extra cheese.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Spiced Chicken Chunks", "Toasted Cashew Nuts (Kaju)", "Onions", "Mozzarella Cheese"],
    pairing: "Coffee on the Rock",
    allergens: ["Gluten", "Dairy", "Nuts"],
  },
  {
    id: "pz13",
    name: "Schezwan Chicken Pizza (4\")",
    price: 119,
    description: "Spicy personal 4-inch pizza with schezwan grilled chicken, capsicum, and fiery sauce.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Schezwan Spiced Chicken", "Capsicum", "Red Chili Flakes", "Mozzarella Cheese"],
    pairing: "Kit Kat Shake",
    allergens: ["Gluten", "Dairy", "Soy"],
  },
  {
    id: "pz14",
    name: "Schezwan Chicken Pizza (8\")",
    price: 209,
    description: "Spicy medium 8-inch pizza with schezwan grilled chicken, capsicum, and fiery sauce.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Schezwan Spiced Chicken", "Capsicum", "Red Chili Flakes", "Mozzarella Cheese"],
    pairing: "Kit Kat Shake",
    allergens: ["Gluten", "Dairy", "Soy"],
  },
  {
    id: "pz15",
    name: "Tandoori Chicken Pizza (4\")",
    price: 119,
    description: "Personal 4-inch pizza with smoky clay-oven baked tandoori chicken chunks and fresh onions.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Clay-Oven Tandoori Chicken Chunks", "Red Onions", "Green Chilies", "Mozzarella Cheese"],
    pairing: "Oreo Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz16",
    name: "Tandoori Chicken Pizza (8\")",
    price: 209,
    description: "Medium 8-inch pizza with smoky clay-oven baked tandoori chicken chunks and fresh onions.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Clay-Oven Tandoori Chicken Chunks", "Red Onions", "Green Chilies", "Mozzarella Cheese"],
    pairing: "Oreo Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz17",
    name: "Fry Daddy Spl. Mix Pizza (4\")",
    price: 129,
    description: "Signature personal 4-inch pizza loaded with a special mix of veggies and choice chicken.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Mixed Spicy Chicken", "Paneer Cubes", "Sweet Corn", "Onions", "Double Mozzarella Cheese"],
    pairing: "Choco Chips Shake with Brownie",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz18",
    name: "Fry Daddy Spl. Mix Pizza (8\")",
    price: 219,
    description: "Signature medium 8-inch pizza loaded with a special mix of veggies and choice chicken.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_pizza.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["Pizza Dough", "Mixed Spicy Chicken", "Paneer Cubes", "Sweet Corn", "Onions", "Double Mozzarella Cheese"],
    pairing: "Choco Chips Shake with Brownie",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz19",
    name: "Extra Cheese (4\")",
    price: 39,
    description: "An extra blanket of premium bubbling mozzarella cheese for 4\" pizza.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Additional Layer of Rich Premium Mozzarella Cheese"],
    pairing: "Enhances any Pizza!",
    allergens: ["Dairy"],
  },
  {
    id: "pz20",
    name: "Extra Cheese (8\")",
    price: 59,
    description: "An extra blanket of premium bubbling mozzarella cheese for 8\" pizza.",
    category: "Pizzas & Rolls",
    image: "menu/veg_pizza.png",
    isVegetarian: true,
    ingredients: ["Additional Layer of Rich Premium Mozzarella Cheese"],
    pairing: "Enhances any Pizza!",
    allergens: ["Dairy"],
  },
  {
    id: "pz21",
    name: "Veg Roll",
    price: 79,
    description: "Fresh tortilla wrap loaded with mixed vegetables, herbs, and mild sauces.",
    category: "Pizzas & Rolls",
    image: "menu/veg_roll.png",
    isVegetarian: true,
    ingredients: ["Wheat Flatbread", "Shredded Cabbage", "Carrots", "Bell Peppers", "Creamy Dressing"],
    pairing: "Coffee on the Rock",
    allergens: ["Gluten"],
  },
  {
    id: "pz22",
    name: "Paneer Roll",
    price: 99,
    description: "Tortilla wrap loaded with spiced cottage cheese cubes, onions, and mint chutney.",
    category: "Pizzas & Rolls",
    image: "menu/veg_roll.png",
    isVegetarian: true,
    ingredients: ["Wheat Flatbread", "Marinated Paneer Cubes", "Sliced Onions", "Green Mint Chutney"],
    pairing: "Mango Allophone Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz23",
    name: "Corn Roll",
    price: 99,
    description: "Crispy wrap stuffed with golden sweet corn and seasoned vegetables.",
    category: "Pizzas & Rolls",
    image: "menu/veg_roll.png",
    isVegetarian: true,
    ingredients: ["Wheat Flatbread", "Sweet Corn", "Mashed Seasoned Veggies", "Mayonnaise"],
    pairing: "Butterscotch Shake",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "pz24",
    name: "Chicken Roll",
    price: 99,
    description: "Tortilla wrap stuffed with savory grilled chicken pieces and rich garlic dressing.",
    category: "Pizzas & Rolls",
    image: "menu/chicken_roll.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["Wheat Flatbread", "Spiced Roasted Chicken Pieces", "Sliced Onions", "Garlic Mayo Sauce"],
    pairing: "Belgium Chocolate Shake",
    allergens: ["Gluten", "Dairy"],
  },

  // --- COMBOS ---
  {
    id: "cb1",
    name: "Popcorn Combo",
    price: 249,
    description: "Regular chicken popcorn served with a portion of golden French fries and a refreshing mocktail.",
    category: "Combos",
    image: "menu/burger_combo.png",
    isVegetarian: false,
    ingredients: ["Regular Popcorn Chicken", "French Fries", "Mocktail Beverage"],
    pairing: "Complete meal in itself!",
    allergens: ["Gluten"],
  },
  {
    id: "cb2",
    name: "Wings Combo",
    price: 249,
    description: "5 crispy wings served with golden French fries and a refreshing mocktail.",
    category: "Combos",
    image: "menu/chicken_wings.png",
    isVegetarian: false,
    ingredients: ["5 Crispy Wings", "French Fries", "Mocktail Beverage"],
    pairing: "Complete meal in itself!",
    allergens: ["Gluten"],
  },
  {
    id: "cb3",
    name: "Legs Combo",
    price: 259,
    description: "2 crispy legs served with golden French fries and a refreshing mocktail.",
    category: "Combos",
    image: "menu/chicken_legs.png",
    isVegetarian: false,
    ingredients: ["2 Crispy Chicken Legs", "French Fries", "Mocktail Beverage"],
    pairing: "Complete meal in itself!",
    allergens: ["Gluten"],
  },
  {
    id: "cb4",
    name: "Burger Combo",
    price: 209,
    description: "Juicy burger served with golden French fries and a refreshing mocktail.",
    category: "Combos",
    image: "menu/burger_combo.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["Gourmet Burger", "French Fries", "Mocktail Beverage"],
    pairing: "Complete meal in itself!",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "cb5",
    name: "Fry Daddy Veg Combo",
    price: 299,
    description: "Feast of 1 small personal Veg Pizza, French fries, 1 Veg Sandwich, and 1 Veg Burger.",
    category: "Combos",
    image: "menu/veg_combo.png",
    isVegetarian: true,
    ingredients: ["Small Veg Pizza", "French Fries", "Veg Sandwich", "Veg Burger"],
    pairing: "Ideal Veg feast for sharing!",
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "cb6",
    name: "Super Saver Combo",
    price: 399,
    description: "5 Wings + 2 Legs + 4 Strips + French Fries.",
    category: "Combos",
    image: "menu/super_saver_combo.png",
    isVegetarian: false,
    ingredients: ["5 Wings", "2 Legs", "4 Strips", "French Fries"],
    pairing: "Great for two people!",
    allergens: ["Gluten"],
  },
  {
    id: "cb7",
    name: "Mega Saver Combo",
    price: 649,
    description: "10 Wings + 4 Legs + 4 Strips + French Fries.",
    category: "Combos",
    image: "menu/super_saver_combo.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["10 Wings", "4 Legs", "4 Strips", "French Fries"],
    pairing: "Great for family sharing!",
    allergens: ["Gluten"],
  },
  {
    id: "cb8",
    name: "Friends Saver Combo",
    price: 899,
    description: "15 Wings + 6 Legs + 4 Strips + French Fries.",
    category: "Combos",
    image: "menu/super_saver_combo.png",
    isVegetarian: false,
    ingredients: ["15 Wings", "6 Legs", "4 Strips", "French Fries"],
    pairing: "Perfect for party snacking!",
    allergens: ["Gluten"],
  },
  {
    id: "cb9",
    name: "Family Saver Combo",
    price: 999,
    description: "20 Wings + 6 Legs + 4 Strips + French Fries.",
    category: "Combos",
    image: "menu/super_saver_combo.png",
    isPopular: true,
    isVegetarian: false,
    ingredients: ["20 Wings", "6 Legs", "4 Strips", "French Fries"],
    pairing: "Ultimate group celebration feast!",
    allergens: ["Gluten"],
  },

  // --- DESSERTS & DRINKS (Ice Cream & Milkshakes) ---
  {
    id: "ds1",
    name: "Vennela Ice Cream",
    price: 60,
    description: "Classic rich and creamy vanilla bean ice cream.",
    category: "Desserts & Drinks",
    image: "menu/ice_cream_sundae.png",
    isVegetarian: true,
    ingredients: ["Vanilla Beans", "Fresh Milk Cream", "Sugar"],
    pairing: "Any hot combo",
    allergens: ["Dairy"],
  },
  {
    id: "ds2",
    name: "Mixed Brownie Ice Cream",
    price: 60,
    description: "Decadent vanilla ice cream mixed with dense chocolate brownie bits.",
    category: "Desserts & Drinks",
    image: "menu/ice_cream_sundae.png",
    isVegetarian: true,
    ingredients: ["Chocolate Brownie Bits", "Vanilla Ice Cream"],
    pairing: "Tandoori Pizza",
    allergens: ["Dairy", "Gluten"],
  },
  {
    id: "ds3",
    name: "Chocolate Fudge Ice Cream",
    price: 80,
    description: "Rich chocolate ice cream with thick chocolate fudge swirls.",
    category: "Desserts & Drinks",
    image: "menu/ice_cream_sundae.png",
    isVegetarian: true,
    ingredients: ["Premium Cocoa", "Fudge Sauce", "Cream"],
    pairing: "French Fries",
    allergens: ["Dairy"],
  },
  {
    id: "ds4",
    name: "Butterscotch Fudge Ice Cream",
    price: 80,
    description: "Creamy butterscotch ice cream with crunchies and fudge drizzle.",
    category: "Desserts & Drinks",
    image: "menu/ice_cream_sundae.png",
    isVegetarian: true,
    ingredients: ["Butterscotch Crunchies", "Fudge Drizzle", "Cream"],
    pairing: "Onion Pizza",
    allergens: ["Dairy"],
  },
  {
    id: "ds5",
    name: "Dryfruit Sunday Ice Cream",
    price: 120,
    description: "Luxurious sundae topped with rich dry fruits, nuts, and syrup.",
    category: "Desserts & Drinks",
    image: "menu/ice_cream_sundae.png",
    isPopular: true,
    isVegetarian: true,
    ingredients: ["Almonds", "Cashews", "Syrup", "Mixed Ice Cream Scoops"],
    pairing: "Great for celebrations",
    allergens: ["Dairy", "Nuts"],
  },
  {
    id: "ds6",
    name: "Belgium Chocolate Shake",
    price: 70,
    description: "Indulgent thick shake made with authentic Belgian cocoa.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Belgian Cocoa", "Milk", "Vanilla Ice Cream Base"],
    pairing: "Spicy Strips",
    allergens: ["Dairy"],
  },
  {
    id: "ds7",
    name: "Small Done Vanilla Shake",
    price: 70,
    description: "Classic creamy vanilla milkshake, served chilled.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Vanilla Extract", "Milk", "Ice Cream Base"],
    pairing: "Wings Combo",
    allergens: ["Dairy"],
  },
  {
    id: "ds8",
    name: "Ferro Automatic Shake",
    price: 70,
    description: "Delectable milkshake blended with rich hazelnut chocolate flavor.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Hazelnut Spread", "Chocolate Syrup", "Milk", "Ice Cream Base"],
    pairing: "Chicken Roll",
    allergens: ["Dairy", "Nuts"],
  },
  {
    id: "ds9",
    name: "Mango Allophone Shake",
    price: 70,
    description: "Creamy refreshing shake made with Alphonso mango pulp.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Alphonso Mango Pulp", "Milk", "Vanilla Ice Cream"],
    pairing: "Paneer Roll",
    allergens: ["Dairy"],
  },
  {
    id: "ds10",
    name: "Butterscotch Shake",
    price: 70,
    description: "Delicious milkshake with rich butterscotch syrup and crunch.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Butterscotch Syrup", "Crunch Pieces", "Milk"],
    pairing: "Popcorn Chicken",
    allergens: ["Dairy"],
  },
  {
    id: "ds11",
    name: "Coffee on the Rock",
    price: 70,
    description: "Rich cold coffee shake served chilled with a hint of espresso.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Espresso Shot", "Milk", "Vanilla Ice Cream Base"],
    pairing: "Veg Roll",
    allergens: ["Dairy"],
  },
  {
    id: "ds12",
    name: "Kit Kat Shake",
    price: 90,
    description: "Thick shake blended with crushed Kit Kat chocolate bars.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Kit Kat Chocolate", "Milk", "Ice Cream"],
    pairing: "French Fries",
    allergens: ["Dairy", "Gluten"],
  },
  {
    id: "ds13",
    name: "Kit Kat Shake with Brownie",
    price: 100,
    description: "Kit Kat thick shake loaded with soft chocolate brownie pieces.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Kit Kat Chocolate", "Brownie Pieces", "Milk", "Ice Cream"],
    pairing: "Chicken Wings",
    allergens: ["Dairy", "Gluten"],
  },
  {
    id: "ds14",
    name: "Oreo Shake",
    price: 90,
    description: "Thick shake blended with crushed Oreo cookies.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Oreo Biscuits", "Milk", "Vanilla Ice Cream Base"],
    pairing: "Veg Pizza",
    allergens: ["Dairy", "Gluten"],
  },
  {
    id: "ds15",
    name: "Oreo Shake with Brownie",
    price: 100,
    description: "Oreo shake loaded with hot chocolate brownie crumbs.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isPopular: true,
    isVegetarian: true,
    ingredients: ["Oreo Biscuits", "Brownie Crumbs", "Milk", "Ice Cream"],
    pairing: "Chicken Pizza",
    allergens: ["Dairy", "Gluten"],
  },
  {
    id: "ds16",
    name: "Dry Fruit Shake",
    price: 100,
    description: "Nutritious and rich milkshake blended with almonds, cashews, and raisins.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Almonds", "Cashews", "Raisins", "Milk", "Vanilla Ice Cream"],
    pairing: "Great healthy treat",
    allergens: ["Dairy", "Nuts"],
  },
  {
    id: "ds17",
    name: "Black Current Shake",
    price: 90,
    description: "Tangy sweet blackcurrant flavored thick milkshake.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isVegetarian: true,
    ingredients: ["Blackcurrant Syrup", "Fresh Cream", "Milk"],
    pairing: "Burger Combo",
    allergens: ["Dairy"],
  },
  {
    id: "ds18",
    name: "Choco Chips Shake with Brownie",
    price: 120,
    description: "Ultimate indulgence featuring crunchy chocolate chips and double chocolate brownie.",
    category: "Desserts & Drinks",
    image: "menu/milkshake_glass.png",
    isPopular: true,
    isVegetarian: true,
    ingredients: ["Chocolate Chips", "Double Chocolate Brownie", "Chocolate Fudge Sauce", "Milk"],
    pairing: "Fry Daddy Special Pizza",
    allergens: ["Dairy", "Gluten"],
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

  const categories = ["All", "Fried Chicken", "Pizzas & Rolls", "Combos", "Desserts & Drinks"];

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
            Palnadu's Favorite Gourmet Fast Food & Cafe
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl dark:text-stone-100 text-stone-950 mt-2 font-normal">
            Our Delicious Menu
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
          <div className="flex flex-nowrap gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
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
                placeholder="Search burgers, pizzas, chicken..."
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
                      <span className="font-serif text-lg font-bold text-gold-500">₹{item.price}</span>
                    </div>
                    <p className="text-xs font-sans dark:text-stone-400 text-stone-600 leading-relaxed mt-2.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t dark:border-stone-800 border-stone-100">
                    <button
                      onClick={() => setActiveDetailItem(item)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-stone-950 text-xs font-sans font-bold uppercase tracking-wider rounded border border-gold-400 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <Info size={14} />
                      <span>View Details</span>
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
                {activeDetailItem.category} • ₹{activeDetailItem.price}
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
                      Our kitchen has received your order. Preparing your delicious fast-food using fresh quality ingredients.
                    </p>
                    <p className="text-xs text-gold-500 font-mono">ESTIMATED FULFILLMENT: 25 MINUTES</p>
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
                              <span className="text-xs text-gold-500 font-semibold">₹{item.price}</span>
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
                                  placeholder="Pavan Kumar"
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
                                  placeholder="+91 98765 43210"
                                  className="w-full mt-1 px-3 py-2 text-xs rounded border outline-none bg-transparent dark:border-stone-800 border-stone-250"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Delivery / Table Address</label>
                              <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Srinagar, Vinukonda"
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
                                Place Order - ₹{cartTotal}
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm font-sans">
                              <span>Subtotal</span>
                              <span className="font-semibold">₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm font-sans">
                              <span>Taxes & Charges (5%)</span>
                              <span className="font-semibold">₹{Math.round(cartTotal * 0.05)}</span>
                            </div>
                            <div className="flex justify-between text-base font-serif border-t dark:border-stone-800 border-stone-200 pt-3 text-gold-500 font-bold">
                              <span>Total Amount</span>
                              <span>₹{Math.round(cartTotal * 1.05)}</span>
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
