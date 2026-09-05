import ItemCard from "../../components/cards/ItemCard";
import EmptyState from "./EmptyState";

const ItemGrid = ({ listings = [] }) => {
  if (!listings.length) {
    return <EmptyState />;
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-3 sm:mb-8">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Latest listings
        </h2>
        <p className="shrink-0 text-sm text-ink/45">
          {listings.length} item{listings.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {listings.map((item) => (
          <ItemCard key={item._id || item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ItemGrid;
