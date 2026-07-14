import { useState } from "react";
import { Link } from "react-router-dom";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import Button from "../common/Button";

const RegisterForm = () => {
  // ===========================
  // State
  // ===========================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ===========================
  // Handle Input Change
  // ===========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ===========================
  // Validation
  // ===========================

  const validateForm = () => {
    let newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ===========================
  // Submit Form
  // ===========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate Backend API Call
    setTimeout(() => {
      console.log(formData);

      alert("Registration Successful!");

      setLoading(false);

      // Reset Form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
        confirmPassword: "",
      });

      // Reset Errors
      setErrors({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
        confirmPassword: "",
      });
    }, 1500);
  };

  // ===========================
  // UI
  // ===========================

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextInput
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Enter your full name"
        error={errors.fullName}
      />

      <TextInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        error={errors.email}
      />

      <TextInput
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
        error={errors.phone}
      />

      <TextInput
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Enter your city"
        error={errors.city}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        error={errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        error={errors.confirmPassword}
      />

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-green-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
