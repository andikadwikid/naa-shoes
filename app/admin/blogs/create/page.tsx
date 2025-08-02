import BlogForm from '../BlogForm'

export const metadata = {
  title: 'Create New Blog Post - Admin Dashboard',
  description: 'Create a new blog post'
}

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
        <p className="mt-2 text-sm text-gray-700">
          Write and publish new content for your blog
        </p>
      </div>
      
      <BlogForm mode="create" />
    </div>
  )
}
