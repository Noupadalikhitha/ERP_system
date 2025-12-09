import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Settings, 
  MessageSquare,
  LogOut
} from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  const userRole = user?.role_name || 'Staff'
  
  const allNavItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Staff'] },
    { path: '/inventory', label: 'Inventory', icon: Package, roles: ['Admin', 'Manager', 'Staff'] },
    { path: '/sales', label: 'Sales', icon: ShoppingCart, roles: ['Admin', 'Manager', 'Staff'] },
    { path: '/employees', label: 'Employees', icon: Users, roles: ['Admin', 'Manager', 'Staff'] },
    { path: '/finance', label: 'Finance', icon: DollarSign, roles: ['Admin', 'Manager', 'Staff'] },
    { path: '/admin', label: 'Admin', icon: Settings, roles: ['Admin'] },
    { path: '/ai-chat', label: 'AI Assistant', icon: MessageSquare, roles: ['Admin', 'Manager', 'Staff'] },
  ]
  
  const navItems = allNavItems.filter(item => item.roles.includes(userRole))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg flex flex-col h-screen sticky top-0">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-blue-600">ERP System</h1>
          </div>
          <nav className="mt-6 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 ${
                    isActive ? 'bg-blue-50 border-r-4 border-blue-600' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="border-t p-4 bg-white">
            <div className="flex flex-col mb-2">
              <span className="text-sm font-medium text-gray-800 truncate">{user?.email || 'User'}</span>
              <span className="text-xs text-gray-500">
                Role: {user?.role_name || 'Staff'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

