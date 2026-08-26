import { getImageUrl } from "../../../services/api";

const OwnerInformation = ({ owner }) => {
  if (!owner) {
    return (
      <div className="clay text-ink/55">Owner information unavailable.</div>
    );
  }

  return (
    <div className="clay">
      <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
        Owner Information
      </h2>

      <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
        <img
          src={getImageUrl(owner.avatar)}
          alt={owner.fullName}
          className="h-20 w-20 shrink-0 rounded-full border border-moss-800/10 object-cover"
        />

        <div className="min-w-0 space-y-2">
          <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
            {owner.fullName}
          </h3>
          <p className="text-ink/55">
            {owner.location || owner.city || "Location not set"}
          </p>
          <p className="text-sm font-medium text-moss-800">
            {owner.swapCount ?? 0} completed swaps
          </p>
          {owner.bio ? (
            <p className="max-w-2xl break-words leading-relaxed text-ink/65">
              {owner.bio}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OwnerInformation;
