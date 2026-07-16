import clothingData from "../../../assets/data/clothingData";

const SwapValueCard = () => {
  const item = clothingData[0];

  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-green-700">Swap Value</h2>

      <div className="mt-6">
        <p className="text-gray-500">Estimated Points</p>

        <h3 className="text-5xl font-bold text-green-600 mt-2">{item.value}</h3>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Condition</span>

          <span className="font-semibold">{item.condition}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Category</span>

          <span className="font-semibold">{item.category}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Brand</span>

          <span className="font-semibold">{item.brand}</span>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl p-4 border">
        <p className="text-sm text-gray-600">
          💡 Higher quality clothing earns more swap points.
        </p>
      </div>
    </div>
  );
};

export default SwapValueCard;
