const MarketplaceHeader = () => {
  return (
    <section className="page-shell pt-4 sm:pt-6">
      <div className="clay-accent px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14">
        <p className="section-kicker text-white/60">Sustainable fashion</p>

        <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]">
          Discover clothes ready
          <br />
          for their next story
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">
          Browse quality clothing shared by our community. Exchange instead of
          buying new and help reduce textile waste.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { value: "500+", label: "Items Listed" },
            { value: "200+", label: "Successful Swaps" },
            { value: "50+", label: "Cities" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
            >
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                {stat.value}
              </h2>
              <p className="text-sm text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHeader;
