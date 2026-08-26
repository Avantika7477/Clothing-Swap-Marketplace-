import MainLayout from "../../layouts/MainLayout";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <MainLayout>
      <section className="page-shell grid min-h-[78vh] max-w-6xl items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12">
        <div className="hidden lg:block">
          <p className="font-display text-5xl font-bold tracking-tight text-moss-900">
            Fashion Swap
          </p>
          <h1 className="mt-5 font-display text-[2rem] font-bold leading-tight text-ink">
            Welcome back to the swap floor.
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink/60">
            Pick up where you left off — manage listings, reply to requests, and
            finish exchanges.
          </p>
        </div>

        <div className="clay mx-auto w-full max-w-md">
          <div className="mb-7 lg:hidden">
            <p className="font-display text-3xl font-bold text-moss-900">Fashion Swap</p>
            <p className="mt-2 text-sm text-ink/60">Login to continue swapping.</p>
          </div>
          <div className="mb-6 hidden lg:block">
            <h2 className="font-display text-2xl font-bold text-ink">Login</h2>
            <p className="mt-1 text-sm text-ink/55">
              Use your account to access swaps and chat.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
    </MainLayout>
  );
};

export default Login;
