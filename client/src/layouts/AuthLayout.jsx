import { Link } from "react-router-dom";

const AuthLayout = ({ children, title = "Welcome", subtitle }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 10% 0%, rgba(197,221,212,0.55), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(224,122,95,0.12), transparent 50%), linear-gradient(165deg, #e8f0f6, #d5e3ec)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-12">
        <Link
          to="/"
          className="mb-8 font-display text-2xl font-bold tracking-tight text-moss-900"
        >
          Fashion Swap
        </Link>

        <div className="clay p-7 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-ink sm:text-[1.7rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{subtitle}</p>
          ) : null}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
