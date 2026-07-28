import denimJacket from "../images/denim-jacket.jpg";
import hoodie from "../images/hoodie.jpg";
import shirt from "../images/shirt.jpg";
import dress from "../images/dress.jpg";
import sneakers from "../images/sneakers.jpg";
import tshirt from "../images/tshirt.jpg";

const clothingData = [
  {
    id: 1,
    title: "Classic Denim Jacket",
    brand: "Levi's",
    category: "Jackets",
    size: "M",
    condition: "Excellent",
    value: 120,
    location: "Mohali",
    image: denimJacket,
    owner: "Rahul Sharma",
    available: true,
  },
  {
    id: 2,
    title: "Nike Sports Hoodie",
    brand: "Nike",
    category: "Hoodies",
    size: "L",
    condition: "Good",
    value: 95,
    location: "Chandigarh",
    image: hoodie,
    owner: "Priya Singh",
    available: true,
  },
  {
    id: 3,
    title: "Cotton Casual Shirt",
    brand: "Zara",
    category: "Shirts",
    size: "S",
    condition: "Like New",
    value: 85,
    location: "Delhi",
    image: shirt,
    owner: "Aman Verma",
    available: true,
  },
  {
    id: 4,
    title: "Summer Floral Dress",
    brand: "H&M",
    category: "Dresses",
    size: "M",
    condition: "Excellent",
    value: 130,
    location: "Jaipur",
    image: dress,
    owner: "Neha Kapoor",
    available: true,
  },
  {
    id: 5,
    title: "Adidas Sneakers",
    brand: "Adidas",
    category: "Shoes",
    size: "9",
    condition: "Good",
    value: 160,
    location: "Mumbai",
    image: sneakers,
    owner: "Karan Mehta",
    available: true,
  },
  {
    id: 6,
    title: "Basic White T-Shirt",
    brand: "Uniqlo",
    category: "T-Shirts",
    size: "L",
    condition: "Excellent",
    value: 60,
    location: "Pune",
    image: tshirt,
    owner: "Simran Kaur",
    available: true,
  },
];

export default clothingData;