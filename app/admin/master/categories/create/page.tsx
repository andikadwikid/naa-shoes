import CategoryForm from '../CategoryForm'

export default function CreateCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Category</h1>
        <p className="text-gray-600">Create a new product category for your store</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CategoryForm />
      </div>
    </div>
  )
}
