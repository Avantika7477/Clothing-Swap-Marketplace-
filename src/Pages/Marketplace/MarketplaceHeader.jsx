const MarketplaceHeader = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="uppercase tracking-widest text-green-100 text-sm">
          Sustainable Fashion Marketplace
        </p>

        <h1 className="text-5xl font-bold mt-3">
          Discover Clothes Ready
          <br />
          For Their Next Story
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-green-100">
          Browse quality clothing shared by our community. Exchange instead of
          buying new and help reduce textile waste.
        </p>

        <div className="flex flex-wrap gap-8 mt-10">
          <div>
            <h2 className="text-3xl font-bold">500+</h2>
            <p className="text-green-100">Items Listed</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">200+</h2>
            <p className="text-green-100">Successful Swaps</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">50+</h2>
            <p className="text-green-100">Cities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHeader;
