import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import CategoryActions from './CategoryActions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage product categories for your store</p>
        </div>
        <Link
          href="/admin/master/categories/create"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Category
        </Link>
      </div>

      {/* Categories Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100/50 overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories</h3>
              <p className="text-gray-600 mb-8">Get started by creating a new category.</p>
              <Link
                href="/admin/master/categories/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add Category
              </Link>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 border-b border-pink-100/70 hover:bg-gradient-to-r hover:from-pink-50/70 hover:to-purple-50/70">
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Category</TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Description</TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Products</TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Status</TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Created</TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow
                  key={category.id}
                  className={`
                    border-b border-gray-100/50 transition-all duration-200
                    hover:bg-gradient-to-r hover:from-pink-50/30 hover:to-purple-50/30
                    hover:shadow-sm group
                    ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}
                  `}
                >
                  <TableCell className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900 text-base">{category.name}</div>
                      <div className="text-sm text-gray-500 bg-gray-100/60 px-2 py-1 rounded-md inline-block">/{category.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="text-gray-600 max-w-xs truncate">
                      {category.description || <span className="text-gray-400 italic">No description</span>}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="font-semibold text-gray-900">{category._count.products}</div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <Badge
                      className={`
                        font-medium px-3 py-1.5 rounded-full shadow-sm
                        ${category.isActive
                          ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
                          : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
                        }
                      `}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="text-sm text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right">
                    <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                      <CategoryActions category={category} />
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
