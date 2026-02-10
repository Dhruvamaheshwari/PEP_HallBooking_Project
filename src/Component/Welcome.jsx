/** @format */

import MovieApi from "./MovieApi";

function Welcome({ user, onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    onLogout();
  };

  return (
    <div className="app-shell">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-zinc-200">
        <span className="text-lg font-medium text-zinc-950 tracking-tight">
          net_mirror
        </span>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-zinc-600 text-sm font-medium">
                {user.name}
              </span>
              <span className="text-zinc-400 text-xs">{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-zinc-500 text-sm hover:text-zinc-950 active:scale-95 transition-all duration-150 cursor-pointer">
            Sign out
          </button>
        </div>
      </nav>
      <MovieApi />
    </div>
  );
}

export default Welcome;
