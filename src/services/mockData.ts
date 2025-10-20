import { AnalyticsData } from '../types'
import { subDays, format } from 'date-fns'

// Generate realistic mock data for demonstration
export function generateMockData(): AnalyticsData {
  const platforms = [
    {
      name: 'Patreon',
      revenue: 4250,
      subscribers: 127,
      views: 0,
      engagement: 85,
      color: '#FF424D',
      icon: '🎨'
    },
    {
      name: 'YouTube',
      revenue: 2180,
      subscribers: 45300,
      views: 284000,
      engagement: 72,
      color: '#FF0000',
      icon: '📹'
    },
    {
      name: 'Twitch',
      revenue: 3890,
      subscribers: 892,
      views: 156000,
      engagement: 68,
      color: '#9146FF',
      icon: '🎮'
    },
    {
      name: 'Whop',
      revenue: 1560,
      subscribers: 43,
      views: 0,
      engagement: 90,
      color: '#7C3AED',
      icon: '💎'
    }
  ]

  // Generate 30 days of time series data
  const timeSeries = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i)
    return {
      date: format(date, 'MMM dd'),
      revenue: Math.floor(300 + Math.random() * 200 + i * 5),
      subscribers: Math.floor(1500 + Math.random() * 100 + i * 10),
      views: Math.floor(12000 + Math.random() * 3000 + i * 100)
    }
  })

  const totalRevenue = platforms.reduce((sum, p) => sum + p.revenue, 0)
  const totalSubscribers = platforms.reduce((sum, p) => sum + p.subscribers, 0)
  const totalViews = platforms.reduce((sum, p) => sum + p.views, 0)

  return {
    totalRevenue,
    totalSubscribers,
    totalViews,
    platforms,
    timeSeries,
    lastUpdated: new Date().toISOString()
  }
}