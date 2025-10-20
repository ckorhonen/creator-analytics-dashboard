import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { fetchAnalytics } from './services/api'
import { AnalyticsData } from './types'
import './App.css'

function App() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const analytics = await fetchAnalytics()
      setData(analytics)
      setError(null)
    } catch (err) {
      setError('Failed to load analytics. Please check your connections.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Creator Analytics</h1>
        <p>All your platforms, one clear view</p>
      </header>
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your analytics...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={loadData}>Retry</button>
        </div>
      )}
      
      {data && !loading && <Dashboard data={data} />}
    </div>
  )
}

export default App