import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join our sustainable fashion community and start swapping clothes.
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />
      </div>
    </section>
  );
};

export default Register;
