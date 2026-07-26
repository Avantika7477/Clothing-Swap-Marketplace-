import ItemCard from "../../components/cards/ItemCard";
import EmptyState from "./EmptyState";

const ItemGrid = ({ listings = [] }) => {
  if (!listings.length) {
    return <EmptyState />;
  }

  return (
    <section>
      <h2 className="mb-8 font-display text-3xl font-medium text-ink">
        Latest listings
      </h2>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((item) => (
          <ItemCard key={item._id || item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ItemGrid;
