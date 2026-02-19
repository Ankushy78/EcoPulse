import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatsCard
          title="Total PCs"
          value="24"
          color="gradient-text"
        />

        <StatsCard
          title="Avg CPU Usage"
          value="62%"
          color="text-[hsl(var(--chart-cpu))]"
        />

        <StatsCard
          title="CO₂ Reduced Today"
          value="18kg"
          color="text-[hsl(var(--chart-co2))]"
        />

      </div>
    </AdminLayout>
  );
}
