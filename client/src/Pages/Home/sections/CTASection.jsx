import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="page-shell home-section">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
        className="clay-accent px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14"
      >
        <div className="grid gap-8 md:grid-cols-[1.35fr_0.8fr] md:items-end">
          <div className="max-w-2xl min-w-0">
            <p className="section-kicker text-white/60">Start swapping</p>
            <h2 className="mt-3 font-display text-[1.65rem] font-bold leading-tight sm:text-[1.85rem] md:text-[2.25rem]">
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
              className="btn-premium inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/25 bg-white px-7 py-3.5 text-base font-bold text-moss-900 hover:bg-moss-50 sm:w-auto sm:min-w-[220px]"
            >
              Create your account
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center text-sm font-semibold text-white/75 transition hover:text-white"
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
