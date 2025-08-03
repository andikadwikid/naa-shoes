'use client'

import BlogForm from '../BlogForm'

// Force dynamic rendering to avoid API calls during build
export const dynamic = 'force-dynamic'

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
