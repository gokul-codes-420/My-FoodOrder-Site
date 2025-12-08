import butterChicken from "@assets/stock_images/butter_chicken_india_aecc02ac.jpg";
import biryani from "@assets/stock_images/chicken_biryani_indi_2216b987.jpg";
import dosa from "@assets/stock_images/masala_dosa_south_in_4f2a1fbd.jpg";
import paneer from "@assets/stock_images/paneer_tikka_kebab_f5513555.jpg";
import samosa from "@assets/stock_images/samosa_indian_snack_60bb26ba.jpg";
import feast from "@assets/stock_images/delicious_indian_foo_171055a3.jpg";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "Starters" | "Main Course" | "Breads" | "Desserts" | "Beverages";
  image: string;
  veg: boolean;
};

// Use the downloaded stock images mapped to categories/items
const IMAGES = {
  curry: butterChicken,
  biryani: biryani,
  starter: paneer,
  bread: feast, // Using feast image as fallback for bread for now
  dessert: dosa, // Using dosa image as fallback for dessert contextually
  drink: samosa, // Using samosa as fallback
  samosa: samosa,
  dosa: dosa
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken cooked in a rich, creamy tomato sauce.",
    price: 320,
    category: "Main Course",
    image: IMAGES.curry,
    veg: false,
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with spiced chicken and herbs.",
    price: 280,
    category: "Main Course",
    image: IMAGES.biryani,
    veg: false,
  },
  {
    id: 3,
    name: "Veg Biryani",
    description: "Fragrant rice dish with mixed vegetables and exotic spices.",
    price: 220,
    category: "Main Course",
    image: IMAGES.biryani,
    veg: true,
  },
  {
    id: 4,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection.",
    price: 240,
    category: "Starters",
    image: IMAGES.starter,
    veg: true,
  },
  {
    id: 5,
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a smooth spinach gravy.",
    price: 260,
    category: "Main Course",
    image: IMAGES.curry,
    veg: true,
  },
  {
    id: 6,
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked with butter and spices.",
    price: 200,
    category: "Main Course",
    image: IMAGES.curry,
    veg: true,
  },
  {
    id: 7,
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with fried puffy bread.",
    price: 180,
    category: "Main Course",
    image: IMAGES.curry,
    veg: true,
  },
  {
    id: 8,
    name: "Rajma Chawal",
    description: "Comforting red kidney bean curry served with steamed rice.",
    price: 160,
    category: "Main Course",
    image: IMAGES.curry,
    veg: true,
  },
  {
    id: 9,
    name: "Masala Dosa",
    description: "Crispy fermented crepe filled with spiced potato mash.",
    price: 150,
    category: "Main Course",
    image: IMAGES.dosa,
    veg: true,
  },
  {
    id: 10,
    name: "Idli Sambar",
    description: "Steamed rice cakes served with lentil stew and coconut chutney.",
    price: 120,
    category: "Starters",
    image: IMAGES.dosa,
    veg: true,
  },
  {
    id: 11,
    name: "Vada",
    description: "Crispy lentil donuts served with sambar and chutney.",
    price: 100,
    category: "Starters",
    image: IMAGES.samosa,
    veg: true,
  },
  {
    id: 12,
    name: "Samosa (2 pcs)",
    description: "Crispy pastry filled with spiced potatoes and peas.",
    price: 50,
    category: "Starters",
    image: IMAGES.samosa,
    veg: true,
  },
  {
    id: 13,
    name: "Tandoori Chicken",
    description: "Roasted chicken marinated in yogurt and spices.",
    price: 350,
    category: "Starters",
    image: IMAGES.starter,
    veg: false,
  },
  {
    id: 14,
    name: "Butter Naan",
    description: "Soft leavened bread baked in a tandoor and brushed with butter.",
    price: 45,
    category: "Breads",
    image: IMAGES.bread,
    veg: true,
  },
  {
    id: 15,
    name: "Garlic Naan",
    description: "Naan bread topped with minced garlic and coriander.",
    price: 55,
    category: "Breads",
    image: IMAGES.bread,
    veg: true,
  },
  {
    id: 16,
    name: "Plain Roti",
    description: "Whole wheat flatbread cooked in a tandoor.",
    price: 25,
    category: "Breads",
    image: IMAGES.bread,
    veg: true,
  },
  {
    id: 17,
    name: "Pav Bhaji",
    description: "Spiced vegetable mash served with buttered soft bread rolls.",
    price: 160,
    category: "Main Course",
    image: IMAGES.samosa,
    veg: true,
  },
  {
    id: 18,
    name: "Vada Pav",
    description: "The Indian burger - spiced potato dumpling in a bun.",
    price: 40,
    category: "Starters",
    image: IMAGES.samosa,
    veg: true,
  },
  {
    id: 19,
    name: "Pani Puri",
    description: "Crispy hollow spheres filled with spicy tangy water.",
    price: 60,
    category: "Starters",
    image: IMAGES.samosa,
    veg: true,
  },
  {
    id: 20,
    name: "Gulab Jamun",
    description: "Deep-fried milk solids soaked in sugar syrup.",
    price: 90,
    category: "Desserts",
    image: IMAGES.dessert,
    veg: true,
  },
  {
    id: 21,
    name: "Rasgulla",
    description: "Soft cottage cheese balls soaked in chilled sugar syrup.",
    price: 90,
    category: "Desserts",
    image: IMAGES.dessert,
    veg: true,
  },
  {
    id: 22,
    name: "Jalebi",
    description: "Crispy spiral sweet dipped in saffron sugar syrup.",
    price: 80,
    category: "Desserts",
    image: IMAGES.dessert,
    veg: true,
  },
  {
    id: 23,
    name: "Lassi",
    description: "Refreshing yogurt-based drink, sweet or salted.",
    price: 80,
    category: "Beverages",
    image: IMAGES.drink,
    veg: true,
  },
  {
    id: 24,
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk.",
    price: 30,
    category: "Beverages",
    image: IMAGES.drink,
    veg: true,
  },
];
