import clothingData from "../../../assets/data/clothingData";
import ItemCard from "../../../components/cards/ItemCard";

const FeaturedItemsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-10">Featured Clothing</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clothingData.slice(0, 6).map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedItemsSection;
