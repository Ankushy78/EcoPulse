import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface CO2IndicatorProps {
  value: number;
  className?: string;
}

export function CO2Indicator({ value, className }: CO2IndicatorProps) {
  // Determine status based on CO2 output (grams per hour)
  // < 20g/h = good, 20-40g/h = warning, > 40g/h = bad
  const status = value < 20 ? "good" : value < 40 ? "warning" : "danger";
  
  const statusColors = {
    good: "from-status-good to-accent",
    warning: "from-status-warning to-orange-500",
    danger: "from-status-danger to-red-600",
  };

  const statusText = {
    good: "Low Emissions",
    warning: "Moderate",
    danger: "High Emissions",
  };

  const percentage = Math.min((value / 60) * 100, 100);

  return (
    <div className={cn("relative", className)}>
      {/* Circular progress */}
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className="stroke-muted"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className={cn(
              "transition-all duration-500",
              status === "good" && "stroke-status-good",
              status === "warning" && "stroke-status-warning",
              status === "danger" && "stroke-status-danger"
            )}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.83} 283`}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Leaf className={cn(
            "h-6 w-6 mb-1",
            status === "good" && "text-status-good",
            status === "warning" && "text-status-warning",
            status === "danger" && "text-status-danger"
          )} />
          <span className="text-2xl font-bold tabular-nums">{value.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">g CO₂/h</span>
        </div>
      </div>
      
      {/* Status badge */}
      <div className="mt-4 flex justify-center">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r text-white",
          statusColors[status]
        )}>
          {statusText[status]}
        </span>
      </div>
    </div>
  );
}
