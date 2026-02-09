/** @format */

import MovieApi from "./MovieApi";

function Welcome({ user, onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-900">
        <span className="text-lg font-medium text-white tracking-tight">
          net_mirror
        </span>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-zinc-300 text-sm">{user.name}</span>
              <span className="text-zinc-600 text-xs">{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-zinc-500 text-sm hover:text-white active:scale-95 transition-all duration-150 cursor-pointer">
            Sign out
          </button>
        </div>
      </nav>
      <MovieApi />
    </div>
  );
}

export default Welcome;
