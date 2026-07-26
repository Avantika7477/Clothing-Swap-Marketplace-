import ItemCard from "../../../components/cards/ItemCard";

const SimilarItems = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="bg-white shadow rounded-2xl p-6 text-gray-500">
        No similar items found nearby.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;
