import MainLayout from "../../layouts/MainLayout";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue swapping clothes.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    </MainLayout>
  );
};

export default Login;
