import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../../../components/cards/ItemCard";
import { getListings } from "../../../services/clothingApi";

const FeaturedItemsSection = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getListings({ limit: 8, page: 1 });
        setListings(data.listings || []);
      } catch {
        setListings([]);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-moss-50/50">
      <div className="page-shell home-section">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="section-kicker">Featured</p>
            <h2 className="section-title mt-3">Best sellers</h2>
          </div>
          <Link
            to="/marketplace"
            className="text-sm font-bold uppercase tracking-wider text-moss-800 hover:underline"
          >
            View all products
          </Link>
        </div>

        {listings.length === 0 ? (
          <p className="section-copy text-center">
            No listings yet.{" "}
            <Link to="/add-item" className="font-semibold text-moss-800 hover:underline">
              List your first item
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {listings.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedItemsSection;
