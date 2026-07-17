import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import FormError from "./FormError";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    // Temporary Registration
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", "dummy-token");

    console.log("Account Created Successfully");

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <TextInput
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <FormError message={errors.fullName} />
      </div>

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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormError message={errors.password} />
      </div>

      <div>
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <FormError message={errors.confirmPassword} />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import FormError from "./FormError";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    // Temporary Registration
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", "dummy-token");

    console.log("Account Created Successfully");

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <TextInput
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <FormError message={errors.fullName} />
      </div>

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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormError message={errors.password} />
      </div>

      <div>
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <FormError message={errors.confirmPassword} />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;