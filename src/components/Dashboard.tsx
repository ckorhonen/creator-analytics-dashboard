import { AnalyticsData } from '../types'
import MetricCard from './MetricCard'
import PlatformCard from './PlatformCard'
import RevenueChart from './RevenueChart'
import './Dashboard.css'

interface DashboardProps {
  data: AnalyticsData
}

function Dashboard({ data }: DashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="dashboard">
      {/* Top Metrics Overview */}
      <div className="metrics-grid">
        <MetricCard
          icon="💰"
          label="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          subtext="Last 30 days"
          color="#10b981"
        />
        <MetricCard
          icon="👥"
          label="Total Subscribers"
          value={formatNumber(data.totalSubscribers)}
          subtext="Across all platforms"
          color="#3b82f6"
        />
        <MetricCard
          icon="👁️"
          label="Total Views"
          value={formatNumber(data.totalViews)}
          subtext="Last 30 days"
          color="#8b5cf6"
        />
      </div>

      {/* Revenue Trend Chart */}
      <div className="chart-container">
        <h2>Revenue Trend</h2>
        <RevenueChart data={data.timeSeries} />
      </div>

      {/* Platform Breakdown */}
      <div className="platforms-section">
        <h2>Platform Breakdown</h2>
        <div className="platforms-grid">
          {data.platforms.map((platform) => (
            <PlatformCard
              key={platform.name}
              platform={platform}
              formatCurrency={formatCurrency}
              formatNumber={formatNumber}
            />
          ))}
        </div>
      </div>

      {/* Last Updated */}
      <div className="last-updated">
        Last updated: {new Date(data.lastUpdated).toLocaleString()}
      </div>
    </div>
  )
}

export default Dashboard