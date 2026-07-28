import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Listing from "./models/Listing.js";
import SwapRequest from "./models/SwapRequest.js";
import Message from "./models/Message.js";
import { calculateSwapValue } from "./utils/swapValue.js";

dotenv.config();

const sampleUsers = [
  {
    fullName: "Rahul Sharma",
    email: "rahul@swap.com",
    password: "password123",
    location: "Mohali",
    city: "Mohali",
    phone: "9876543210",
    bio: "Minimal wardrobe enthusiast. Happy to swap jackets and denim.",
  },
  {
    fullName: "Priya Singh",
    email: "priya@swap.com",
    password: "password123",
    location: "Chandigarh",
    city: "Chandigarh",
    phone: "9876543211",
    bio: "Love sustainable fashion and sportswear swaps.",
  },
  {
    fullName: "Aman Verma",
    email: "aman@swap.com",
    password: "password123",
    location: "Delhi",
    city: "Delhi",
    phone: "9876543212",
    bio: "Casual shirts and office wear looking for a new home.",
  },
  {
    fullName: "Neha Kapoor",
    email: "neha@swap.com",
    password: "password123",
    location: "Jaipur",
    city: "Jaipur",
    phone: "9876543213",
    bio: "Dresses and summer wear — swap instead of shop.",
  },
  {
    fullName: "Karan Mehta",
    email: "karan@swap.com",
    password: "password123",
    location: "Mumbai",
    city: "Mumbai",
    phone: "9876543214",
    bio: "Sneaker collector open to fair swaps.",
  },
  {
    fullName: "Simran Kaur",
    email: "simran@swap.com",
    password: "password123",
    location: "Pune",
    city: "Pune",
    phone: "9876543215",
    bio: "Basics, tees, and everyday essentials.",
  },
];

const sampleListings = [
  {
    ownerEmail: "rahul@swap.com",
    title: "Classic Levi's Denim Jacket",
    description:
      "Timeless medium-wash denim jacket. Barely worn, no tears or stains. Perfect for layering in cooler weather.",
    brand: "Levi's",
    category: "Jackets",
    size: "M",
    condition: "Excellent",
    location: "Mohali",
    city: "Mohali",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
    ],
  },
  {
    ownerEmail: "priya@swap.com",
    title: "Nike Sports Hoodie",
    description:
      "Soft fleece hoodie in charcoal grey. Great for gym or casual wear. Fleece still fluffy.",
    brand: "Nike",
    category: "Hoodies",
    size: "L",
    condition: "Good",
    location: "Chandigarh",
    city: "Chandigarh",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    ],
  },
  {
    ownerEmail: "aman@swap.com",
    title: "Zara Cotton Casual Shirt",
    description:
      "Light blue oxford cotton shirt. Ideal for smart-casual looks. Washed twice only.",
    brand: "Zara",
    category: "Shirts",
    size: "S",
    condition: "Like New",
    location: "Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b81?w=800&q=80",
    ],
  },
  {
    ownerEmail: "neha@swap.com",
    title: "H&M Summer Floral Dress",
    description:
      "Breezy midi floral dress. Perfect for brunches and summer evenings. No fading.",
    brand: "H&M",
    category: "Dresses",
    size: "M",
    condition: "Excellent",
    location: "Jaipur",
    city: "Jaipur",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    ],
  },
  {
    ownerEmail: "karan@swap.com",
    title: "Adidas Ultraboost Sneakers",
    description:
      "White Ultraboost with light sole wear only. Comes with original box.",
    brand: "Adidas",
    category: "Shoes",
    size: "9",
    condition: "Good",
    location: "Mumbai",
    city: "Mumbai",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    ],
  },
  {
    ownerEmail: "simran@swap.com",
    title: "Uniqlo Basic White T-Shirt",
    description:
      "Premium cotton crew-neck tee. Soft hand-feel, no yellowing. Wardrobe staple.",
    brand: "Uniqlo",
    category: "T-Shirts",
    size: "L",
    condition: "Excellent",
    location: "Pune",
    city: "Pune",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
  },
  {
    ownerEmail: "rahul@swap.com",
    title: "Gap Slim Fit Jeans",
    description:
      "Dark indigo slim jeans. Comfortable stretch denim, gently used.",
    brand: "Gap",
    category: "Jeans",
    size: "32",
    condition: "Good",
    location: "Mohali",
    city: "Mohali",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    ],
  },
  {
    ownerEmail: "priya@swap.com",
    title: "Puma Running Jacket",
    description:
      "Lightweight windbreaker for morning runs. Reflective details intact.",
    brand: "Puma",
    category: "Jackets",
    size: "M",
    condition: "Like New",
    location: "Chandigarh",
    city: "Chandigarh",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
  },
  {
    ownerEmail: "neha@swap.com",
    title: "Ralph Lauren Knit Sweater",
    description:
      "Cream cable-knit sweater. Warm and cozy, dry-cleaned recently.",
    brand: "Ralph Lauren",
    category: "Sweaters",
    size: "S",
    condition: "Excellent",
    location: "Jaipur",
    city: "Jaipur",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
  },
  {
    ownerEmail: "aman@swap.com",
    title: "H&M Chino Pants",
    description:
      "Beige slim chinos for everyday office wear. Soft cotton blend.",
    brand: "H&M",
    category: "Pants",
    size: "30",
    condition: "Good",
    location: "Delhi",
    city: "Delhi",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    ],
  },
  {
    ownerEmail: "karan@swap.com",
    title: "Nike Air Force 1",
    description:
      "Classic white AF1s. Cleaned and ready to wear. Minor crease on toe box.",
    brand: "Nike",
    category: "Shoes",
    size: "10",
    condition: "Fair",
    location: "Mumbai",
    city: "Mumbai",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    ],
  },
  {
    ownerEmail: "simran@swap.com",
    title: "Zara Oversized Blazer",
    description:
      "Black structured blazer. Pairs well with jeans or dresses.",
    brand: "Zara",
    category: "Jackets",
    size: "M",
    condition: "Like New",
    location: "Pune",
    city: "Pune",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    ],
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      Message.deleteMany({}),
      SwapRequest.deleteMany({}),
      Listing.deleteMany({}),
      User.deleteMany({}),
    ]);

    const admin = await User.create({
      fullName: "Platform Admin",
      email: "admin@swap.com",
      password: "admin123",
      location: "Chandigarh",
      city: "Chandigarh",
      role: "admin",
      bio: "Marketplace administrator",
    });

    const users = await User.insertMany(sampleUsers);
    const userMap = Object.fromEntries(users.map((u) => [u.email, u]));

    const listings = await Listing.insertMany(
      sampleListings.map((item) => {
        const owner = userMap[item.ownerEmail];
        const { ownerEmail, ...rest } = item;
        return {
          ...rest,
          owner: owner._id,
          estimatedValue: calculateSwapValue({
            brand: item.brand,
            condition: item.condition,
            category: item.category,
          }),
          status: "available",
        };
      })
    );

    console.log("Seed complete");
    console.log(`Admin: admin@swap.com / admin123`);
    console.log(`Users: ${users.length} (password: password123)`);
    console.log(`Listings: ${listings.length}`);
    console.log(`Admin id: ${admin._id}`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
