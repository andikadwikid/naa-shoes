'use client'

import { motion } from 'framer-motion'
import ProductCardShadcn from './ProductCardShadcn'
import { Product } from '../types/product'

interface AnimatedProductCardProps {
  product: Product
  index: number
}

export default function AnimatedProductCard({ product, index }: AnimatedProductCardProps) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group"
      role="listitem"
    >
      <ProductCardShadcn product={product} />
    </motion.div>
  )
}
