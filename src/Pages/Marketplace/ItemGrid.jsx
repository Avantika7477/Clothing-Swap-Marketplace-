import ItemCard from "../../components/cards/ItemCard";

const items = [
  {
    id: 1,
    image: "/images/items/denim-jacket.jpg",
    title: "Denim Jacket",
    brand: "Levi's",
    size: "M",
    condition: "Like New",
    location: "Mohali",
    swapValue: 180,
  },
  {
    id: 2,
    image: "/images/items/hoodie.jpg",
    title: "Black Hoodie",
    brand: "Nike",
    size: "L",
    condition: "Excellent",
    location: "Chandigarh",
    swapValue: 220,
  },
  {
    id: 3,
    image: "/images/items/jeans.jpg",
    title: "Slim Fit Jeans",
    brand: "Wrangler",
    size: "32",
    condition: "Good",
    location: "Delhi",
    swapValue: 160,
  },
  {
    id: 4,
    image: "/images/items/shirt.jpg",
    title: "Formal Shirt",
    brand: "Allen Solly",
    size: "M",
    condition: "New",
    location: "Pune",
    swapValue: 200,
  },
  {
    id: 5,
    image: "/images/items/tshirt.jpg",
    title: "Graphic T-Shirt",
    brand: "H&M",
    size: "L",
    condition: "Like New",
    location: "Jaipur",
    swapValue: 140,
  },
  {
    id: 6,
    image: "/images/items/shoes.jpg",
    title: "Running Shoes",
    brand: "Adidas",
    size: "9",
    condition: "Excellent",
    location: "Bangalore",
    swapValue: 300,
  },
];

const ItemGrid = () => {
  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Latest Listings</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            image={item.image}
            title={item.title}
            brand={item.brand}
            size={item.size}
            condition={item.condition}
            location={item.location}
            swapValue={item.swapValue}
            onSwap={() => console.log("Swap:", item.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default ItemGrid;
