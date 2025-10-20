import { PlatformMetrics } from '../types'
import './PlatformCard.css'

interface PlatformCardProps {
  platform: PlatformMetrics
  formatCurrency: (amount: number) => string
  formatNumber: (num: number) => string
}

function PlatformCard({ platform, formatCurrency, formatNumber }: PlatformCardProps) {
  return (
    <div className="platform-card">
      <div className="platform-header">
        <div className="platform-icon" style={{ background: platform.color }}>
          {platform.icon}
        </div>
        <h3>{platform.name}</h3>
      </div>
      
      <div className="platform-metrics">
        <div className="platform-metric">
          <div className="platform-metric-label">Revenue</div>
          <div className="platform-metric-value" style={{ color: platform.color }}>
            {formatCurrency(platform.revenue)}
          </div>
        </div>
        
        <div className="platform-metric">
          <div className="platform-metric-label">Subscribers</div>
          <div className="platform-metric-value">
            {formatNumber(platform.subscribers)}
          </div>
        </div>
        
        {platform.views > 0 && (
          <div className="platform-metric">
            <div className="platform-metric-label">Views</div>
            <div className="platform-metric-value">
              {formatNumber(platform.views)}
            </div>
          </div>
        )}
      </div>
      
      <div className="platform-engagement">
        <div className="engagement-label">Engagement</div>
        <div className="engagement-bar">
          <div 
            className="engagement-fill" 
            style={{ 
              width: `${platform.engagement}%`,
              background: platform.color 
            }}
          />
        </div>
        <div className="engagement-value">{platform.engagement}%</div>
      </div>
    </div>
  )
}

export default PlatformCard