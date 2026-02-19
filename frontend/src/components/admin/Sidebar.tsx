import { LayoutDashboard, Monitor, Users, Settings, Leaf } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-sidebar-background border-r border-sidebar-border flex flex-col px-6 py-8">

      {/* Logo Section */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl eco-gradient flex items-center justify-center shadow-lg">
          <Leaf className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <p className="font-bold text-xl gradient-text">
            EcoPulse
          </p>
          <p className="text-xs text-muted-foreground">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground eco-glow-sm"
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/devices"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground eco-glow-sm"
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`
          }
        >
          <Monitor className="h-5 w-5" />
          <span className="text-sm font-medium">Devices</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground eco-glow-sm"
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`
          }
        >
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium">Users</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground eco-glow-sm"
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-10 text-xs text-muted-foreground">
        <p>Version 1.0</p>
        <p>© 2026 EcoPulse</p>
      </div>

    </aside>
  );
}
