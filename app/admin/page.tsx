import DashboardStats from './components/DashboardStats'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/products/create"
            className="flex items-center p-4 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition-colors"
          >
            <div className="bg-pink-600 text-white p-2 rounded-lg mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-pink-900">Add Product</p>
              <p className="text-sm text-pink-700">Create new product</p>
            </div>
          </a>

          <a
            href="/admin/master/categories/create"
            className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-blue-900">Add Category</p>
              <p className="text-sm text-blue-700">Create new category</p>
            </div>
          </a>

          <a
            href="/admin/master/colors/create"
            className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="bg-purple-600 text-white p-2 rounded-lg mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-purple-900">Add Color</p>
              <p className="text-sm text-purple-700">Create new color</p>
            </div>
          </a>

          <a
            href="/admin/master/sizes/create"
            className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="bg-green-600 text-white p-2 rounded-lg mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m0 0V1m0 2h2m0 0V1m0 2h2m0 0V1m0 2h4a1 1 0 011 1v4M4 8h16M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-green-900">Add Size</p>
              <p className="text-sm text-green-700">Create new size</p>
            </div>
          </a>
        </div>
      </div>

      {/* Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Product Management</h4>
          <div className="space-y-2">
            <a href="/admin/products" className="block text-sm text-blue-600 hover:text-blue-800">
              View All Products
            </a>
            <a href="/admin/products/create" className="block text-sm text-blue-600 hover:text-blue-800">
              Add New Product
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Master Data</h4>
          <div className="space-y-2">
            <a href="/admin/master/categories" className="block text-sm text-blue-600 hover:text-blue-800">
              Manage Categories
            </a>
            <a href="/admin/master/colors" className="block text-sm text-blue-600 hover:text-blue-800">
              Manage Colors
            </a>
            <a href="/admin/master/sizes" className="block text-sm text-blue-600 hover:text-blue-800">
              Manage Sizes
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Analytics</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Sales Reports (Coming Soon)</p>
            <p className="text-sm text-gray-500">Inventory Reports (Coming Soon)</p>
            <p className="text-sm text-gray-500">Customer Analytics (Coming Soon)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
