const steps = [
  {
    step: "01",
    title: "Browse the shop",
    description: "Explore listings by category, size, and location.",
  },
  {
    step: "02",
    title: "Request a swap",
    description: "Send an offer on items you want to exchange.",
  },
  {
    step: "03",
    title: "Complete locally",
    description: "Chat, agree, and swap in person or by courier.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="page-shell home-section">
      <div className="mb-8 text-center">
        <p className="section-kicker">How it works</p>
        <h2 className="section-title mt-3">Simple as online shopping</h2>
        <p className="section-copy mx-auto mt-3 max-w-lg">
          A familiar store experience — browse, select, and checkout with a swap
          instead of a payment.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((item) => (
          <div key={item.step} className="border border-moss-800/10 bg-white p-6 text-center">
            <p className="font-display text-3xl font-bold text-moss-800/20">
              {item.step}
            </p>
            <h3 className="mt-3 font-display text-lg font-bold text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
