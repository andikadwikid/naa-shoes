'use client'

import { motion } from 'framer-motion'
import ProductCardShadcn from './ProductCardShadcn'
import { Product } from '../types/product'

interface AnimatedProductCardProps {
  product: Product
  index: number
}

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
      duration: 0.6,
      delay: 0.1
    }
  }
}

export default function AnimatedProductCard({ product, index }: AnimatedProductCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group"
      role="listitem"
    >
      <ProductCardShadcn product={product} />
    </motion.div>
  )
}
