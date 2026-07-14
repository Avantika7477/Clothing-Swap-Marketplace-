import Button from "../../components/common/Button";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 shadow-md">
      <div className="text-7xl">🧥</div>

      <h2 className="mt-6 text-3xl font-bold text-gray-800">
        No Clothing Found
      </h2>

      <p className="mt-3 max-w-md text-center text-gray-500">
        We couldn't find any clothing items matching your search or filters. Try
        changing the category, location, or search keywords.
      </p>

      <div className="mt-8">
        <Button>Browse All Items</Button>
      </div>
    </div>
  );
};

export default EmptyState;
