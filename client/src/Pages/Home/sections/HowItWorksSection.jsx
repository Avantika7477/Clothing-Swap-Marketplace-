const steps = [
  {
    step: "01",
    title: "List what you outgrew",
    description: "Upload photos, size, brand, and condition. We estimate a fair swap value.",
  },
  {
    step: "02",
    title: "Match nearby",
    description: "Browse listings by category and location, then send a swap request.",
  },
  {
    step: "03",
    title: "Negotiate & exchange",
    description: "Chat details, agree on meetup or courier, and complete the swap.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="border-y border-moss-800/10 bg-moss-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl font-medium md:text-4xl">
          How swapping works
        </h2>
        <p className="mt-3 max-w-xl text-lichen/90">
          A simple barter flow built for wearable clothes — not another storefront.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((item) => (
            <div key={item.step} className="border-t border-white/20 pt-6">
              <p className="font-display text-sm tracking-[0.2em] text-lichen">
                {item.step}
              </p>
              <h3 className="mt-4 font-display text-2xl font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
