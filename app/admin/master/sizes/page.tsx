import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import SizeActions from './SizeActions'

export default async function SizesPage() {
  const sizes = await prisma.size.findMany({
    orderBy: { value: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sizes Management</h1>
          <p className="text-gray-600">Manage sizes for your products</p>
        </div>
        <Link
          href="/admin/master/sizes/create"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add New Size
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 font-medium text-gray-900">Size</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Value</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                      <span className="font-bold text-gray-700">{size.value}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">EU {size.value}</div>
                    <div className="text-sm text-gray-500">European Size</div>
                  </td>
                  <td className="py-4 px-6">
                    <SizeActions size={size} />
                  </td>
                </tr>
              ))}
              {sizes.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 px-6 text-center text-gray-500">
                    No sizes found. Add your first size to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
