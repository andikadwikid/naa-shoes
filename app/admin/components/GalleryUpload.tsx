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
  const [previewImages, setPreviewImages] = useState<{file: File, url: string}[]>([])
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

    // Create preview URLs
    const previews = filesToUpload.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }))
    setPreviewImages(previews)

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
      console.log('Gallery upload result:', result)

      if (result.success) {
        const newImages = result.images.map((img: any) => ({
          ...img,
          altText: img.originalName,
          caption: ''
        }))

        console.log('Adding new gallery images:', newImages)

        // Validate that uploaded images are accessible
        const validatedImages = []
        for (const img of newImages) {
          try {
            const response = await fetch(img.url, { method: 'HEAD' })
            if (response.ok) {
              validatedImages.push(img)
            } else {
              console.warn('Uploaded image not accessible:', img.url)
            }
          } catch (error) {
            console.warn('Error validating uploaded image:', img.url, error)
          }
        }

        // Clean up preview URLs
        previewImages.forEach(preview => URL.revokeObjectURL(preview.url))
        setPreviewImages([])
        onChange([...images, ...validatedImages])
      } else {
        setUploadError('Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Upload failed. Please try again.')
      // Clean up preview URLs on error
      previewImages.forEach(preview => URL.revokeObjectURL(preview.url))
      setPreviewImages([])
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

  const handleRemoveBrokenImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const validateImageUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
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

      {/* Preview Images During Upload */}
      {previewImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Uploading images...</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewImages.map((preview, index) => (
              <div key={index} className="relative">
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-1"></div>
                      <span className="text-xs">Uploading...</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                    <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={image.url}
                        alt={image.altText || `Gallery image ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          console.error('Gallery image failed to load:', image.url)
                          // Hide broken image and show placeholder
                          const imgElement = e.target as HTMLImageElement
                          imgElement.style.display = 'none'
                          const placeholder = imgElement.parentElement?.querySelector('.image-placeholder') as HTMLElement
                          if (placeholder) {
                            placeholder.style.display = 'flex'
                          }
                        }}
                        onLoad={() => console.log('Gallery image loaded successfully:', image.url)}
                        unoptimized
                      />
                      <div className="image-placeholder absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-xs" style={{display: 'none'}}>
                        <div className="text-center">
                          <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <div>Image not found</div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBrokenImage(index)}
                            className="mt-1 text-xs text-red-600 hover:text-red-800 underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
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
