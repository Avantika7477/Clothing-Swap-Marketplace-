import { useState } from "react";
import { Link } from "react-router-dom";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import Button from "../common/Button";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <TextInput
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="John Doe"
      />

      <TextInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
      />

      <TextInput
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+91 9876543210"
      />

      <TextInput
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Mohali"
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create password"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
      />

      <Button type="submit" fullWidth>
        Create Account
      </Button>

      <p className="text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 font-semibold"
        >
          Login
        </Link>
      </p>

    </form>
  );
};

export default RegisterForm;