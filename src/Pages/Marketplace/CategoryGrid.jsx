import CategoryCard from "../../components/cards/CategoryCard";

const categories = [
  {
    id: 1,
    title: "T-Shirts",
    image: "/images/categories/tshirt.jpg",
    items: 128,
  },
  {
    id: 2,
    title: "Jeans",
    image: "/images/categories/jeans.jpg",
    items: 96,
  },
  {
    id: 3,
    title: "Jackets",
    image: "/images/categories/jacket.jpg",
    items: 64,
  },
  {
    id: 4,
    title: "Hoodies",
    image: "/images/categories/hoodie.jpg",
    items: 82,
  },
  {
    id: 5,
    title: "Dresses",
    image: "/images/categories/dress.jpg",
    items: 57,
  },
  {
    id: 6,
    title: "Shoes",
    image: "/images/categories/shoes.jpg",
    items: 115,
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Browse Categories</h2>

        <p className="mt-2 text-gray-500">
          Find clothing by category and start swapping today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            items={category.items}
            onClick={() => console.log(category.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
