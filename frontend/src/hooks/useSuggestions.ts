import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: "cpu" | "memory" | "disk" | "general";
  impact_level: "low" | "medium" | "high";
}

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("optimization_suggestions")
          .select("*")
          .eq("is_active", true)
          .order("impact_level", { ascending: false });

        if (fetchError) throw fetchError;
        setSuggestions(data as Suggestion[] || []);
      } catch (err) {
        setError("Failed to load suggestions");
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return { suggestions, loading, error };
};
