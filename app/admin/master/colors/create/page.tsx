import ColorForm from '../ColorForm'

export default function CreateColorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Color</h1>
        <p className="text-gray-600">Create a new color for your products</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ColorForm />
      </div>
    </div>
  )
}
