export default function StatsCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="glass glass-border rounded-2xl p-6">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}
