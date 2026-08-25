import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80";

const HeroSection = () => {
  return (
    <section className="relative min-h-[88vh] overflow-hidden px-4 pt-4 text-white md:px-6">
      <div className="relative min-h-[calc(88vh-1rem)] overflow-hidden rounded-[1.5rem] shadow-[8px_8px_24px_rgba(140,150,155,0.28)] md:rounded-[2rem]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <img
            src={HERO_IMAGE}
            alt="Clothes hanging on a rail, ready to swap"
            className="h-full w-full object-cover object-[center_30%]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-moss-950/80 via-moss-900/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-950/50 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(88vh-1rem)] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 sm:px-6 md:justify-center md:px-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Fashion Swap
            </p>

            <h1 className="mt-5 font-display text-[1.65rem] font-bold leading-[1.15] text-white sm:text-[2rem] md:text-[2.35rem]">
              Give clothes another life, not a landfill.
            </h1>

            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/75 sm:text-base">
              List what you no longer wear, match by value and place, and swap
              directly with people nearby.
            </p>

            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
            >
              <Link
                to="/marketplace"
                className="btn-premium min-h-12 rounded-2xl border border-white/30 bg-white px-7 py-3.5 text-base font-bold text-moss-900 hover:bg-moss-50"
              >
                Browse swaps
              </Link>
              <Link to="/register" className="btn-ghost min-h-12 px-7 py-3.5 text-base">
                Start swapping
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
