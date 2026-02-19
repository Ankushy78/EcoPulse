import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 overflow-y-auto scrollbar-eco">
          {children}
        </main>
      </div>
    </div>
  );
}
