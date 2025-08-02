'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface UploadedImage {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
  altText?: string
  isPrimary?: boolean
}

interface ImageUploadProps {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  maxImages?: number
  acceptedFormats?: string[]
}

export default function ImageUpload({ 
  images, 
  onChange, 
  maxImages = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp']
}: ImageUploadProps) {
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
      setUploadError(`Maximum ${maxImages} images allowed`)
      return
    }

    // Filter valid image files
    const validFiles = selectedFiles.filter(file => {
      if (!acceptedFormats.includes(file.type)) {
        return false
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setUploadError('File size must be less than 10MB')
        return false
      }
      return true
    })

    if (validFiles.length === 0) {
      setUploadError('Please select valid image files (JPEG, PNG, WebP)')
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
          isPrimary: images.length === 0 && result.images.indexOf(img) === 0,
          altText: img.originalName
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
      // Delete from server
      await fetch(`/api/admin/upload?filename=${imageToDelete.filename}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Error deleting image from server:', error)
    }

    // Remove from local state
    const newImages = images.filter((_, i) => i !== index)
    
    // If we deleted the primary image, make the first remaining image primary
    if (imageToDelete.isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true
    }
    
    onChange(newImages)
  }

  const handleSetPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }))
    onChange(newImages)
  }

  const handleAltTextChange = (index: number, altText: string) => {
    const newImages = images.map((img, i) => 
      i === index ? { ...img, altText } : img
    )
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Product Images ({images.length}/{maxImages})
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
            accept={acceptedFormats.join(',')}
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-2"></div>
              Uploading images...
            </div>
          ) : (
            <div>
              <div className="text-gray-600 mb-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                Drag and drop images here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, WebP up to 10MB
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

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.altText || `Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                
                {/* Primary badge */}
                {image.isPrimary && (
                  <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                    Primary
                  </div>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  {!image.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(index)}
                      className="bg-white text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-100"
                      title="Set as primary"
                    >
                      Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                    title="Delete image"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Alt text input */}
              <input
                type="text"
                value={image.altText || ''}
                onChange={(e) => handleAltTextChange(index, e.target.value)}
                placeholder="Alt text (optional)"
                className="mt-2 w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
