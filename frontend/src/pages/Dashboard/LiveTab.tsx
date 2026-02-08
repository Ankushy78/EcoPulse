import { useMetrics } from "@/hooks/useMetrics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { Cpu, MemoryStick, HardDrive, Activity } from "lucide-react";

export default function LiveTab() {
  const { currentMetrics, history, loading } = useMetrics(2000);

  // Format data for charts - last 20 data points
  const chartData = history.slice(-20).map((m, index) => ({
    time: new Date(m.recorded_at).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    cpu: Number(m.cpu_usage),
    ram: Number(m.ram_usage),
    disk: Number(m.disk_usage),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-mono font-medium">{entry.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            Live Metrics
            <LiveIndicator />
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time system performance monitoring
          </p>
        </div>
      </div>

      {/* Current Values Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-cpu/10 to-transparent" />
          <CardContent className="pt-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-4xl font-bold tabular-nums text-chart-cpu">
                  {currentMetrics?.cpu_usage.toFixed(1) || "—"}%
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-chart-cpu/20 flex items-center justify-center">
                <Cpu className="h-7 w-7 text-chart-cpu" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-ram/10 to-transparent" />
          <CardContent className="pt-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">RAM Usage</p>
                <p className="text-4xl font-bold tabular-nums text-chart-ram">
                  {currentMetrics?.ram_usage.toFixed(1) || "—"}%
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-chart-ram/20 flex items-center justify-center">
                <MemoryStick className="h-7 w-7 text-chart-ram" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-disk/10 to-transparent" />
          <CardContent className="pt-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disk Usage</p>
                <p className="text-4xl font-bold tabular-nums text-chart-disk">
                  {currentMetrics?.disk_usage.toFixed(1) || "—"}%
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-chart-disk/20 flex items-center justify-center">
                <HardDrive className="h-7 w-7 text-chart-disk" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            System Performance
          </CardTitle>
          <CardDescription>Real-time metrics over the last minute</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-cpu))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-cpu))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ramGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-ram))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-ram))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="diskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-disk))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-disk))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  name="CPU"
                  stroke="hsl(var(--chart-cpu))"
                  fill="url(#cpuGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="ram"
                  name="RAM"
                  stroke="hsl(var(--chart-ram))"
                  fill="url(#ramGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="disk"
                  name="Disk"
                  stroke="hsl(var(--chart-disk))"
                  fill="url(#diskGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
