import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <section className="page-shell section-space">
      <div className="mb-9 max-w-lg">
        <p className="section-kicker">Browse</p>
        <h2 className="section-title mt-3">Browse by wardrobe</h2>
        <p className="section-copy mt-3">
          Find pieces near you and start a fair swap in a few taps.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
          >
            <Link
              to="/marketplace"
              state={{ category: category.title }}
              className="clay clay-media group relative block aspect-[4/5] overflow-hidden transition duration-300 hover:-translate-y-1"
            >
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-950/75 via-moss-950/10 to-transparent" />
              <h3 className="absolute bottom-5 left-5 right-5 font-display text-[1.35rem] font-bold text-white sm:text-[1.55rem]">
                {category.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
