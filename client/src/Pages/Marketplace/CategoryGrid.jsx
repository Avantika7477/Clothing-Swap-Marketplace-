import CategoryCard from "../../components/cards/CategoryCard";

const categories = [
  { id: 1, title: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: 2, title: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80" },
  { id: 3, title: "Jackets", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80" },
  { id: 4, title: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80" },
  { id: 5, title: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80" },
  { id: 6, title: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
];

const CategoryGrid = ({ selectedCategory, onSelectCategory }) => {
  return (
    <section className="py-2">
      <div className="mb-5">
        <p className="section-kicker">Browse</p>
        <h2 className="mt-2 font-display text-xl font-medium text-ink">
          Quick categories
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            active={selectedCategory === category.title}
            onClick={() =>
              onSelectCategory?.(
                selectedCategory === category.title ? "All" : category.title
              )
            }
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
