/** @format */

import { useState } from "react";

function Register({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find(
      (user) => user.email === formData.email,
    );

    if (userExists) {
      setError("User with this email already exists");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setSuccess("Done! Redirecting...");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });

    setTimeout(() => {
      switchToLogin();
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Create account
        </h1>
        <p className="text-zinc-500 text-sm mb-8">Join Net_Mirror</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {success && <p className="text-emerald-400 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
            placeholder="Name"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
            placeholder="Password"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
            placeholder="Confirm password"
          />

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all duration-150 cursor-pointer">
            Continue
          </button>
        </form>

        <p className="text-center mt-8 text-zinc-600 text-sm">
          Have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-zinc-400 hover:text-white cursor-pointer transition-colors duration-150">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
