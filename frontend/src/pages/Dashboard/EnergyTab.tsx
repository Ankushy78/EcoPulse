import { useMetrics } from "@/hooks/useMetrics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Zap, Battery, TrendingUp, BatteryCharging } from "lucide-react";

export default function EnergyTab() {
  const { currentMetrics, history, aggregates } = useMetrics();

  // Calculate hourly energy data (simulated)
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const isActiveHour = hour >= 8 && hour <= 22;
    const baseEnergy = isActiveHour ? 30 + Math.random() * 20 : 10 + Math.random() * 10;
    return {
      hour: `${hour.toString().padStart(2, "0")}:00`,
      energy: Math.round(baseEnergy * 100) / 100,
      isCurrentHour: hour === new Date().getHours(),
    };
  });

  // Energy breakdown by component (simulated)
  const energyBreakdown = [
    { name: "CPU", value: 45, color: "hsl(var(--chart-cpu))" },
    { name: "Display", value: 25, color: "hsl(var(--chart-energy))" },
    { name: "RAM", value: 15, color: "hsl(var(--chart-ram))" },
    { name: "Disk", value: 10, color: "hsl(var(--chart-disk))" },
    { name: "Other", value: 5, color: "hsl(var(--muted-foreground))" },
  ];

  const totalDailyEnergy = hourlyData.reduce((sum, h) => sum + h.energy, 0);
  const avgHourlyEnergy = totalDailyEnergy / 24;
  const currentPower = currentMetrics?.power_watts || 0;
  const estimatedMonthlyCost = (totalDailyEnergy / 1000) * 30 * 0.12; // $0.12 per kWh average

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-muted-foreground">
            Energy: <span className="font-mono font-medium">{payload[0].value.toFixed(1)} Wh</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Energy Consumption</h1>
        <p className="text-muted-foreground mt-1">
          Track and optimize your power usage
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current Power"
          value={currentPower.toFixed(1)}
          unit="W"
          icon={<Zap className="h-4 w-4" />}
          variant="glow"
        />
        <MetricCard
          title="Today's Usage"
          value={(totalDailyEnergy / 1000).toFixed(2)}
          unit="kWh"
          icon={<Battery className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg Hourly"
          value={avgHourlyEnergy.toFixed(1)}
          unit="Wh"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Est. Monthly Cost"
          value={`$${estimatedMonthlyCost.toFixed(2)}`}
          icon={<BatteryCharging className="h-4 w-4" />}
          variant="accent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Energy Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hourly Energy Consumption</CardTitle>
            <CardDescription>Energy usage throughout the day (Wh)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}Wh`}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="energy" radius={[4, 4, 0, 0]}>
                    {hourlyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.isCurrentHour ? "hsl(var(--primary))" : "hsl(var(--chart-energy))"}
                        opacity={entry.isCurrentHour ? 1 : 0.7}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Energy Breakdown Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Power Distribution</CardTitle>
            <CardDescription>Breakdown by component</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={energyBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {energyBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `${value}%`}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {energyBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Energy Saving Tip</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your peak energy usage is during afternoon hours. Consider scheduling heavy tasks 
                during off-peak hours (before 8 AM or after 10 PM) to reduce overall consumption 
                and potentially save on electricity costs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
