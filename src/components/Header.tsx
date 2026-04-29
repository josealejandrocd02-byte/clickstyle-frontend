import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  getRole,
  removeRole,
  removeToken,
  removeUsername,
} from "@/utils/storage";
import { isAuthenticated } from "@/utils/isTokenValid";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const role = getRole();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    removeRole();
    removeUsername();
    setMobileOpen(false);
    navigate("/");
  };

  // 🔥 LOGO inteligente
  const getHomeLink = () => {
    if (!isAuth) return "/";
    if (role === "ADMIN") return "/admin";
    return "/dashboard"; // USER + OWNER
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">

        {/* 🔷 LOGO */}
        <Link
          to={getHomeLink()}
          className="font-display text-xl font-bold tracking-tight"
        >
          Click<span className="text-primary">Style</span>
        </Link>

        {/* 🖥 DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">

          <Link to="/" className="text-sm font-medium">
            Explore
          </Link>

          <Link to="/stores" className="text-sm font-medium">
            Stores
          </Link>

          {isAuth ? (
            <>
              {/* 👤 USER PANEL */}
              {role !== "ADMIN" && (
                <Link to="/dashboard" className="text-sm font-medium">
                  Mi cuenta
                </Link>
              )}

              {/* 🏪 STORE DASHBOARD */}
              {role === "OWNER" && (
                <Link to="/store/dashboard" className="text-sm font-medium">
                  Mi tienda
                </Link>
              )}

              {/* 👑 ADMIN */}
              {role === "ADMIN" && (
                <Link to="/admin" className="text-sm font-medium">
                  Admin
                </Link>
              )}

              <span className="text-xs px-2 py-1 bg-muted rounded">
                {role}
              </span>

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium">
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm bg-primary text-white px-3 py-1 rounded"
              >
                Empezar
              </Link>
            </>
          )}

          <ThemeToggle />
        </nav>

        {/* 📱 MOBILE BUTTON */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE */}
      {mobileOpen && (
        <nav className="flex flex-col gap-2 border-t bg-card px-4 pb-4 pt-2 md:hidden">

          <Link to="/" onClick={() => setMobileOpen(false)} className="px-3 py-2">
            Explore
          </Link>

          <Link to="/stores" onClick={() => setMobileOpen(false)} className="px-3 py-2">
            Stores
          </Link>

          {isAuth ? (
            <>
              {role !== "ADMIN" && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2"
                >
                  Mi cuenta
                </Link>
              )}

              {role === "OWNER" && (
                <Link
                  to="/store/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2"
                >
                  Mi tienda
                </Link>
              )}

              {role === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-left px-3 py-2 text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-primary"
              >
                Empezar
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;