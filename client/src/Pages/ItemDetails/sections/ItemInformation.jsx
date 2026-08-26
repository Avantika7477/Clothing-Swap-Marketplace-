const ItemInformation = ({ listing }) => {
  const available = listing?.status
    ? listing.status === "available"
    : listing?.available;

  return (
    <div className="clay">
      <span className="inline-block rounded-lg bg-moss-100 px-3 py-1.5 text-sm font-medium text-moss-800">
        {listing.category}
      </span>

      <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {listing.title}
      </h1>

      <p className="mt-3 text-ink/60">
        Brand:
        <span className="ml-2 font-semibold text-ink">{listing.brand}</span>
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {[
          { label: "Size", value: listing.size },
          { label: "Condition", value: listing.condition },
          { label: "Location", value: listing.location },
          {
            label: "Availability",
            value: available ? "Available" : "Not Available",
            tone: available ? "text-moss-800" : "text-red-600",
          },
        ].map((row) => (
          <div key={row.label} className="clay-inset">
            <p className="text-sm text-ink/55">{row.label}</p>
            <p className={`mt-1.5 font-semibold ${row.tone || "text-ink"}`}>
              {row.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 border-t border-moss-800/10 pt-6">
        <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
          Description
        </h3>
        <p className="mt-3 leading-7 text-ink/65">
          {listing.description ||
            "This clothing item is listed for swapping through Fashion Swap. It is well maintained and perfect for supporting sustainable fashion."}
        </p>
      </div>
    </div>
  );
};

export default ItemInformation;
