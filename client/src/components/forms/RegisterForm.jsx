import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import FormError from "./FormError";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";
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
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        city: formData.location,
      });
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextInput
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
      />
      <FormError message={errors.fullName} />

      <TextInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormError message={errors.email} />

      <TextInput
        label="Location / City"
        name="location"
        type="text"
        placeholder="e.g. Chandigarh"
        value={formData.location}
        onChange={handleChange}
      />
      <FormError message={errors.location} />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Create your password"
        value={formData.password}
        onChange={handleChange}
      />
      <FormError message={errors.password} />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <FormError message={errors.confirmPassword} />

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-moss-800 py-3 text-white transition hover:bg-moss-700 disabled:opacity-60"
      >
        {submitting ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-ink/60">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-moss-800 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
