import MainLayout from "../../layouts/MainLayout";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <MainLayout>
      <section className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 px-6 py-14 lg:grid-cols-2">
        <div className="hidden lg:block">
          <p className="font-display text-5xl font-medium text-moss-800">Fashion Swap</p>
          <h1 className="mt-4 font-display text-3xl text-ink">
            Join the clothing exchange.
          </h1>
          <p className="mt-4 max-w-md text-ink/60">
            Create a profile, list unused pieces, and swap with people nearby — without buying new.
          </p>
        </div>

        <div className="surface mx-auto w-full max-w-lg rounded-3xl p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="font-display text-2xl text-ink lg:text-3xl">Create account</h2>
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
