const SwapValueCard = ({ listing }) => {
  const value = listing?.estimatedValue ?? listing?.value ?? 0;

  return (
    <div className="clay p-6">
      <h2 className="font-display text-2xl font-bold text-moss-800">Swap value</h2>

      <div className="mt-6">
        <p className="text-ink/55">Estimated points</p>
        <h3 className="mt-2 font-display text-5xl font-bold text-moss-800">{value}</h3>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-ink/55">Condition</span>
          <span className="font-semibold">{listing.condition}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-ink/55">Category</span>
          <span className="font-semibold">{listing.category}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-ink/55">Brand</span>
          <span className="font-semibold">{listing.brand}</span>
        </div>
      </div>

      <div className="clay-inset mt-8 p-4">
        <p className="text-sm text-ink/60">
          Higher quality clothing earns more swap points and better match suggestions.
        </p>
      </div>
    </div>
  );
};

export default SwapValueCard;
