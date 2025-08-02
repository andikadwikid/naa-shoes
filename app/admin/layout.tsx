import { Metadata } from 'next'
import AdminNavigation from './components/AdminNavigation'
import AdminSidebar from './components/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Dashboard | NAA Shoes',
  description: 'Admin dashboard untuk mengelola produk dan data toko NAA Shoes',
  robots: { index: false, follow: false }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <AdminNavigation />
      
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
