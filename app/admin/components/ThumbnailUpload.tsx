'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ThumbnailUploadProps {
  thumbnailUrl: string | null
  onChange: (url: string | null) => void
  productName?: string
}

export default function ThumbnailUpload({ 
  thumbnailUrl, 
  onChange, 
  productName = "Product" 
}: ThumbnailUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
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
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setUploadError('File size must be less than 10MB')
      return
    }

    // Create preview URL before upload
    const preview = URL.createObjectURL(file)
    setPreviewUrl(preview)

    setIsUploading(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('images', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      console.log('Upload result:', result)

      if (result.success && result.images.length > 0) {
        console.log('Setting thumbnail URL to:', result.images[0].url)
        // Clean up preview URL
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
          setPreviewUrl(null)
        }
        onChange(result.images[0].url)
      } else {
        setUploadError('Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Upload failed. Please try again.')
      // Clean up preview on error
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleRemove = async () => {
    if (thumbnailUrl) {
      try {
        const filename = thumbnailUrl.split('/').pop()
        if (filename) {
          await fetch(`/api/admin/upload?filename=${filename}`, {
            method: 'DELETE'
          })
        }
      } catch (error) {
        console.error('Error deleting thumbnail:', error)
      }
    }
    onChange(null)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Product Thumbnail *
      </label>
      
      {(thumbnailUrl || previewUrl) ? (
        <div className="relative">
          <div className="aspect-square w-48 relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={previewUrl || thumbnailUrl || ''}
              alt={`${productName} thumbnail`}
              fill
              className="object-cover"
              unoptimized={!!previewUrl}
              onError={(e) => {
                console.error('Image failed to load:', previewUrl || thumbnailUrl)
                setUploadError(`Failed to load image: ${previewUrl || thumbnailUrl}`)
              }}
              onLoad={() => console.log('Image loaded successfully:', previewUrl || thumbnailUrl)}
            />

            {/* Upload progress overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <span className="text-sm">Uploading...</span>
                </div>
              </div>
            )}
            
            {/* Actions overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-100"
                disabled={isUploading}
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                disabled={isUploading}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors w-48 aspect-square flex flex-col items-center justify-center ${
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
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-2"></div>
              <span className="text-sm">Uploading...</span>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-gray-600 mb-2">
                <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                Drop image here or{' '}
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
    </div>
  )
}
