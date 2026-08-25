import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80";

const HeroSection = () => {
  return (
    <section className="relative min-h-[88vh] overflow-hidden px-4 pt-4 text-white md:px-6">
      <div className="relative min-h-[calc(88vh-1rem)] overflow-hidden rounded-[2rem] shadow-[12px_12px_32px_rgba(163,177,198,0.45),-8px_-8px_24px_rgba(255,255,255,0.55)] md:rounded-[2.5rem]">
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

        <div className="absolute inset-0 bg-gradient-to-r from-moss-950/85 via-moss-900/50 to-moss-800/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-950/55 via-transparent to-moss-800/20" />

        {/* Soft clay blobs */}
        <motion.div
          className="pointer-events-none absolute -right-16 top-20 h-48 w-48 rounded-full bg-lichen/25 blur-2xl"
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-24 left-10 h-36 w-36 rounded-full bg-camel/20 blur-2xl"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(88vh-1rem)] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="font-display text-4xl font-bold tracking-tight text-lichen sm:text-5xl md:text-[3.35rem]">
              Fashion Swap
            </p>

            <h1 className="mt-5 font-display text-[1.85rem] font-bold leading-[1.15] text-white sm:text-[2.15rem] md:text-[2.55rem]">
              Give clothes another life, not a landfill.
            </h1>

            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/80 sm:text-base">
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
                className="btn-premium rounded-[1.25rem] border-2 border-white/40 bg-white px-6 py-3.5 font-bold text-moss-900 shadow-[6px_6px_16px_rgba(0,0,0,0.2)] hover:bg-lichen"
              >
                Browse swaps
              </Link>
              <Link to="/register" className="btn-ghost">
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
