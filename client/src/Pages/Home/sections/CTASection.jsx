import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-4 md:py-6">
      <div className="relative overflow-hidden border border-moss-800/10 bg-gradient-to-br from-white via-[#f3f5f2] to-moss-100 px-8 py-10 sm:px-10 md:px-14 md:py-12">
        <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-moss-100/70 blur-3xl" />
        <div className="absolute -bottom-16 left-12 h-32 w-32 rounded-full bg-white/80 blur-2xl" />

        <div className="relative grid gap-8 md:grid-cols-[1.4fr_0.8fr] md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-800/85">
              Start swapping
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium leading-tight text-ink md:text-[2.75rem]">
              Your closet has a second chapter.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/85 md:text-base">
              Swap unused clothes with people near you.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-start md:justify-end">
            <Link
              to="/register"
              className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-moss-800 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-moss-700"
            >
              Create your account
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center text-sm font-semibold text-moss-800 transition hover:underline"
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
