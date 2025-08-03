import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import SizeActions from './SizeActions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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

      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100/50 overflow-hidden">
        {sizes.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No sizes</h3>
              <p className="text-gray-600 mb-8">Add your first size to get started.</p>
              <Link
                href="/admin/master/sizes/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add New Size
              </Link>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 border-b border-pink-100/70 hover:bg-gradient-to-r hover:from-pink-50/70 hover:to-purple-50/70">
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Size</TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Value</TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizes.map((size, index) => (
                <TableRow
                  key={size.id}
                  className={`
                    border-b border-gray-100/50 transition-all duration-200
                    hover:bg-gradient-to-r hover:from-pink-50/30 hover:to-purple-50/30
                    hover:shadow-sm group
                    ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}
                  `}
                >
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl shadow-sm">
                      <span className="font-bold text-gray-900 text-lg">{size.value}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div>
                      <div className="font-semibold text-gray-900 text-base">EU {size.value}</div>
                      <div className="text-sm text-gray-500">European Size</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right">
                    <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                      <SizeActions size={size} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
