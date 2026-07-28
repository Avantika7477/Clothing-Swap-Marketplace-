import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import FormError from "./FormError";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const data = await login(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
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
          className="text-sm text-moss-800 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-moss-800 py-3 text-white transition hover:bg-moss-700 disabled:opacity-60"
      >
        {submitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-moss-800 hover:underline"
        >
          Register
        </Link>
      </p>

      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 space-y-1">
        <p>Demo user: rahul@swap.com / password123</p>
        <p>Demo admin: admin@swap.com / admin123</p>
      </div>
    </form>
  );
};

export default LoginForm;
