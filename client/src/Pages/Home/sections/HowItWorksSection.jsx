import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "List your item",
    description: "Add clear photos, size, brand, and condition.",
  },
  {
    step: "02",
    title: "Find a match",
    description: "Browse nearby pieces and send a swap request.",
  },
  {
    step: "03",
    title: "Swap easily",
    description: "Chat, agree, and exchange locally or by courier.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="page-shell section-space">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="section-kicker">How it works</p>
          <h2 className="section-title mt-3">Three calm steps to swap.</h2>
        </div>
        <p className="section-copy max-w-md md:text-right">
          Built for clothing exchange — not complicated resale.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="clay p-6 transition duration-300 hover:-translate-y-1"
          >
            <p className="font-display text-4xl font-bold text-moss-800/25 md:text-5xl">
              {item.step}
            </p>
            <h3 className="mt-3 font-display text-xl font-bold text-ink md:text-[1.35rem]">
              {item.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
