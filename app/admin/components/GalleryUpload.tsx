'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
  altText?: string
  caption?: string
}

interface GalleryUploadProps {
  images: GalleryImage[]
  onChange: (images: GalleryImage[]) => void
  maxImages?: number
  productName?: string
}

export default function GalleryUpload({ 
  images, 
  onChange, 
  maxImages = 8,
  productName = "Product"
}: GalleryUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFiles = async (selectedFiles: File[]) => {
    if (images.length >= maxImages) {
      setUploadError(`Maximum ${maxImages} gallery images allowed`)
      return
    }

    const validFiles = selectedFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        return false
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setUploadError('File size must be less than 10MB')
        return false
      }
      return true
    })

    if (validFiles.length === 0) {
      setUploadError('Please select valid image files')
      return
    }

    const remainingSlots = maxImages - images.length
    const filesToUpload = validFiles.slice(0, remainingSlots)

    setIsUploading(true)
    setUploadError('')

    try {
      const formData = new FormData()
      filesToUpload.forEach(file => {
        formData.append('images', file)
      })

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      
      if (result.success) {
        const newImages = result.images.map((img: any) => ({
          ...img,
          altText: img.originalName,
          caption: ''
        }))
        
        onChange([...images, ...newImages])
      } else {
        setUploadError('Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleDeleteImage = async (index: number) => {
    const imageToDelete = images[index]
    
    try {
      await fetch(`/api/admin/upload?filename=${imageToDelete.filename}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Error deleting image from server:', error)
    }

    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [moved] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, moved)
    onChange(newImages)
  }

  const handleAltTextChange = (index: number, altText: string) => {
    const newImages = images.map((img, i) => 
      i === index ? { ...img, altText } : img
    )
    onChange(newImages)
  }

  const handleCaptionChange = (index: number, caption: string) => {
    const newImages = images.map((img, i) => 
      i === index ? { ...img, caption } : img
    )
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Gallery Images ({images.length}/{maxImages})
        </label>
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="text-sm text-pink-600 hover:text-pink-700 disabled:opacity-50"
          >
            Add Images
          </button>
        )}
      </div>

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-2"></div>
              Uploading gallery images...
            </div>
          ) : (
            <div>
              <div className="text-gray-600 mb-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m0 0l4.586-4.586a2 2 0 012.828 0L28 16m0 0l4.586-4.586a2 2 0 012.828 0L40 16m0 0v12a2 2 0 01-2 2H6a2 2 0 01-2-2V16z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                Drag and drop gallery images here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Multiple JPEG, PNG, WebP files up to 10MB each
              </p>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
          {uploadError}
        </div>
      )}

      {/* Gallery Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Drag images to reorder. First image will be displayed first in gallery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.altText || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Image {index + 1}
                      </span>
                      <div className="flex space-x-1">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, index - 1)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                            title="Move up"
                          >
                            ↑
                          </button>
                        )}
                        {index < images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, index + 1)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                            title="Move down"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(index)}
                          className="text-red-400 hover:text-red-600 p-1"
                          title="Delete image"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={image.altText || ''}
                      onChange={(e) => handleAltTextChange(index, e.target.value)}
                      placeholder="Alt text"
                      className="w-full text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />

                    <input
                      type="text"
                      value={image.caption || ''}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      placeholder="Caption (optional)"
                      className="w-full text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
