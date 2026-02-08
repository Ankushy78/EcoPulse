import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  variant?: "default" | "glow" | "accent";
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  className,
  variant = "default",
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        variant === "glow" && "eco-glow-sm",
        variant === "accent" && "border-accent/30 bg-accent/5",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
        {trend && trendValue && (
          <div className="mt-2 flex items-center gap-1 text-sm">
            <span
              className={cn(
                trend === "up" && "text-status-danger",
                trend === "down" && "text-status-good",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
            <span className="text-muted-foreground">vs last hour</span>
          </div>
        )}
      </CardContent>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
    </Card>
  );
}
