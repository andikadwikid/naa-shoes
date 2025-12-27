'use client'

import { useState } from 'react'
import { Ruler, Info } from 'lucide-react'
import { SizeGuide as SizeGuideType } from '../types/product'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'

interface SizeGuideProps {
  sizeGuide: SizeGuideType[]
  productName: string
}

export default function SizeGuide({ sizeGuide, productName }: SizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!sizeGuide || sizeGuide.length === 0) {
    return null
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-gray-600 hover:text-pink-600 border-gray-300 hover:border-pink-300"
      >
        <Ruler className="h-4 w-4" />
        Size Guide
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-white rounded-xl shadow-xl border-0">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2 justify-center">
              <Ruler className="h-5 w-5 text-pink-600" />
              Size Guide
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Panduan ukuran untuk {productName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Cara mengukur kaki:</p>
                  <p>Ukur panjang kaki dari tumit hingga ujung jari terpanjang dalam posisi berdiri.</p>
                </div>
              </div>
            </div>

            {/* Size table */}
            <div className="bg-pink-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Tabel Ukuran</h4>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4 pb-2 border-b border-pink-200">
                  <span className="font-semibold text-gray-700 text-center">Size</span>
                  <span className="font-semibold text-gray-700 text-center">Panjang Kaki (cm)</span>
                </div>
                {sizeGuide
                  .sort((a, b) => a.size - b.size)
                  .map((guide) => (
                    <div key={guide.size} className="grid grid-cols-2 gap-4 py-1.5">
                      <span className="text-center font-medium text-gray-900 bg-white rounded px-2 py-1">
                        {guide.size}
                      </span>
                      <span className="text-center text-gray-700 bg-white rounded px-2 py-1">
                        {guide.centimeters} cm
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Additional tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Ukur kaki pada sore hari ketika kaki dalam kondisi sedikit bengkak</li>
                  <li>• Jika ragu antara 2 ukuran, pilih yang lebih besar</li>
                  <li>• Gunakan kaus kaki yang biasa dipakai saat mengukur</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2"
            >
              Mengerti
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
