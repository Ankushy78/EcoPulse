-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE,
  phone TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create system metrics table
CREATE TABLE public.system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cpu_usage DECIMAL(5,2) NOT NULL DEFAULT 0,
  ram_usage DECIMAL(5,2) NOT NULL DEFAULT 0,
  disk_usage DECIMAL(5,2) NOT NULL DEFAULT 0,
  power_watts DECIMAL(8,2) NOT NULL DEFAULT 0,
  co2_grams DECIMAL(10,4) NOT NULL DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create energy reports table for aggregated data
CREATE TABLE public.energy_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('daily', 'weekly', 'monthly')),
  total_energy_kwh DECIMAL(10,4) NOT NULL DEFAULT 0,
  total_co2_kg DECIMAL(10,4) NOT NULL DEFAULT 0,
  avg_cpu_usage DECIMAL(5,2) NOT NULL DEFAULT 0,
  avg_ram_usage DECIMAL(5,2) NOT NULL DEFAULT 0,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create optimization suggestions table
CREATE TABLE public.optimization_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cpu', 'memory', 'disk', 'general')),
  impact_level TEXT NOT NULL CHECK (impact_level IN ('low', 'medium', 'high')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.optimization_suggestions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- System metrics policies
CREATE POLICY "Users can view their own metrics"
  ON public.system_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON public.system_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Energy reports policies
CREATE POLICY "Users can view their own reports"
  ON public.energy_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports"
  ON public.energy_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Optimization suggestions are public (read-only for everyone)
CREATE POLICY "Anyone can view active suggestions"
  ON public.optimization_suggestions FOR SELECT
  USING (is_active = true);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto-creating profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert default optimization suggestions
INSERT INTO public.optimization_suggestions (title, description, category, impact_level) VALUES
  ('Reduce Background Processes', 'Close unnecessary applications running in the background to reduce CPU usage and energy consumption.', 'cpu', 'high'),
  ('Enable Power Saver Mode', 'Switch to power saver mode during low-activity periods to reduce overall energy consumption.', 'general', 'high'),
  ('Optimize Browser Tabs', 'Close unused browser tabs as each tab consumes memory and CPU cycles.', 'memory', 'medium'),
  ('Schedule Heavy Tasks', 'Schedule resource-intensive tasks during off-peak hours when electricity may be cleaner.', 'general', 'medium'),
  ('Clean Up Disk Space', 'Remove temporary files and unused applications to improve disk efficiency.', 'disk', 'low'),
  ('Reduce Display Brightness', 'Lower screen brightness by 20-30% to save significant power without affecting usability.', 'general', 'high'),
  ('Enable Sleep Mode', 'Configure automatic sleep mode after 5-10 minutes of inactivity.', 'general', 'medium'),
  ('Use Efficient Applications', 'Replace resource-heavy applications with lighter alternatives when possible.', 'cpu', 'medium');

-- Create index for faster metric queries
CREATE INDEX idx_system_metrics_user_recorded ON public.system_metrics(user_id, recorded_at DESC);
CREATE INDEX idx_energy_reports_user_period ON public.energy_reports(user_id, period_start DESC);