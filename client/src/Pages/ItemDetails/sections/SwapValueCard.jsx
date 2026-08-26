const SwapValueCard = ({ listing }) => {
  const value = listing?.estimatedValue ?? listing?.value ?? 0;

  return (
    <div className="clay">
      <h2 className="font-display text-xl font-bold text-moss-800 sm:text-2xl">
        Swap value
      </h2>

      <div className="mt-5">
        <p className="text-sm text-ink/55">Estimated points</p>
        <h3 className="mt-2 font-display text-4xl font-bold text-moss-800 sm:text-5xl">
          {value}
        </h3>
      </div>

      <div className="mt-6">
        <div className="detail-row">
          <span className="detail-label">Condition</span>
          <span className="detail-value">{listing.condition}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Category</span>
          <span className="detail-value">{listing.category}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Brand</span>
          <span className="detail-value">{listing.brand}</span>
        </div>
      </div>

      <div className="clay-inset mt-7">
        <p className="text-sm leading-relaxed text-ink/60">
          Higher quality clothing earns more swap points and better match
          suggestions.
        </p>
      </div>
    </div>
  );
};

export default SwapValueCard;
