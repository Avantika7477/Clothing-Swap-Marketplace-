import { getImageUrl } from "../../../services/api";

const OwnerInformation = ({ owner }) => {
  if (!owner) {
    return (
      <div className="bg-white shadow rounded-xl p-6 text-gray-500">
        Owner information unavailable.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-2xl p-6 border">
      <h2 className="text-2xl font-bold mb-6">Owner Information</h2>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <img
          src={getImageUrl(owner.avatar)}
          alt={owner.fullName}
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{owner.fullName}</h3>
          <p className="text-gray-500">
            {owner.location || owner.city || "Location not set"}
          </p>
          <p className="text-sm text-moss-800 font-medium">
            {owner.swapCount ?? 0} completed swaps
          </p>
          {owner.bio && <p className="text-gray-600 max-w-2xl">{owner.bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default OwnerInformation;
