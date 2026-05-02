import { NavLink, useLocation } from "react-router-dom";
import { Upload, BarChart3, Map, AlertTriangle, Phone, TrendingUp, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const solarLinks = [
  { to: "/solar/upload", label: "Upload", icon: Upload },
  { to: "/solar/results", label: "Results", icon: BarChart3 },
];

const windLinks = [
  { to: "/wind/map", label: "Live Map", icon: Map },
  { to: "/wind/alerts", label: "Alert Log", icon: AlertTriangle },
  { to: "/wind/calls", label: "Call Log", icon: Phone },
  { to: "/wind/forecast", label: "Forecast", icon: TrendingUp },
  { to: "/wind/accuracy", label: "Accuracy", icon: Target },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isSolar = pathname.startsWith("/solar");
  const isWind = pathname.startsWith("/wind");
  const links = isSolar ? solarLinks : isWind ? windLinks : [];
  const sectionTitle = isSolar ? "Solar Analysis" : isWind ? "Wind Monitor" : "";

  if (!links.length) return null;

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-border/50 bg-sidebar transition-all duration-200 ${
        collapsed ? "w-14" : "w-52"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-3 border-b border-border/50">
        {!collapsed && <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{sectionTitle}</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-secondary text-muted-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      <nav className="flex-1 py-2 space-y-0.5 px-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`
            }
          >
            <link.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
