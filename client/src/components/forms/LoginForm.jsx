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
        className="btn-premium btn-premium-primary w-full py-3 disabled:opacity-60"
      >
        {submitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-ink/60">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-moss-800 hover:underline"
        >
          Register
        </Link>
      </p>

      <div className="border border-moss-800/10 bg-moss-50/80 p-3 text-xs leading-relaxed text-ink/60">
        <p>Admin: admin@swap.com / admin123</p>
      </div>
    </form>
  );
};

export default LoginForm;
