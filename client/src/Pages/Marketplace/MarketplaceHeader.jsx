const MarketplaceHeader = () => {
  return (
    <section className="border-b border-moss-800/10 bg-moss-50">
      <div className="page-shell py-8 sm:py-12">
        <p className="section-kicker">Shop</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink sm:text-4xl">
          All products
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/60 sm:text-base">
          Browse pre-loved clothing listed by our community. Filter by category,
          size, and location to find your next swap.
        </p>
      </div>
    </section>
  );
};

export default MarketplaceHeader;
