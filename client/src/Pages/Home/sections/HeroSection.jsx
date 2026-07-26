import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80";

const HeroSection = () => {
  return (
    <section className="relative min-h-[88vh] overflow-hidden text-white">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <img
          src={HERO_IMAGE}
          alt="Hanging clothes ready to swap"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-moss-950/90 via-moss-900/75 to-moss-800/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-moss-950/50 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="font-display text-4xl font-medium tracking-tight text-lichen sm:text-5xl md:text-6xl">
            Fashion Swap
          </p>

          <h1 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            Swap clothes. Keep the planet wearing less waste.
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            List what you no longer wear, match by value and location, and
            exchange directly — no checkout, no new production.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/marketplace" className="btn-primary bg-white text-moss-900 hover:bg-lichen">
              Browse swaps
            </Link>
            <Link to="/register" className="btn-ghost">
              Start swapping
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
