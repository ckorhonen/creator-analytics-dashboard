import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TimeSeriesData } from '../types'
import './RevenueChart.css'

interface RevenueChartProps {
  data: TimeSeriesData[]
}

function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="revenue-chart">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '0.85rem' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '0.85rem' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart