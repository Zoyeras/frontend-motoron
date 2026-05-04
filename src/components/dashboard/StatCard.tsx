interface StatCardProps {
  label: string
  value: string
  subtitle: string
  accent?: boolean
}

export function StatCard({ label, value, subtitle, accent }: StatCardProps) {
  return (
    <article
      className={`glass-card p-6 flex flex-col justify-center ${
        accent ? 'bg-gradient-to-br from-accent/20 to-accent-blue/10' : ''
      }`}
    >
      <span className="label-text mb-2">{label}</span>
      <strong className="text-2xl md:text-3xl font-bold text-slate-50">{value}</strong>
      <small className="text-muted text-sm mt-1">{subtitle}</small>
    </article>
  )
}
