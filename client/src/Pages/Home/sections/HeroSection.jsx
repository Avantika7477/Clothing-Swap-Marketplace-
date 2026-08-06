import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80";

const HeroSection = () => {
  return (
    <section className="relative min-h-[88vh] overflow-hidden text-white">
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

      <div className="absolute inset-0 bg-gradient-to-r from-moss-950/90 via-moss-900/62 to-moss-800/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-moss-950/50 via-transparent to-moss-950/15" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="font-display text-4xl font-medium tracking-tight text-lichen sm:text-5xl md:text-[3.35rem]">
            Fashion Swap
          </p>

          <h1 className="mt-5 font-display text-[1.85rem] font-medium leading-[1.15] text-white sm:text-[2.15rem] md:text-[2.55rem]">
            Give clothes another life, not a landfill.
          </h1>

          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/78 sm:text-base">
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
              className="btn-primary bg-white text-moss-900 hover:bg-lichen"
            >
              Browse swaps
            </Link>
            <Link to="/register" className="btn-ghost">
              Start swapping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
