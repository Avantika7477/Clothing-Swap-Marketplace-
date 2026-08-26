import MainLayout from "../../layouts/MainLayout";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <MainLayout>
      <section className="page-shell grid min-h-[78vh] max-w-6xl items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12">
        <div className="hidden lg:block">
          <p className="font-display text-5xl font-bold tracking-tight text-moss-900">
            Fashion Swap
          </p>
          <h1 className="mt-5 font-display text-[2rem] font-bold leading-tight text-ink">
            Join the clothing exchange.
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink/60">
            Create a profile, list unused pieces, and swap with people nearby —
            without buying new.
          </p>
        </div>

        <div className="clay mx-auto w-full max-w-lg">
          <div className="mb-7">
            <h2 className="font-display text-2xl font-bold text-ink lg:text-[1.75rem]">
              Create account
            </h2>
            <p className="mt-2 text-sm text-ink/55">
              It only takes a minute to start swapping.
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
