import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-moss-800 px-8 py-16 text-white md:px-14">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lichen/20 blur-2xl" />
        <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-medium md:text-5xl">
            Your closet has a second chapter.
          </h2>
          <p className="mt-4 text-white/75">
            Join Fashion Swap and turn unused clothes into someone else’s next favorite piece.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-moss-900 transition hover:bg-lichen"
          >
            Create your account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
