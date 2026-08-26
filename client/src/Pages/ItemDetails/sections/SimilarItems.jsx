import ItemCard from "../../../components/cards/ItemCard";

const SimilarItems = ({ items = [] }) => {
  if (!items.length) {
    return <div className="clay text-ink/55">No similar items found nearby.</div>;
  }

  return (
    <div>
      <h2 className="mb-5 font-display text-xl font-bold text-ink sm:mb-6 sm:text-2xl">
        Similar Items
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;
