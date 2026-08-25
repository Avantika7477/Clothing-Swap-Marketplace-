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
        className="clay-accent relative overflow-hidden px-8 py-12 sm:px-10 md:px-14 md:py-14"
      >
        <motion.div
          className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative grid gap-8 md:grid-cols-[1.35fr_0.8fr] md:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker text-lichen">Start swapping</p>
            <h2 className="mt-3 font-display text-[1.85rem] font-bold leading-tight md:text-[2.45rem]">
              Your closet has a second chapter.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
              Swap unused clothes with people near you — keep good pieces
              circulating.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-start">
            <Link
              to="/register"
              className="inline-flex min-w-[210px] items-center justify-center rounded-[1.25rem] border-2 border-white/40 bg-white px-6 py-3.5 text-center font-bold text-moss-900 shadow-[6px_6px_14px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:bg-lichen"
            >
              Create your account
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center text-sm font-bold text-lichen transition hover:text-white"
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
