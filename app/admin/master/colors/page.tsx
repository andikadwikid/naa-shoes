import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ColorActions from './ColorActions'

export default async function ColorsPage() {
  const colors = await prisma.color.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Colors Management</h1>
          <p className="text-gray-600">Manage colors for your products</p>
        </div>
        <Link
          href="/admin/master/colors/create"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add New Color
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 font-medium text-gray-900">Color</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Name</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Hex Code</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((color) => (
                <tr key={color.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hexCode || '#000000' }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{color.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 font-mono text-sm">{color.hexCode}</span>
                  </td>
                  <td className="py-4 px-6">
                    <ColorActions color={color} />
                  </td>
                </tr>
              ))}
              {colors.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-500">
                    No colors found. Add your first color to get started.
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
