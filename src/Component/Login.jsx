/** @format */

import { useState } from "react";

function Login({ onLoginSuccess, switchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = existingUsers.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    onLoginSuccess(user);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-1">Sign in</h1>
        <p className="text-zinc-500 text-sm mb-8">Welcome back to Net_Mirror</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all duration-150 cursor-pointer">
            Continue
          </button>
        </form>

        <p className="text-center mt-8 text-zinc-600 text-sm">
          No account?{" "}
          <span
            onClick={switchToRegister}
            className="text-zinc-400 hover:text-white cursor-pointer transition-colors duration-150">
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
