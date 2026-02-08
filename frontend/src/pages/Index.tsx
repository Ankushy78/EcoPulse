import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Activity, Zap, CloudSun, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track CPU, RAM, and disk usage with live updates every few seconds",
    },
    {
      icon: Zap,
      title: "Energy Analytics",
      description: "Visualize power consumption patterns and identify optimization opportunities",
    },
    {
      icon: CloudSun,
      title: "Carbon Tracking",
      description: "Calculate and reduce your computer's carbon footprint with actionable insights",
    },
  ];

  const stats = [
    { value: "400g", label: "Avg CO₂/kWh" },
    { value: "15-65W", label: "Typical Laptop Power" },
    { value: "21kg", label: "Tree Absorbs/Year" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 eco-gradient-radial pointer-events-none" />
      <div className="fixed top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl eco-gradient flex items-center justify-center animate-pulse-glow">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl gradient-text">EcoPulse</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="eco-gradient">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-muted-foreground">Track your digital carbon footprint</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Reduce Your
              <span className="block gradient-text">Computer's Impact</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              EcoPulse monitors your system's energy consumption in real-time and 
              calculates its carbon footprint, helping you make eco-friendly computing choices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="eco-gradient h-14 px-8 text-lg">
                  Start Monitoring Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Go Green
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive tools to monitor, analyze, and reduce your digital environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-xl eco-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits List */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto bg-card rounded-3xl border p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Use EcoPulse?
            </h2>
            <div className="space-y-4">
              {[
                "Real-time CPU, RAM, and disk usage monitoring",
                "Accurate energy consumption calculations",
                "CO₂ emissions tracking with visual indicators",
                "Personalized optimization suggestions",
                "Daily and weekly usage reports",
                "Dark mode for reduced eye strain",
              ].map((benefit, index) => (
                <div 
                  key={benefit}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="relative overflow-hidden rounded-3xl eco-gradient p-12 md:p-16 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Reduce Your Footprint?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join thousands of eco-conscious users making a difference, one byte at a time.
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>🌱 EcoPulse — Making computing sustainable</p>
        </div>
      </footer>
    </div>
  );
}
