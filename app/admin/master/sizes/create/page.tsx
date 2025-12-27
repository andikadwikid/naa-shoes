import SizeForm from '../SizeForm'

export default function CreateSizePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Size</h1>
        <p className="text-gray-600">Create a new size for your products</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <SizeForm />
      </div>
    </div>
  )
}
