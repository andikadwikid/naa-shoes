'use client'

import { useState } from 'react'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    comment: "Sepatu yang sangat nyaman! Kualitas materialnya bagus dan sesuai dengan foto. Sangat puas dengan pembelian ini.",
    date: "2024-01-15",
    verified: true
  },
  {
    id: 2,
    name: "Diana K.",
    rating: 4,
    comment: "Design nya cantik dan ukurannya pas. Hanya saja pengiriman agak lama, tapi overall recommended!",
    date: "2024-01-10",
    verified: true
  },
  {
    id: 3,
    name: "Lisa T.",
    rating: 5,
    comment: "Love it! Sudah pakai seminggu dan masih nyaman. Cocok untuk daily use.",
    date: "2024-01-08",
    verified: false
  }
]

interface ReviewsSectionProps {
  productId: number
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [reviews] = useState<Review[]>(mockReviews)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2)

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="border-b pb-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h3>
        
        {/* Overall Rating */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            {renderStars(Math.round(averageRating), 'lg')}
            <span className="text-lg font-semibold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-600">
            ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(r => r.rating === rating).length
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
            
            return (
              <div key={rating} className="flex items-center gap-3 text-sm">
                <span className="w-8">{rating} ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-gray-600">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 2 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-pink-600 hover:text-pink-700 font-medium text-sm"
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
          </button>
        </div>
      )}

      {/* Write Review Button */}
      <div className="mt-6 pt-6 border-t">
        <button className="w-full border border-pink-600 text-pink-600 hover:bg-pink-50 font-medium py-3 px-4 rounded-lg transition-colors">
          Write a Review
        </button>
      </div>
    </div>
  )
}
