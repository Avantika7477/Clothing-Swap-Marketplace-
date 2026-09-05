import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80";

const HeroSection = () => {
  return (
    <section className="grid min-h-[65vh] lg:min-h-[70vh] lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-moss-50 px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
        <p className="section-kicker">New season swaps</p>
        <h1 className="mt-3 font-display text-[1.75rem] font-bold leading-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
          Shop pre-loved fashion. Swap what you don&apos;t wear.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60 sm:mt-5 sm:text-base">
          Browse quality clothing from people near you. List items, match by
          value, and exchange — no purchase required.
        </p>
        <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link
            to="/marketplace"
            className="btn-premium btn-premium-primary w-full sm:w-auto"
          >
            Shop all
          </Link>
          <Link
            to="/register"
            className="btn-premium btn-premium-secondary w-full sm:w-auto"
          >
            Start selling
          </Link>
        </div>
      </div>

      <div className="relative min-h-[36vh] sm:min-h-[40vh] lg:min-h-0">
        <img
          src={HERO_IMAGE}
          alt="Clothes ready to swap"
          className="absolute inset-0 h-full w-full object-cover lg:static lg:h-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
