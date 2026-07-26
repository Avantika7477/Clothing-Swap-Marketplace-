import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";

import TextInput from "../../components/forms/TextInput";
import FormError from "../../components/forms/FormError";

import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setError("");
    setSuccess("Password reset link has been sent to your email.");

    console.log(email);

    // TODO:
    // Call Forgot Password API
  };

  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-moss-800">
            Forgot Password
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Enter your registered email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormError message={error} />
            </div>

            {success && <p className="text-moss-800 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full bg-moss-800 text-white py-3 rounded-lg hover:bg-moss-700 transition"
            >
              Send Reset Link
            </button>

            <p className="text-center text-sm">
              <Link to="/login" className="text-moss-800 hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ForgotPassword;
