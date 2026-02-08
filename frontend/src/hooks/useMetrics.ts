import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export interface SystemMetrics {
  cpu_usage: number;
  ram_usage: number;
  disk_usage: number;
  power_watts: number;
  co2_grams: number;
  recorded_at: string;
}

export interface MetricsHistory {
  data: SystemMetrics[];
  loading: boolean;
  error: string | null;
}

// Simulate realistic system metrics (in a real app, this would come from a desktop agent)
const generateSimulatedMetrics = (): Omit<SystemMetrics, 'recorded_at'> => {
  const baseLoad = 20 + Math.random() * 30;
  const cpuSpike = Math.random() > 0.9 ? Math.random() * 40 : 0;
  
  const cpu_usage = Math.min(100, baseLoad + cpuSpike + Math.random() * 15);
  const ram_usage = 40 + Math.random() * 35;
  const disk_usage = 55 + Math.random() * 20;
  
  // Energy estimation based on CPU/RAM usage
  // Typical laptop: 15-65W depending on load
  const basePower = 15;
  const cpuPower = (cpu_usage / 100) * 35;
  const ramPower = (ram_usage / 100) * 10;
  const power_watts = basePower + cpuPower + ramPower + Math.random() * 5;
  
  // CO2 calculation: Average grid carbon intensity ~400g CO2/kWh
  // Convert watts to grams per hour
  const carbonIntensity = 400; // g CO2 per kWh
  const co2_grams = (power_watts / 1000) * carbonIntensity;
  
  return {
    cpu_usage: Math.round(cpu_usage * 100) / 100,
    ram_usage: Math.round(ram_usage * 100) / 100,
    disk_usage: Math.round(disk_usage * 100) / 100,
    power_watts: Math.round(power_watts * 100) / 100,
    co2_grams: Math.round(co2_grams * 1000) / 1000,
  };
};

export const useMetrics = (pollInterval = 3000) => {
  const { user } = useAuth();
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetrics | null>(null);
  const [history, setHistory] = useState<SystemMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error: fetchError } = await supabase
        .from("system_metrics")
        .select("*")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;
      setHistory(data?.reverse() || []);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  }, [user]);

  const recordMetrics = useCallback(async () => {
    if (!user) return;

    const metrics = generateSimulatedMetrics();
    const newMetric: SystemMetrics = {
      ...metrics,
      recorded_at: new Date().toISOString(),
    };

    setCurrentMetrics(newMetric);
    setHistory(prev => [...prev.slice(-49), newMetric]);

    try {
      await supabase.from("system_metrics").insert({
        user_id: user.id,
        ...metrics,
      });
    } catch (err) {
      console.error("Error recording metrics:", err);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchHistory().then(() => {
      setLoading(false);
      recordMetrics();
    });

    const interval = setInterval(recordMetrics, pollInterval);
    return () => clearInterval(interval);
  }, [user, pollInterval, fetchHistory, recordMetrics]);

  // Calculate aggregates
  const todayMetrics = history.filter(m => {
    const date = new Date(m.recorded_at);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  });

  const totalCO2Today = todayMetrics.reduce((sum, m) => sum + m.co2_grams, 0);
  const avgCpuToday = todayMetrics.length 
    ? todayMetrics.reduce((sum, m) => sum + m.cpu_usage, 0) / todayMetrics.length 
    : 0;
  const totalEnergyToday = todayMetrics.reduce((sum, m) => sum + (m.power_watts / 1000), 0); // kWh approximation

  return {
    currentMetrics,
    history,
    loading,
    error,
    aggregates: {
      totalCO2Today,
      avgCpuToday,
      totalEnergyToday,
    },
  };
};
