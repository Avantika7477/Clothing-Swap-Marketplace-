const steps = [
  {
    title: "List Your Clothes",
    description: "Upload items you no longer wear.",
  },
  {
    title: "Find Matches",
    description: "Browse items from other users.",
  },
  {
    title: "Swap",
    description: "Exchange clothes and promote sustainability.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-xl p-6 shadow text-center"
            >
              <h3 className="font-bold text-xl mb-4">{step.title}</h3>

              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
