import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="page-shell section-space pt-2 md:pt-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-moss-900 px-8 py-12 text-white sm:px-10 md:px-14 md:py-14"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #d9d2c8 0, transparent 42%), radial-gradient(circle at 88% 80%, #525252 0, transparent 36%)",
          }}
        />

        <div className="relative grid gap-8 md:grid-cols-[1.35fr_0.8fr] md:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker text-lichen/80">Start swapping</p>
            <h2 className="mt-3 font-display text-[1.85rem] font-medium leading-tight md:text-[2.45rem]">
              Your closet has a second chapter.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
              Swap unused clothes with people near you — keep good pieces
              circulating.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-start">
            <Link
              to="/register"
              className="inline-flex min-w-[210px] items-center justify-center rounded-lg bg-white px-6 py-3.5 text-center font-semibold text-moss-900 transition hover:bg-lichen"
            >
              Create your account
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center text-sm font-semibold text-lichen transition hover:text-white"
            >
              Browse marketplace →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
