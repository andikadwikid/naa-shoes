import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      )
    }

    const uploadedImages = []

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'products')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue // Skip non-image files
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomSuffix = Math.random().toString(36).substring(2, 15)
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${timestamp}_${randomSuffix}_${originalName}`

      // Save file to uploads directory
      const buffer = Buffer.from(await file.arrayBuffer())
      const filepath = join(uploadsDir, filename)
      await writeFile(filepath, buffer)

      // Create URL for the uploaded image
      const imageUrl = `/uploads/products/${filename}`

      uploadedImages.push({
        url: imageUrl,
        filename,
        originalName: file.name,
        size: file.size,
        type: file.type
      })
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages
    })

  } catch (error) {
    console.error('Error uploading images:', error)
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    // Delete file from uploads directory
    const filepath = join(process.cwd(), 'public', 'uploads', 'products', filename)
    
    if (existsSync(filepath)) {
      const { unlink } = await import('fs/promises')
      await unlink(filepath)
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
