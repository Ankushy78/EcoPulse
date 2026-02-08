import { useMetrics } from "@/hooks/useMetrics";
import { useSuggestions } from "@/hooks/useSuggestions";
import { MetricCard } from "@/components/ui/metric-card";
import { CO2Indicator } from "@/components/ui/co2-indicator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, MemoryStick, Zap, Leaf, TrendingDown, Lightbulb } from "lucide-react";

export default function HomeTab() {
  const { currentMetrics, aggregates, loading } = useMetrics();
  const { suggestions } = useSuggestions();

  const topSuggestions = suggestions.filter(s => s.impact_level === "high").slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your system's environmental impact in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated:</span>
          <span className="font-mono">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="CPU Usage"
          value={currentMetrics?.cpu_usage.toFixed(1) || "—"}
          unit="%"
          icon={<Cpu className="h-4 w-4" />}
          trend={currentMetrics && currentMetrics.cpu_usage > 70 ? "up" : "down"}
          trendValue={currentMetrics ? `${(currentMetrics.cpu_usage - 50).toFixed(0)}%` : "—"}
        />
        <MetricCard
          title="RAM Usage"
          value={currentMetrics?.ram_usage.toFixed(1) || "—"}
          unit="%"
          icon={<MemoryStick className="h-4 w-4" />}
          trend="neutral"
          trendValue="stable"
        />
        <MetricCard
          title="Power Draw"
          value={currentMetrics?.power_watts.toFixed(1) || "—"}
          unit="W"
          icon={<Zap className="h-4 w-4" />}
          variant="glow"
        />
        <MetricCard
          title="Disk Usage"
          value={currentMetrics?.disk_usage.toFixed(1) || "—"}
          unit="%"
          icon={<HardDrive className="h-4 w-4" />}
        />
      </div>

      {/* CO2 and Suggestions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CO2 Indicator */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Leaf className="h-5 w-5 text-accent" />
              Current CO₂ Output
            </CardTitle>
            <CardDescription>Real-time carbon emissions estimate</CardDescription>
          </CardHeader>
          <CardContent>
            <CO2Indicator value={currentMetrics?.co2_grams || 0} />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              Today's Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Total CO₂</span>
              <span className="font-bold tabular-nums">{aggregates.totalCO2Today.toFixed(1)}g</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Avg CPU Usage</span>
              <span className="font-bold tabular-nums">{aggregates.avgCpuToday.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Energy Used</span>
              <span className="font-bold tabular-nums">{(aggregates.totalEnergyToday * 1000).toFixed(2)} Wh</span>
            </div>
          </CardContent>
        </Card>

        {/* Top Suggestions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-chart-energy" />
              Quick Wins
            </CardTitle>
            <CardDescription>High-impact optimizations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {suggestion.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {suggestion.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
