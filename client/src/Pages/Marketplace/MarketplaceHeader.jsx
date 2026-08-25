const MarketplaceHeader = () => {
  return (
    <section className="page-shell pt-6">
      <div className="clay-accent relative overflow-hidden px-8 py-14 md:px-12 md:py-16">
        <div className="pointer-events-none absolute -right-8 top-0 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-camel/20 blur-2xl" />

        <div className="relative">
          <p className="section-kicker text-lichen">Sustainable fashion</p>

          <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            Discover clothes ready
            <br />
            for their next story
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Browse quality clothing shared by our community. Exchange instead of
            buying new and help reduce textile waste.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { value: "500+", label: "Items Listed" },
              { value: "200+", label: "Successful Swaps" },
              { value: "50+", label: "Cities" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border-2 border-white/25 bg-white/10 px-5 py-3 backdrop-blur-sm"
              >
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  {stat.value}
                </h2>
                <p className="text-sm text-lichen">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHeader;
