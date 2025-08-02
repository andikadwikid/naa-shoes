interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5 // Total pages to show around current page

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Calculate start and end pages
      let start = Math.max(1, currentPage - Math.floor(showPages / 2))
      let end = Math.min(totalPages, start + showPages - 1)

      // Adjust start if end is at the limit
      if (end === totalPages) {
        start = Math.max(1, end - showPages + 1)
      }

      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }

      // Add pages in range
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add last page and ellipsis if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pages = getPageNumbers()

  if (totalPages <= 1) return null

  return (
    <div className={`flex items-center justify-center space-x-1 sm:space-x-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-2 sm:px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 touch-manipulation
          ${currentPage === 1
            ? 'text-gray-400 cursor-not-allowed bg-gray-100'
            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-pink-600'
          }
        `}
        aria-label="Previous page"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
            disabled={page === '...'}
            className={`
              px-2 sm:px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 min-w-[32px] sm:min-w-[40px] touch-manipulation
              ${typeof page === 'number' && page === currentPage
                ? 'bg-pink-600 text-white shadow-sm'
                : typeof page === 'number'
                ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-pink-600'
                : 'text-gray-400 cursor-default bg-transparent'
              }
            `}
            aria-label={typeof page === 'number' ? `Go to page ${page}` : undefined}
            aria-current={typeof page === 'number' && page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-2 sm:px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 touch-manipulation
          ${currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed bg-gray-100'
            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-pink-600'
          }
        `}
        aria-label="Next page"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
