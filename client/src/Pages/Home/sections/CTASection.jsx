import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-moss-800 px-8 py-16 text-white sm:px-10 md:px-14 md:py-20">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lichen/20 blur-2xl" />
        <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lichen">
              Start swapping
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
              Your closet has a second chapter.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
              Join Fashion Swap and turn unused clothes into someone else’s next
              favorite piece — no payments, just fair exchanges.
            </p>
            <p className="mt-4 text-sm text-white/55">
              Free to join · Location matching · Negotiation chat
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-center font-semibold text-moss-900 transition hover:bg-lichen"
            >
              Create your account
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
            >
              Browse marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
