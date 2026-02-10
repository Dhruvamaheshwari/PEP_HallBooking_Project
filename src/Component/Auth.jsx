/** @format */

import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Welcome from "./Welcome";

const getInitialUser = () => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? JSON.parse(savedUser) : null;
};

const getInitialPage = () => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? "welcome" : "login";
};

function Auth() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [currentUser, setCurrentUser] = useState(getInitialUser);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage("welcome");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
  };

  const switchToRegister = () => {
    setCurrentPage("register");
  };

  const switchToLogin = () => {
    setCurrentPage("login");
  };

  return (
    <div className="app-shell">
      {currentPage === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          switchToRegister={switchToRegister}
        />
      )}

      {currentPage === "register" && <Register switchToLogin={switchToLogin} />}

      {currentPage === "welcome" && currentUser && (
        <Welcome user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default Auth;
