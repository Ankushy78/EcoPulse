import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-muted-foreground cursor-pointer" />
        <div className="w-9 h-9 rounded-full eco-gradient flex items-center justify-center text-primary-foreground font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
