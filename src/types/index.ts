export interface PlatformMetrics {
  name: string
  revenue: number
  subscribers: number
  views: number
  engagement: number
  color: string
  icon: string
}

export interface TimeSeriesData {
  date: string
  revenue: number
  subscribers: number
  views: number
}

export interface AnalyticsData {
  totalRevenue: number
  totalSubscribers: number
  totalViews: number
  platforms: PlatformMetrics[]
  timeSeries: TimeSeriesData[]
  lastUpdated: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}