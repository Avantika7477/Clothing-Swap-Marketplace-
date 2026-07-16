import clothingData from "../../assets/data/clothingData";
import ItemCard from "../../components/cards/ItemCard";

const ItemGrid = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Listings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clothingData.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ItemGrid;
