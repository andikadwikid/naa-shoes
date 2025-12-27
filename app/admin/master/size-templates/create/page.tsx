import SizeTemplateForm from '../SizeTemplateForm'

export default function CreateSizeTemplatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Size Template</h1>
        <p className="text-gray-600">Create a new size guide template for products</p>
      </div>

      <SizeTemplateForm />
    </div>
  )
}
