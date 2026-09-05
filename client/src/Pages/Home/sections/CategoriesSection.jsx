import { Link } from "react-router-dom";

const categories = [
  {
    title: "Jackets",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
  },
  {
    title: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
  },
  {
    title: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  },
  {
    title: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
];

const CategoriesSection = () => {
  return (
    <section className="page-shell home-section">
      <div className="mb-8 text-center">
        <p className="section-kicker">Collections</p>
        <h2 className="section-title mt-3">Shop by category</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
        {categories.map((category) => (
          <Link
            key={category.title}
            to="/marketplace"
            state={{ category: category.title }}
            className="store-collection-card group"
          >
            <img
              src={category.image}
              alt={category.title}
              className="transition duration-300 group-hover:opacity-90"
            />
            <h3>{category.title}</h3>
            <p>Shop now</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
