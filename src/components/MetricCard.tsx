import './MetricCard.css'

interface MetricCardProps {
  icon: string
  label: string
  value: string
  subtext: string
  color: string
}

function MetricCard({ icon, label, value, subtext, color }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: color }}>
        {icon}
      </div>
      <div className="metric-content">
        <div className="metric-label">{label}</div>
        <div className="metric-value">{value}</div>
        <div className="metric-subtext">{subtext}</div>
      </div>
    </div>
  )
}

export default MetricCard