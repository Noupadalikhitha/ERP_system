import { useQuery } from '@tanstack/react-query'
import { authAPI } from '../api/auth'
import { inventoryAPI } from '../api/inventory'
import { salesAPI } from '../api/sales'
import { employeeAPI } from '../api/employee'
import { financeAPI } from '../api/finance'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react'

export default function Dashboard() {
  const { data: dashboardData, error: dashboardError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => authAPI.getDashboard(),
    retry: false, // Don't retry if it fails (might be non-admin user)
  })

  const { data: inventoryData } = useQuery({
    queryKey: ['inventory-analytics'],
    queryFn: () => inventoryAPI.getAnalytics(),
  })

  const { data: salesData } = useQuery({
    queryKey: ['sales-analytics'],
    queryFn: () => salesAPI.getAnalytics(30),
  })

  const { data: financeData } = useQuery({
    queryKey: ['finance-dashboard'],
    queryFn: () => financeAPI.getDashboard(30),
  })

  const kpis = [
    {
      title: 'Revenue (30d)',
      value: `$${(dashboardData?.kpis?.total_revenue_30d || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Orders (30d)',
      value: dashboardData?.kpis?.order_count_30d || 0,
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Employees',
      value: dashboardData?.kpis?.active_employees || 0,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Low Stock Items',
      value: dashboardData?.kpis?.low_stock_items || 0,
      icon: Package,
      color: 'bg-red-500',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.title} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                </div>
                <div className={`${kpi.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          {salesData?.best_selling_products && salesData.best_selling_products.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData.best_selling_products.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No sales data available</p>
              <p className="text-sm text-gray-400 mt-2">Sales data will appear here once orders are created</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
          {financeData ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Revenue:</span>
                <span className="font-semibold text-green-600">
                  ${(financeData.total_revenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Expenses:</span>
                <span className="font-semibold text-red-600">
                  ${(financeData.total_expenses || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Net Profit:</span>
                <span className="font-semibold">
                  ${(financeData.net_profit || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No financial data available</p>
          )}
        </div>
      </div>
    </div>
  )
}


