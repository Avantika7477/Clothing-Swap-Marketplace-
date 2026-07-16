import MainLayout from "../../layouts/MainLayout";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600">
              Join Kaddly Swap 🌿
            </h1>

            <p className="text-gray-500 mt-2">
              Create your account and start exchanging clothes.
            </p>
          </div>

          <RegisterForm />
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
