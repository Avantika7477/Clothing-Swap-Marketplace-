import { Link } from "react-router-dom";

const SwapAction = () => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">
        Ready to Swap?
      </h2>

      <p className="text-gray-600 mb-6">
        Send a swap request to the owner or save this item for
        later.
      </p>

      <div className="space-y-3">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition font-semibold">
          Request Swap
        </button>

        <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl transition font-semibold">
          Save Item
        </button>

        <Link
          to="/marketplace"
          className="block text-center w-full border py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Back to Marketplace
        </Link>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
        <p className="text-sm text-green-700">
          🌱 Every successful swap helps reduce textile waste and
          supports sustainable fashion.
        </p>
      </div>
    </div>
  );
};

export default SwapAction;