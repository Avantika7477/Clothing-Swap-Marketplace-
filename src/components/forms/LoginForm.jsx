import { useState } from "react";
import { Link } from "react-router-dom";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import FormError from "./FormError";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    console.log("Login Data:", formData);

    // TODO:
    // API Login
    // Navigate to Dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormError message={errors.email} />
      </div>

      <div>
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormError message={errors.password} />
      </div>

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-green-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-green-600 font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;