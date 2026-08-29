import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80";

const HeroSection = () => {
  return (
    <section className="grid min-h-[70vh] lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-moss-50 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <p className="section-kicker">New season swaps</p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
          Shop pre-loved fashion. Swap what you don&apos;t wear.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/60">
          Browse quality clothing from people near you. List items, match by
          value, and exchange — no purchase required.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/marketplace" className="btn-premium btn-premium-primary">
            Shop all
          </Link>
          <Link
            to="/register"
            className="btn-premium btn-premium-secondary"
          >
            Start selling
          </Link>
        </div>
      </div>

      <div className="relative min-h-[40vh] lg:min-h-0">
        <img
          src={HERO_IMAGE}
          alt="Clothes ready to swap"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
