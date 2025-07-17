"use client"

import { motion } from "framer-motion"

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
            {/* Image Skeleton */}
            <div className="relative">
              <div className="w-full h-48 lg:h-64 bg-gray-200 animate-pulse"></div>
              <div className="absolute top-3 right-3 w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Content Skeleton */}
            <div className="lg:col-span-2 p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>

              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Price Skeleton */}
            <div className="p-6 border-t lg:border-t-0 lg:border-l space-y-3">
              <div className="space-y-1">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
