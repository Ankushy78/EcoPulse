import { useMetrics } from "@/hooks/useMetrics";
import { useSuggestions } from "@/hooks/useSuggestions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CO2Indicator } from "@/components/ui/co2-indicator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { Leaf, TreePine, Wind, Cloud, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";

export default function CarbonTab() {
  const { currentMetrics, history, aggregates } = useMetrics();
  const { suggestions, loading: suggestionsLoading } = useSuggestions();

  // CO2 history for chart
  const co2History = history.slice(-30).map((m) => ({
    time: new Date(m.recorded_at).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    }),
    co2: Number(m.co2_grams),
  }));

  // Calculate carbon metrics
  const currentCO2 = currentMetrics?.co2_grams || 0;
  const dailyCO2 = aggregates.totalCO2Today;
  const monthlyEstimate = dailyCO2 * 30;
  const yearlyEstimate = monthlyEstimate * 12;

  // Carbon offset equivalents
  const treesNeeded = yearlyEstimate / 1000 / 21; // Average tree absorbs ~21kg CO2/year
  const carMiles = yearlyEstimate / 1000 / 0.404; // ~404g CO2 per mile for average car

  // Daily carbon budget (arbitrary goal: 500g/day)
  const dailyBudget = 500;
  const budgetUsed = (dailyCO2 / dailyBudget) * 100;

  const impactColors = {
    low: "bg-status-good/10 text-status-good border-status-good/30",
    medium: "bg-status-warning/10 text-status-warning border-status-warning/30",
    high: "bg-status-danger/10 text-status-danger border-status-danger/30",
  };

  const categoryIcons = {
    cpu: Lightbulb,
    memory: Cloud,
    disk: Wind,
    general: Leaf,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Carbon Footprint</h1>
        <p className="text-muted-foreground mt-1">
          Track and reduce your environmental impact
        </p>
      </div>

      {/* Top Row - CO2 Indicator + Key Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current CO2 */}
        <Card className="lg:row-span-2">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Leaf className="h-5 w-5 text-accent" />
              Real-time Emissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CO2Indicator value={currentCO2} />
            
            {/* Daily Budget Progress */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Daily Budget</span>
                <span className="font-medium">{dailyCO2.toFixed(0)}g / {dailyBudget}g</span>
              </div>
              <Progress 
                value={Math.min(budgetUsed, 100)} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground text-center">
                {budgetUsed < 80 
                  ? "You're on track! 🌱" 
                  : budgetUsed < 100 
                    ? "Getting close to daily limit" 
                    : "Over daily budget"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Carbon Stats Grid */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {dailyCO2.toFixed(0)}g
                </p>
                <p className="text-xs text-muted-foreground mt-1">Today</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold tabular-nums">
                  {(monthlyEstimate / 1000).toFixed(2)}kg
                </p>
                <p className="text-xs text-muted-foreground mt-1">Est. Monthly</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold tabular-nums">
                  {(yearlyEstimate / 1000).toFixed(1)}kg
                </p>
                <p className="text-xs text-muted-foreground mt-1">Est. Yearly</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold tabular-nums text-accent">
                  {treesNeeded.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Trees to offset</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equivalents Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Carbon Equivalents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <TreePine className="h-8 w-8 text-accent" />
              <div>
                <p className="font-medium">{treesNeeded.toFixed(2)} trees</p>
                <p className="text-xs text-muted-foreground">needed yearly to offset</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <svg className="h-8 w-8 text-chart-cpu" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <div>
                <p className="font-medium">{carMiles.toFixed(0)} miles</p>
                <p className="text-xs text-muted-foreground">equivalent driving</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CO2 History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Emissions Over Time</CardTitle>
          <CardDescription>CO₂ output in grams per hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={co2History}>
                <defs>
                  <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-co2))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-co2))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}g`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}g CO₂/h`, "Emissions"]}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="co2"
                  stroke="hsl(var(--chart-co2))"
                  fill="url(#co2Gradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-chart-energy" />
            Optimization Suggestions
          </CardTitle>
          <CardDescription>Actionable tips to reduce your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => {
              const IconComponent = categoryIcons[suggestion.category];
              return (
                <div
                  key={suggestion.id}
                  className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{suggestion.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={impactColors[suggestion.impact_level]}
                        >
                          {suggestion.impact_level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
