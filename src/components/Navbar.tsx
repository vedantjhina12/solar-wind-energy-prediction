import { Wind, Sun, Moon, Bell, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export function Navbar() {
  const { theme, toggleTheme, language, toggleLanguage } = useAppContext();
  const [notifCount] = useState(3);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border/50 bg-card/90 backdrop-blur-xl flex items-center px-4 gap-4">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 mr-4">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Wind className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-tight text-foreground">VAYU</span>
      </NavLink>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1">
        <NavLink
          to="/solar"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Solar Analysis
        </NavLink>
        <NavLink
          to="/wind"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Wind Monitor
        </NavLink>
      </nav>

      <div className="flex-1" />

      {/* System status */}
      <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-2 h-2 rounded-full bg-status-green" />
        Updated 3 mins ago
      </div>

      {/* Language toggle */}
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      >
        <Globe className="w-3.5 h-3.5" />
        {language === "en" ? "EN" : "ಕನ್ನಡ"}
      </button>

      {/* Notifications */}
      <button className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
        <Bell className="w-4 h-4" />
        {notifCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-status-red text-[10px] font-bold flex items-center justify-center text-primary-foreground">
            {notifCount}
          </span>
        )}
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </header>
  );
}
