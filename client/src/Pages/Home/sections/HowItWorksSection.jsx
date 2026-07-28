const steps = [
  {
    step: "01",
    title: "List your item",
    description: "Add photos, size, and condition.",
  },
  {
    step: "02",
    title: "Find a match",
    description: "Browse nearby pieces and send a request.",
  },
  {
    step: "03",
    title: "Swap easily",
    description: "Chat, agree, and exchange locally or by courier.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-4 md:py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-800/80">
            How it works
          </p>
          <h2 className="mt-3 font-display text-2xl font-medium text-ink md:text-[2rem]">
            Simple, calm, and fair.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink/80 md:text-base">
          A 3-step flow designed for easy clothing swaps, not complicated resale.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="surface rounded-3xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-moss-800/75">
                {item.step}
              </p>
              <h3 className="mt-4 font-display text-xl font-medium text-ink md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">
                {item.description}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
