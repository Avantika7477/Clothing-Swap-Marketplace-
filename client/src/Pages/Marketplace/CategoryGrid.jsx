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
      <div className="mb-4 sm:mb-5">
        <p className="section-kicker">Browse</p>
        <h2 className="mt-2 font-display text-lg font-medium text-ink sm:text-xl">
          Quick categories
        </h2>
      </div>

      {/* Mobile: horizontal scroll; tablet+: grid */}
      <div className="scroll-x md:hidden">
        {categories.map((category) => {
          const active = selectedCategory === category.title;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                onSelectCategory?.(
                  active ? "All" : category.title
                )
              }
              className={`relative h-28 w-28 shrink-0 overflow-hidden border text-left transition ${
                active
                  ? "border-moss-800 ring-2 ring-moss-700"
                  : "border-moss-800/10"
              }`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-2 pt-6 text-xs font-bold text-white">
                {category.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const active = selectedCategory === category.title;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                onSelectCategory?.(
                  active ? "All" : category.title
                )
              }
              className={`group relative aspect-[3/4] w-full overflow-hidden border text-left transition ${
                active
                  ? "border-moss-800 ring-2 ring-moss-700"
                  : "border-moss-800/10"
              }`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 font-display text-base font-bold text-white drop-shadow-sm">
                {category.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
