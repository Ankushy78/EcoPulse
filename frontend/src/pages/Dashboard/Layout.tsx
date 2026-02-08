import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { 
  Leaf, 
  Home, 
  Activity, 
  Zap, 
  CloudSun, 
  LogOut, 
  Moon, 
  Sun,
  Settings
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const getCurrentTab = () => {
    const path = location.pathname.split("/").pop();
    return path === "dashboard" ? "home" : path || "home";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl eco-gradient flex items-center justify-center animate-pulse">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">Loading EcoPulse...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "live", label: "Live", icon: Activity, path: "/dashboard/live" },
    { id: "energy", label: "Energy", icon: Zap, path: "/dashboard/energy" },
    { id: "carbon", label: "Carbon", icon: CloudSun, path: "/dashboard/carbon" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass glass-border border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl eco-gradient flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">EcoPulse</span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex-1 flex justify-center px-4">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50">
              {tabs.map((tab) => {
                const isActive = getCurrentTab() === tab.id;
                return (
                  <Link key={tab.id} to={tab.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`gap-2 ${isActive ? "eco-gradient" : ""}`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="hidden md:inline">{tab.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <LiveIndicator size="sm" />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="rounded-lg text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          🌱 Every action counts towards a sustainable future
        </div>
      </footer>
    </div>
  );
}
