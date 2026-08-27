import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ItemCard from "../../../components/cards/ItemCard";
import { getListings } from "../../../services/clothingApi";

const FeaturedItemsSection = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getListings({ limit: 6, page: 1 });
        setListings(data.listings || []);
      } catch {
        setListings([]);
      }
    };
    load();
  }, []);

  return (
    <section className="page-shell home-section">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="max-w-lg">
          <p className="section-kicker">New arrivals</p>
          <h2 className="section-title mt-3">Fresh on the rack</h2>
          <p className="section-copy mt-3">
            Recently listed pieces ready to swap.
          </p>
        </div>
        <Link
          to="/marketplace"
          className="hidden text-sm font-semibold text-moss-800 transition hover:text-moss-700 sm:inline"
        >
          View marketplace →
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="section-copy">
          No listings yet. Be the first to{" "}
          <Link to="/add-item" className="font-semibold text-moss-800 hover:underline">
            list an item
          </Link>
          .
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ItemCard item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedItemsSection;
