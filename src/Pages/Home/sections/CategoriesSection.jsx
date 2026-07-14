const categories = [
  "Men",
  "Women",
  "Kids",
  "Shoes",
  "Accessories",
  "Winter Wear",
];

const CategoriesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="font-semibold">{category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
